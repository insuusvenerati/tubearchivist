import { Outlet, useLoaderData, useLocation, useSearchParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import Footer, { TaUpdateType } from '~/src/components/Footer';
import { UserMeType } from '~/src/api/actions/updateUserConfig';
import loadIsAdmin from '~/src/functions/getIsAdmin';
import Navigation from '~/src/components/Navigation';
import loadAuth from '~/src/api/loader/loadAuth';
import { redirect } from 'react-router-dom';
import { RoutesList } from '~/src/configuration/routes/RouteList';
import loadUserMeConfig from '~/src/api/loader/loadUserConfig';
import { LoaderFunctionArgs } from '@remix-run/node';

export type AuthenticationType = {
  response: string;
  user: number;
  version: string;
  ta_update: TaUpdateType;
};

type BaseLoaderData = {
  userConfig: UserMeType;
  auth: AuthenticationType;
};

export type OutletContextType = {
  isAdmin: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log('------------ after reload');

  const auth = await loadAuth(request);
  // if (auth.status === 403) {
  //   return redirect(RoutesList.Login);
  // }

  const authData = await auth.json();

  const userConfig = await loadUserMeConfig(request);

  return { userConfig, auth: authData };
};

const Base = () => {
  const { userConfig, auth } = useLoaderData() as BaseLoaderData;
  const location = useLocation();

  const userMeConfig = userConfig.config;

  const searchParams = new URLSearchParams(location.search);

  const currentPageFromUrl = Number(searchParams.get('page'));

  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);
  const [, setSearchParams] = useSearchParams();

  const isAdmin = loadIsAdmin(userConfig);
  const version = auth.version;
  const taUpdate = auth.ta_update;

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
