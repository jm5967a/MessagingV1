import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import Login from '../components/LoginPage'
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path={"/"} component={Login} exact={true}/>
                <PrivateRoute path={"/dashboard"} component={DashboardPage} />
                {/*<PrivateRoute path={"/0000"} component={NewMessage}/>*/}
                <PrivateRoute path={"/:id"} component={DashboardPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

export default AppRouter