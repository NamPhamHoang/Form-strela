import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import { PanelRoute } from './views/Panel/PanelRoute';
import MainTemplate from './templates/MainTemplate';

export const App = () => {
    const [initialized, setInitialized] = useState(false);
    const location = useLocation();
    useEffect(() => {
        ReactGA.initialize('UA-176880426-1', {
            titleCase: false,
        });
        setTimeout(() => {
            setInitialized(true);
        }, 500);
    }, []);

    useEffect(() => {
        if (initialized) {
            ReactGA.pageview(`${location.pathname}${location.search}`);
        }
    }, [initialized, location]);

    return (
        <>
            <Switch>
                <Route path="/panel" component={PanelRoute} />
                <Route path="*" component={MainTemplate} />
            </Switch>
        </>
    );
};
