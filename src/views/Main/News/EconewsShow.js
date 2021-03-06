import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Redirect, useParams } from 'react-router-dom';
import News from '../../../components/News/News';
import { API_NEWS_SHOW } from '../../../api';

const EcoNewsShow = () => {
    const [news, setNews] = useState({ gallery: [] });
    const [otherNews, setOtherNews] = useState([]);
    const [redirect, setRedirect] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        const API = API_NEWS_SHOW(slug);
        axios
            .get(API)
            .then(response => {
                const { news: newNews, otherNews: newOtherNews } = response.data;
                setNews(newNews);
                setOtherNews(
                    newOtherNews.map(item => {
                        item.to = `/eko-news/${item.slug}`;
                        item.date = moment(item.created_at).format('DD.MM.YYYY');
                        return item;
                    }),
                );
            })
            .catch(error => {
                setRedirect(`/${error.response.status || 404}`);
            });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug]);

    return (
        <>
            {redirect && <Redirect to={redirect} />}
            <News
                category="EKONEWS"
                listTitle="Może cię zainteresować także"
                pathItems={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/eko-news', label: 'EKONEWS' },
                    { url: `/eko-news/${news.slug}`, label: news.title },
                ]}
                date={news.published_at}
                photo={news.img}
                content={news.contents}
                {...news}
                otherNews={otherNews}
            />
        </>
    );
};

export default EcoNewsShow;

/*
* loading={loading}
                redirect={redirect}
                title={news.meta_title}
                description={news.meta_description}
                keywords={news.meta_keywords}
                key={news.slug}
* */
