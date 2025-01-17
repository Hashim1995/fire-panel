import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@core/layout';
import checkPermission from '@/utils/checkPermission';
import SettingsPage from '@/views/settings/pages';
import AboutPage from '@/views/about/pages';
import BlogPage from '@/views/blog/pages';
import ContactPage from '@/views/contact/pages';
import AppealPage from '@/views/appeal/pages';
import VisaPage from '@/views/visa/pages';
import CountryPage from '@/views/country/pages';
import UsersPage from '@/views/users/pages';
import ClientsPage from '@/views/clients/pages';
import VisaAdmin from '@/views/visaAdmin/components/visa';
import VisaPoolAdminPage from '@/views/visaPoolAdmin/pages';
import VisaPoolPage from '@/views/visaPool/pages';
import OptionsPage from '@/views/options/pages';
import NoPermission from './no-permission/no-permission';
import Login from './login/login';
import ChichkenLoader from './suspense/chicken-loader';
import NotFound from './404/404';

const MAIN_PAGE = lazy(() => import('@/views/main/pages'));
const SERVICES_PAGE = lazy(() => import('@views/services'));

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Navigate to="/home" /> },
      {
        path: '/home',
        index: true,
        element: checkPermission(['dashboardRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            {' '}
            <MAIN_PAGE />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['dashboardRoute']
      },

      {
        path: 'about',
        element: checkPermission(['aboutRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <AboutPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['aboutRoute']
      },
      {
        path: 'contact',
        element: checkPermission(['contactRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <ContactPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['contactRoute']
      },
      {
        path: 'blog',
        element: checkPermission(['blogRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <BlogPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['blogRoute']
      },
      {
        path: 'country',
        element: checkPermission(['countryRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <CountryPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['country']
      },
      {
        path: 'appeal',
        element: checkPermission(['appealRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <AppealPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['appeal']
      },
      {
        path: 'visa',
        element: checkPermission(['visaRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <VisaPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['visa']
      },
      {
        path: 'visa-admin',
        element: checkPermission(['visa-admin']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <VisaAdmin />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['visa-admin']
      },
      {
        path: 'pool-admin',
        element: checkPermission(['pool-admin']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <VisaPoolAdminPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['pool-admin']
      },

      {
        path: 'pool',
        element: checkPermission(['pool']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <VisaPoolPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['pool']
      },

      {
        path: 'settings',
        element: checkPermission(['settingsRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <SettingsPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['settingsRoute']
      },
      {
        path: 'users',
        element: checkPermission(['usersRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <UsersPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['usersRoute']
      },
      {
        path: 'clients',
        element: checkPermission(['clientsRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <ClientsPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['clientsRoute']
      },
      {
        path: 'options',
        element: checkPermission(['optionsRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <OptionsPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['optionsRoute']
      },
      {
        path: 'info',
        element: checkPermission(['view_services_page']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            {' '}
            <SERVICES_PAGE />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['view_services_page']
      },
      {
        path: 'no-permission',
        element: <NoPermission />
      },
      {
        path: '404',
        element: <NotFound />
      }
    ]
  },

  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  }
];

export default routes;
