import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Layout from './components/Layout/Layout';

import Routes from './route/Route';

import AuthContext from './authContext/auth-context';
import { getUser } from './components/Auth/store/auth-actions';

const App = () => {

  const dispatch = useDispatch();
  const { login, logout } = useContext(AuthContext);

  useEffect(() => {
    dispatch(getUser())
      .then(res => login(res.payload.user.token))
      .catch(err => logout())
  }, [])

  return (
    <Layout>
      <Routes/>
    </Layout>
  );
}

export default App;
