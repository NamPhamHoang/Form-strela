import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import LayoutCardWithTitleAndPath from '../../../templates/LayoutCardWithTitleAndPath';
import { API_NEWS_INDEX } from '../../../api';
import { buildQuery, getQuery } from '../../../helpers';
import WrappedBuildPagination from '../../../components/Pagination/WrappedBuildPagination';
import { NewsListItem } from './NewsCard';

class PublicConsultationNewsIndex extends Component {
    state = {
        pages: null,
        news: [],
    };

    constructor(props) {
        super(props);
        this.buildQuery = buildQuery.bind(this);
        this.getQuery = getQuery.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        const { search: searchOld } = prevProps.location;
        const { search } = this.props.location;
        if (searchOld !== search) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const API = new URL(API_NEWS_INDEX);
        const type = this.getQuery('rodzaj');
        const page = this.getQuery('strona') || 1;
        if (type) API.searchParams.append('type', type);
        if (page) API.searchParams.append('page', page);
        axios
            .get(API.href, {
                params: {
                    category: 4,
                },
            })
            .then(response => {
                const { news, pages } = response.data;

                this.setState({
                    news,
                    pages,
                });
            })
            .catch(() => {});
    };

    render() {
        const { news, pages } = this.state;
        return (
            <>
                <Helmet>
                    <title>Konsultacje społeczne - Oficjalny Portal Gminy Jarocin</title>
                    <meta
                        name="description"
                        content="Konsultacje społeczne - bądź na bieżąco z tym co dzieje się wokół Ciebie, Twój głos ma znaczenie!"
                    />
                </Helmet>
                <LayoutCardWithTitleAndPath
                    pathItems={[
                        { url: '/', label: 'Strona główna' },
                        { url: '/konsultacje-spoleczne', label: 'Konsultacje społeczne' },
                    ]}
                    category="Konsultacje społeczne"
                    title="Konsultacje społeczne"
                    className="news-index"
                >
                    <main>
                        {news.map(item => (
                            <NewsListItem
                                key={item.slug}
                                {...item}
                                sneakPeek={item.sneak_peak}
                                date={item.published_at}
                                categoryLink="konsultacje-spoleczne"
                            />
                        ))}
                    </main>
                    <WrappedBuildPagination
                        current={parseInt(this.getQuery('strona'), 10) || 1}
                        max={pages}
                        buildQuery={this.buildQuery}
                    />
                </LayoutCardWithTitleAndPath>
            </>
        );
    }
}

export default PublicConsultationNewsIndex;
/*
 * title="todo" description="todo" keywords="todo" redirect={redirect} loading={loading}
 * */
