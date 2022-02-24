import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import PrivateLayout from "../layout/Private";
import PublicLayout from "../layout/Public";

import Page404 from "../views/errors/Page404";

import PageLogin from "../views/public/PageLogin";
import PageDashboard from "../views/private/PageDashboard";
import PageUser from "../views/private/PageUser";
import PageUserForm from "../views/private/PageUser/PageUserForm";

const isLoggenIn = localStorage.getItem("userdata");

const PrivateRoute = ({ component: Component, title: Title, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isLoggenIn ? (
                <PrivateLayout title={Title}>
                    <Component {...props} />
                </PrivateLayout>
            ) : (
                <Redirect to={{ pathname: "/" }} />
            )
        }
    />
);

const PublicRoute = ({ component: Component, title: Title, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            !isLoggenIn ? (
                <PublicLayout title={Title}>
                    <Component {...props} />
                </PublicLayout>
            ) : (
                <Redirect to={{ pathname: "/dashboard" }} />
            )
        }
    />
);

const queryClient = new QueryClient();

function Routes() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Switch>
                    <PublicRoute
                        exact
                        title="Login"
                        path="/"
                        component={PageLogin}
                    />
                    <PrivateRoute
                        exact
                        title="Dashboard"
                        path="/dashboard"
                        component={PageDashboard}
                    />
                    <PrivateRoute
                        exact
                        title="Users"
                        path="/user"
                        component={PageUser}
                    />
                    <PrivateRoute
                        exact
                        title="Users"
                        path="/user/form"
                        component={PageUserForm}
                    />

                    <Route path="/*" component={Page404} />
                </Switch>
            </Router>
        </QueryClientProvider>
    );
}

export default Routes;

if (document.getElementById("root")) {
    ReactDOM.render(<Routes />, document.getElementById("root"));
}
