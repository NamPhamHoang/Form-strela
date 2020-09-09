import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider, useSelector } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import store from './store';
import GlobalStyles from './theme/GlobalStyles';
import { theme } from './theme/mainTheme';
import { App } from './App';

const Wrapper = ({ children }) => {
    const token = useSelector(state => state.token);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        setIsLoading(false);
    }, [token]);

    return <>{isLoading || children}</>;
};

const Root = () => {
    useEffect(() => {
        const fontSize = localStorage.getItem('fontSize');
        const { classList } = document.documentElement;

        if (fontSize) {
            classList.remove('version-small', 'version-normal', 'version-large');
            classList.add(fontSize);
        }

        const highContrast = localStorage.getItem('highContrast') || false;
        if (highContrast === 'true') {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }, []);

    return (
        <CookiesProvider>
            <Provider store={store}>
                <NotificationContainer />
                <GlobalStyles />
                <Wrapper>
                    <ThemeProvider theme={theme}>
                        <Router>
                            <App />
                        </Router>
                    </ThemeProvider>
                </Wrapper>
            </Provider>
        </CookiesProvider>
    );
};

export default Root;
