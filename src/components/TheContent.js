import React, { Suspense } from 'react';
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import logo from '../logo.svg';

// routes config
import routes from '../router/routes';

const loading = (
    <div className="el-center">
        Loading...
    </div>
)

const TheContent = () => {
    return (
        <main>
            <Suspense fallback={loading}>
                <Switch>
                    {routes.map((route, idx) => {
                        return route.component && (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={props => (
                                    <route.component {...props} />
                                )}
                            >
                            </Route>
                        )
                    })}
                    <Redirect from="/" to="/dashboard" />
                </Switch>
            </Suspense>
        </main>
    );
}

export default React.memo(TheContent)