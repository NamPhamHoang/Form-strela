import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerPlus } from '@fortawesome/pro-light-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { debounce } from 'lodash';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Path from '../../../components/Path/Path';
import LayoutCard from '../../../components/Cards/LayoutCards/LayoutCard';
import Title from '../../../components/Titles/Title/Title';
import Filters from '../../../components/Views/EMarketIndex/Filters/Filters';
import PerPage from '../../../components/Views/EMarketIndex/PerPage/PerPage';
import ItemCard from '../../../components/Views/EMarketIndex/ItemCard/ItemCard';
import { API_EMARKET_FILTERS, API_EMARKET_INDEX, API_EMARKET_PANEL_FAV_TOGGLE } from '../../../api';
import { buildQuery, getQuery } from '../../../helpers';
import WrappedBuildPagination from '../../../components/Pagination/WrappedBuildPagination';
import NoItemsMessage from '../../../components/NoItemsMessage/NoItemsMessage';

class EMarketIndex extends Component {
    state = {
        items: [],
        pages: null,
        filters: [],
        // filtersLoading: true,
        // itemsLoading: true,
        redirect: null,
    };

    getQuery = getQuery.bind(this);

    buildQuery = buildQuery.bind(this);

    fetchData = debounce(() => {
        const page = this.getQuery('strona') || 1;
        const perPage = this.getQuery('ilosc') || 20;
        const hasImage = this.getQuery('tylko-zdjecie') || 0;
        const category = this.getQuery('kategoria');
        const subcategory = this.getQuery('podkategoria');
        const subsubcategory = this.getQuery('podpodkategoria');
        const userId = this.getQuery('uzytkownik');
        const filters = this.getQuery('filtry');
        const API = new URL(API_EMARKET_INDEX);
        API.searchParams.append('perPage', perPage);
        API.searchParams.append('page', page);
        API.searchParams.append('hasImage', hasImage);
        if (userId) API.searchParams.append('user_id', userId);
        if (filters) API.searchParams.append('filters', filters);
        if (subsubcategory) API.searchParams.append('category', subsubcategory);
        else if (subcategory) API.searchParams.append('category', subcategory);
        else if (category) API.searchParams.append('category', category);

        const { token } = this.props;
        const config = {
            headers: {},
        };
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        axios
            .get(API.href, config)
            .then(response => {
                this.setState(() => {
                    const { ads, all, pages } = response.data;
                    return {
                        itemsLoading: false,
                        items: ads,
                        all,
                        pages,
                    };
                });
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        redirect: `/${error.response.status || '404'}`,
                    });
                }
            });
    }, 500);

    componentDidMount() {
        this.fetchData();
        this.fetchFilters();
    }

    componentDidUpdate(prevProps) {
        const { search: searchOld } = prevProps.location;
        const { search } = this.props.location;
        if (searchOld !== search) {
            this.fetchData();
        }
    }

    fetchFilters = () => {
        axios
            .get(API_EMARKET_FILTERS)
            .then(response => {
                this.setState({
                    filters: response.data.filters,
                    // filtersLoading: false,
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || '404'}`,
                });
            });
    };

    toggleFavorite = id => {
        const { token } = this.props;
        if (!token) {
            NotificationManager.error('Musisz być zalogowanym by dodać do ulubionych');
            return;
        }

        const fd = {
            // eslint-disable-next-line camelcase
            ad_id: id,
        };

        axios
            .post(API_EMARKET_PANEL_FAV_TOGGLE, fd, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                this.setState(state => {
                    const items = [...state.items];
                    const index = items.findIndex(item => item.id === id);
                    items[index].fav = response.data.fav;
                    return { items };
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się dodać do ulubionych');
            });
    };

    getUsername = () => {
        const userId = this.getQuery('uzytkownik');
        if (userId) {
            const { items } = this.state;
            if (items[0]) {
                const { name } = items[0];
                return { name, userId };
            }
        }

        return {};
    };

    renderTitle = () => {
        const { name } = this.getUsername();
        const title = name ? `eTarg - ogłoszenia użytkownika ${name}` : 'eTarg';

        return title;
    };

    renderPathItems = () => {
        const path = [
            { url: '/', label: 'Strona główna' },
            { url: '/e-targ', label: 'eTarg' },
        ];
        const { userId, name } = this.getUsername();

        if (userId) {
            path.push({ url: `/e-targ?uzytkownik=${userId}`, label: `Ogłoszenia użytkownika ${name}` });
        }

        return path;
    };

    render() {
        const { filters, pages, items, photoOnly, redirect } = this.state;
        const perPage = this.getQuery('ilosc') || 20;
        return (
            <>
                <Helmet>
                    <title>eTarg - Oficjalny Portal Gminy Jarocin</title>
                    <meta
                        name="description"
                        content="eTarg - sprzedaż, wynajem, zamiana! Wiele ogłoszeń z gminy Jarocin w jednym miejscu!"
                    />
                </Helmet>
                {redirect && <Redirect to={redirect} />}
                <Path items={this.renderPathItems()} />
                <LayoutCard className="e-market-index">
                    <Row>
                        <Col className="description">
                            <Title>{this.renderTitle()}</Title>
                        </Col>
                        <Col sm="auto" className="add-button">
                            <div>
                                <Link to="/e-targ/dodaj" className="btn btn-primary btn-sm add-button">
                                    <FontAwesomeIcon icon={faLayerPlus} /> Dodaj ogłoszenie
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <Filters
                        filters={filters}
                        photoOnly={photoOnly}
                        buildQuery={this.buildQuery}
                        getQuery={this.getQuery}
                        push={this.props.history.push}
                        search={this.props.location.search}
                    />
                    <NoItemsMessage message="Nie ma żadnych ogłoszeń" condition={items.length !== 0}>
                        <PerPage className="first-per-page" perPage={perPage} buildQuery={this.buildQuery} />
                        <Row className="gutters-md mt-sm-5">
                            {items.map(item => (
                                <ItemCard key={item.id} {...item} toggleFavorite={this.toggleFavorite} />
                            ))}
                        </Row>
                        <PerPage className="second-per-page" perPage={perPage} buildQuery={this.buildQuery} />
                    </NoItemsMessage>
                    <WrappedBuildPagination
                        current={parseInt(this.getQuery('strona'), 10) || 1}
                        max={pages}
                        buildQuery={this.buildQuery}
                    />
                </LayoutCard>
            </>
        );
    }
}

const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps)(EMarketIndex);
/*
 * loading={filtersLoading || itemsLoading} redirect={redirect}
 * */
