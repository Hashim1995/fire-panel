import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@core/layout';
import checkPermission from '@/utils/checkPermission';
import Orders from '@/views/orders/orders';
import Web from '@/views/web/web';
import WebElevenPage from '@/views/web-eleven/pages';
import WebSliderPage from '@/views/web-slider/pages';
import BranchesPage from '@/views/branches/pages';
import ClientsPage from '@/views/clients/pages';
import UsersPage from '@/views/users/pages';
import ProductPage from '@/views/product/pages';
import Category from '@/views/blog/components/blog';
import PopularPages from '@/views/popular/pages';
import CarrerPage from '@/views/career/pages';
import ApplicationsPage from '@/views/applications/pages';
import SettingsPage from '@/views/settings/pages';
import AboutPage from '@/views/about/pages';
import BlogPage from '@/views/blog/pages';
import ContactPage from '@/views/contact/pages';
import AppealPage from '@/views/appeal/pages';
import VisaPage from '@/views/visa/pages';
import CountryPage from '@/views/country/pages';
import Login from './login/login';
import ChichkenLoader from './suspense/chicken-loader';
import NotFound from './404/404';
import NoPermission from './no-permission/no-permission';

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
        path: 'orders',
        element: checkPermission(['ordersRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            {' '}
            <Orders />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['ordersRoute']
      },
      {
        path: 'branches',
        element: checkPermission(['branchesRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <BranchesPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['branchesRoute']
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
        path: 'career',
        element: checkPermission(['careerRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <CarrerPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['careerRoute']
      },
      {
        path: 'applications',
        element: checkPermission(['applicationsRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <ApplicationsPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['applicationsRoute']
      },

      {
        path: 'reports',
        element: checkPermission(['route_reports_page']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <h1>reports</h1>
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['view_services_page']
      },
      {
        path: 'web',
        element: checkPermission(['route_menus_page']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <Web />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['view_services_page']
      },
      {
        path: 'web/slider',
        element: checkPermission(['sliderRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <WebSliderPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['sliderRoute']
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
        path: 'web/eleven-ingredient',
        element: checkPermission(['ingridientsRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <WebElevenPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['ingridientsRoute']
      },
      {
        path: 'category',
        element: checkPermission(['categoriesRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <Category />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['categoriesRoute']
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
        path: 'product',
        element: checkPermission(['productsRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <ProductPage />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['productsRoute']
      },
      {
        path: 'popular',
        element: checkPermission(['popularRoute']) ? (
          <Suspense fallback={<ChichkenLoader />}>
            <PopularPages />
          </Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['popularRoute']
      },
      {
        path: 'test',
        element: checkPermission(['route_menus_page']) ? (
          <Suspense fallback={<ChichkenLoader />}>TEST</Suspense>
        ) : (
          <Navigate to="/no-permission" />
        ),
        permission: ['view_about_page'],
        children: [
          {
            path: '/test/1',

            element: checkPermission(['view_test_page1']) ? (
              <h1>test 1</h1>
            ) : (
              <Navigate to="/no-permission" />
            ),
            permission: ['view_test_page1']
          },
          {
            path: '/test/2',
            element: checkPermission(['view_test_page2']) ? (
              <h1>test 2</h1>
            ) : (
              <Navigate to="/no-permission" />
            ),
            permission: ['view_test_page2']
          }
        ]
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
