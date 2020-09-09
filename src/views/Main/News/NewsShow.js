import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Redirect, useParams } from 'react-router-dom';
import News from '../../../components/News/News';
import { API_NEWS_SHOW } from '../../../api';

const NewsShow = () => {
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
                        item.to = `/aktualnosci/${item.slug}`;
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
                category="Aktualności"
                listTitle="Może cię zainteresować także"
                pathItems={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/aktualnosci', label: 'Aktualności' },
                    { url: `/aktualnosci/${news.slug}`, label: news.title },
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

export default NewsShow;

/*
* loading={loading}
                redirect={redirect}
                title={news.meta_title}
                description={news.meta_description}
                keywords={news.meta_keywords}
                key={news.slug}
* */
