import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import News from '../../components/News/News';
import { getImage, getInstitutionPathName } from '../../helpers';
import { API_INSTITUTION_NEWS_SHOW } from '../../api';

// TODO: Trzeba zrobić tutaj newsy w API także

class InstitutionNewsShow extends Component {
    state = {
        institution: {},
        news: {},
        otherNews: [
            {
                slug: 'artykul',
                title: 'Artykuł w sumie całkiem długi nie ciekawa nazwa',
                date: '28.06.2019',
                img: 'https://picsum.photos/1920/1080',
                to: '/to',
                alt: 'Zdjecie artykułu artykuł',
            },
        ],
        loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchNews();
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, redirect } = this.state;
        if (redirect) return;
        const { slug: oldSlug } = prevState.institution;
        const { slug: oldNewsSlug } = prevState.news;
        const { newsSlug, slug } = this.props.match.params;

        const newsSlugChanged = newsSlug && oldNewsSlug && newsSlug !== oldNewsSlug;
        const slugChanged = slug && oldSlug && slug !== oldSlug;

        if (slugChanged || newsSlugChanged) {
            this.resetData();
            return;
        }

        if (loading) {
            this.fetchNews();
        }
    }

    resetData = () => {
        this.setState({
            loading: true,
            institution: {},
            news: [],
            otherNews: [],
        });
    };

    fetchNews = () => {
        const { newsSlug, slug } = this.props.match.params;
        const API = API_INSTITUTION_NEWS_SHOW(slug, newsSlug);

        axios
            .get(API)
            .then(response => {
                this.setState({
                    ...response.data,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
            });
    };

    render() {
        const { institution, news, otherNews, redirect } = this.state;

        const pathItems = [
            { url: '/', label: 'Strona główna' },
            getInstitutionPathName(institution.typeName),
            { url: `/instytucje/${institution.slug}/aktualnosci`, label: institution.name },
            { url: `/instytucje/${institution.slug}/aktualnosci/${news.slug}`, label: news.title },
        ];
        return (
            // todo seo
            <>
                {redirect && <Redirect to={redirect} />}
                <News
                    category={`${institution.name}`}
                    listTitle="Może cię zainteresować także"
                    pathItems={pathItems}
                    title={news.title}
                    date={news.date}
                    photo={news.photoUrl}
                    content={news.content}
                    otherNews={otherNews.map(item => {
                        item.img = getImage(item.photoUrl);
                        item.to = `/instytucje/${institution.slug}/aktualnosci/${item.slug}`;
                        item.alt = `Zdjęcie artykułu ${item.title}`;

                        return item;
                    })}
                />
            </>
        );
    }
}

export default InstitutionNewsShow;

/*
* loading={loading}
                redirect={redirect}
                title={'todo'}
                description={'todo'}
                keywords={'todo'}
                key={this.props.match.params.newsSlug}
* */
