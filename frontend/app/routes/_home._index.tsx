import { LoaderFunctionArgs } from '@remix-run/node';
import { json, Link, useLoaderData, useOutletContext, useSearchParams } from '@remix-run/react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { loadVideoListByFilter } from '~/api/video/index.server';
import { authenticator } from '~/services/auth.server';
import loadUserMeConfig from '~/src/api/loader/loadUserConfig';
import EmbeddableVideoPlayer from '~/src/components/EmbeddableVideoPlayer';
import Filterbar from '~/src/components/Filterbar';
import Pagination from '~/src/components/Pagination';
import ScrollToTopOnNavigate from '~/src/components/ScrollToTop';
import VideoList from '~/src/components/VideoList';
import { ViewStyleNames, ViewStyles } from '~/src/configuration/constants/ViewStyle';
import { RoutesList } from '~/src/configuration/routes/RouteList';
import { OutletContextType } from '~/src/pages/Base';
import { ContinueVidsType, SortByType, SortOrderType, ViewLayoutType } from '~/types';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log(request.headers);
  const user = await authenticator.isAuthenticated(request, { failureRedirect: '/login' });
  const url = new URL(request.url);
  const page = url.searchParams.get('page');

  const userConfig = await loadUserMeConfig(user);
  const videos = await loadVideoListByFilter(
    user,
    {
      page: page ? Number(page) : 1,
      watch: userConfig.config.hide_watched ? 'unwatched' : undefined,
      sort: userConfig.config.sort_by,
      order: userConfig.config.sort_order,
    },
    request,
  );

  const continueVideoResponse: ContinueVidsType = await loadVideoListByFilter(
    user,
    {
      watch: 'continue',
    },
    request,
  );

  return json({ userConfig, videos, continueVideoResponse });
};

const Home = () => {
  const data = useLoaderData<typeof loader>();
  const outletContext = useOutletContext<OutletContextType>();

  console.log(data);

  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('videoId');

  const userMeConfig = data?.userConfig?.config;

  const [hideWatched, setHideWatched] = useState(userMeConfig.hide_watched || false);
  const [sortBy, setSortBy] = useState<SortByType>(userMeConfig.sort_by || 'published');
  const [sortOrder, setSortOrder] = useState<SortOrderType>(userMeConfig.sort_order || 'asc');
  const [view, setView] = useState<ViewLayoutType>(userMeConfig.view_style_home || 'grid');
  const [gridItems, setGridItems] = useState(userMeConfig.grid_items || 3);
  const [showHidden, setShowHidden] = useState(false);
  const [refreshVideoList, setRefreshVideoList] = useState(false);

  // const [videoResponse, setVideoReponse] = useState<VideoResponseType>();
  // const [continueVideoResponse, setContinueVideoResponse] = useState<ContinueVidsType>();

  const videoList = data.videos;
  const pagination = data.videos.paginate;
  const continueVideos = data.continueVideoResponse.data;

  const hasVideos = data.videos.data?.length !== 0;
  const showEmbeddedVideo = videoId !== null;

  const isGridView = view === ViewStyles.grid;
  const gridView = isGridView ? `boxed-${gridItems}` : '';
  const gridViewGrid = isGridView ? `grid-${gridItems}` : '';

  // useEffect(() => {
  //   (async () => {
  //     if (
  //       refreshVideoList ||
  //       pagination?.current_page === undefined ||
  //       outletContext.currentPage !== pagination?.current_page
  //     ) {
  //       const videos = await loadVideoListByFilter({
  //         page: outletContext.currentPage,
  //         watch: hideWatched ? 'unwatched' : undefined,
  //         sort: sortBy,
  //         order: sortOrder,
  //       });

  //       try {
  //         const continueVideoResponse = await loadVideoListByFilter({ watch: 'continue' });
  //         setContinueVideoResponse(continueVideoResponse);
  //       } catch (error) {
  //         console.log('Server error on continue vids?');
  //       }

  //       setVideoReponse(videos);

  //       setRefreshVideoList(false);
  //     }
  //   })();
  //   // Do not add sort, order, hideWatched this will not work as expected!
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [refreshVideoList, outletContext?.currentPage, pagination?.current_page]);

  return (
    <>
      <Helmet>
        <title>TubeArchivist</title>
      </Helmet>
      <ScrollToTopOnNavigate />
      <div className={`boxed-content ${gridView}`}>
        {continueVideos && continueVideos.length > 0 && (
          <>
            <div className="title-bar">
              <h1>Continue Watching</h1>
            </div>
            <div className={`video-list ${view} ${gridViewGrid}`}>
              <VideoList
                videoList={continueVideos}
                viewLayout={view}
                refreshVideoList={setRefreshVideoList}
              />
            </div>
          </>
        )}

        <div className="title-bar">
          <h1>Recent Videos</h1>
        </div>

        <Filterbar
          hideToggleText="Hide watched:"
          showHidden={showHidden}
          hideWatched={hideWatched}
          isGridView={isGridView}
          view={view}
          gridItems={gridItems}
          sortBy={sortBy}
          sortOrder={sortOrder}
          setShowHidden={setShowHidden}
          setHideWatched={setHideWatched}
          setView={setView}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
          setGridItems={setGridItems}
          viewStyleName={ViewStyleNames.home}
          setRefresh={setRefreshVideoList}
        />
      </div>

      {showEmbeddedVideo && <EmbeddableVideoPlayer videoId={videoId} />}

      <div className={`boxed-content ${gridView}`}>
        <div className={`video-list ${view} ${gridViewGrid}`}>
          {!hasVideos && (
            <>
              <h2>No videos found...</h2>
              <p>
                If you've already added a channel or playlist, try going to the{' '}
                <Link to={RoutesList.Downloads}>downloads page</Link> to start the scan and download
                tasks.
              </p>
            </>
          )}

          {hasVideos && (
            <VideoList
              videoList={videoList}
              viewLayout={view}
              refreshVideoList={setRefreshVideoList}
            />
          )}
        </div>
      </div>

      {pagination && (
        <div className="boxed-content">
          <Pagination pagination={pagination} setPage={outletContext.setCurrentPage} />
        </div>
      )}
    </>
  );
};

export default Home;
