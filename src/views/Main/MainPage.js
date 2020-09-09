import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { NotificationManager } from 'react-notifications';
import { Helmet } from 'react-helmet';
import { News } from '../../components/Views/MainPage/News/News';
import Ad from '../../components/Ad/Ad';
import Announcements from '../../components/Views/MainPage/Announcements/Announcements';
import { MainShortcuts } from '../../components/Main/MainShortcuts';
import { Banners } from '../../components/Views/MainPage/Banners';
import { Marquee } from '../../components/HomePage/Marquee';

const MainPage = () => {
    const location = useLocation();

    useEffect(() => {
        const parsed = queryString.parse(location.search);
        if (parsed.email === '0') {
            NotificationManager.error(
                'Twoje konto w serwisie facebook.pl nie posiada adresu email',
                'Przepraszamy',
                5000,
            );
        }
    }, [location.search]);

    return (
        <>
            <Helmet>
                <title>Oficjalny Portal Gminy Jarocin</title>
                <meta
                    name="description"
                    content="Strona Gminy Jarocin. Wszystko o Jarocinie. Informacje lokalne i samorządowe, wizytówka miasta, jego historia i zabytki, kultura, oświata i gospodarka."
                />
            </Helmet>
            <Marquee />
            <News />
            <Banners type={1} />
            <Container>
                <Ad type={1} />
            </Container>
            <MainShortcuts />
            <Container>
                <Ad type={2} />
            </Container>
            <Banners type={2} />
            <Announcements />
        </>
    );
};

export default MainPage;
