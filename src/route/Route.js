import React, { Suspense, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AuthContext from '../authContext/auth-context';

import * as routeConstants from './RouteConstants';

const Auth = React.lazy(() => import('../pages/Auth/Auth'));
const Desktop = React.lazy(() => import('../pages/Desktop/Desktop'));

const Routes = () => {

  const { isAuth } = useContext(AuthContext);

  return (
    <Suspense fallback={<div/>}>
      <Switch>
        <Route path='/' exact>
          <Redirect to={`/${routeConstants.DESKTOP}`}/>
        </Route>

        {
          !isAuth && <Route path={`/${routeConstants.LOGIN}`} component={Auth}/>
        }

        <Route path={`/${routeConstants.DESKTOP}`}>
          {isAuth && <Desktop/>}
          {!isAuth && <Redirect to={`/${routeConstants.LOGIN}`}/>}
        </Route>

        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Suspense>
  )
};

export default Routes;
