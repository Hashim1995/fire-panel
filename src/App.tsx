/* eslint-disable no-unused-expressions */
import { Suspense, useEffect } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import routesList from '@core/routes';
import './core/global.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '@chakra-ui/react';
import { setUser } from './redux/auth/user-slice';
import { RootState } from './redux/store';
import ChichkenLoader from './core/suspense/chicken-loader';
import { AuthService } from './services/auth-services/auth-services';

function App() {
  const router = useRoutes(routesList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);

  const userToken: any = useReadLocalStorage('userToken');

  const getMe = async () => {
    try {
      const res = await new AuthService().getUserData();
      // localStorage.setItem(
      //   'permission',
      //   JSON.stringify(res?.user?.permissions?.routes)
      // );
      dispatch(setUser(res?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userToken?.token && getMe();
  }, []);

  useEffect(() => {
    if (!userToken && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [userToken, location]);

  return (
    <div>
      {user ? (
        <Suspense fallback={<Spinner />}>{router}</Suspense>
      ) : (
        <ChichkenLoader />
      )}
    </div>
  );
}

export default App;
