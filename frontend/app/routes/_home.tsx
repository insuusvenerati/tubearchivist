import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData, useLocation, useSearchParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { authenticator } from '~/services/auth.server';
import loadAuth from '~/src/api/loader/loadAuth';
import loadUserMeConfig from '~/src/api/loader/loadUserConfig';
import Footer, { TaUpdateType } from '~/src/components/Footer';
import Navigation from '~/src/components/Navigation';
import loadIsAdmin from '~/src/functions/getIsAdmin';

export type AuthenticationType = {
  response: string;
  user: number;
  version: string;
  ta_update: TaUpdateType;
};

export type OutletContextType = {
  isAdmin: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log('------------ after reload');

  const user = await authenticator.isAuthenticated(request, { failureRedirect: '/login' });
  const auth = await loadAuth(user);

  const userConfig = await loadUserMeConfig(user);

  return { userConfig, auth };
};

const Base = () => {
  const { userConfig, auth } = useLoaderData<typeof loader>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPageFromUrl = Number(searchParams.get('page'));
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);
  const [, setSearchParams] = useSearchParams();

  const isAdmin = loadIsAdmin(userConfig);
  const version = auth.version;
  const taUpdate = auth?.ta_update;

  useEffect(() => {
    if (currentPageFromUrl !== currentPage) {
      setCurrentPage(0);
    }

    // This should only be executed when location.pathname changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (currentPageFromUrl !== currentPage) {
      setCurrentPage(currentPageFromUrl);
    }

    // This should only be executed when currentPageFromUrl changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageFromUrl]);

  useEffect(() => {
    if (currentPageFromUrl !== currentPage) {
      setSearchParams(params => {
        params.set('page', currentPage.toString());

        return params;
      });
    }

    // This should only be executed when currentPage changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // importColours(userMeConfig.stylesheet);

  return (
    <>
      <div className="main-content">
        <Navigation isAdmin={isAdmin} />
        {/** Outlet: https://reactrouter.com/en/main/components/outlet */}
        <Outlet context={{ isAdmin, currentPage, setCurrentPage }} />
      </div>
      <Footer version={version} taUpdate={taUpdate} />
    </>
  );
};

export default Base;
