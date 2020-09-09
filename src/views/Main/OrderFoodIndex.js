import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/pro-light-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import { debounce } from 'lodash';
import { Helmet } from 'react-helmet';
import Path from '../../components/Path/Path';
import LayoutCard from '../../components/Cards/LayoutCards/LayoutCard';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import Title from '../../components/Titles/Title/Title';
import ItemCard from '../../components/Views/OrderFoodIndex/ItemCard/ItemCard';
import { API_RESTAURANT_INDEX } from '../../api';
import Loading from '../../components/Loading/Loading';
import ButtonBasket from '../../components/Buttons/ButtonBasket/ButtonBasket';

class OrderFoodIndex extends Component {
    state = {
        restaurants: [],
        redirect: null,
        nextPage: null,
    };

    fetchData = debounce(() => {
        const { nextPage } = this.state;
        const API = nextPage || API_RESTAURANT_INDEX;
        axios
            .get(API)
            .then(response => {
                this.setState(state => {
                    const { restaurants } = state;
                    restaurants.push(...response.data.data);
                    return {
                        restaurants,
                        loading: false,
                        nextPage: response.data.links.next,
                    };
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
            });
    }, 500);

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const { restaurants, redirect, nextPage } = this.state;
        return (
            <>
                <Helmet>
                    <title>Zamów jedzenie - Oficjalny Portal Gminy Jarocin</title>
                    <meta
                        name="description"
                        content="Zamów jedzenie przez serwis jarocin.pl - szeroki wybór dań z najlepszych restauracji w Gminie!"
                    />
                </Helmet>
                {redirect && <Redirect to={redirect} />}
                <Path
                    items={[
                        { url: '/', label: 'Strona główna' },
                        { url: '/zamow-jedzenie', label: 'Zamów jedzenie' },
                    ]}
                />
                <LayoutCard className="order-food-index">
                    <Row>
                        <Col className="description">
                            <SectionTitle>Dla mieszkańców</SectionTitle>
                            <Title>Zamów jedzenie</Title>
                        </Col>
                        <Col sm="auto" className="buttons">
                            <div>
                                <Link to="/panel/firma/firmy" className="btn btn-primary btn-sm add-button">
                                    <FontAwesomeIcon icon={faBuilding} /> Dodaj swoją restaurację
                                </Link>
                            </div>
                            <div>
                                <ButtonBasket to="/zamow-jedzenie/koszyk" basketId="orderFood" />
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <InfiniteScroll
                                loadMore={this.fetchData}
                                hasMore={nextPage !== null}
                                loader={<Loading key={0} />}
                            >
                                {restaurants.map(restaurant => (
                                    <ItemCard key={restaurant.slug} {...restaurant} />
                                ))}
                            </InfiniteScroll>
                        </Col>
                    </Row>
                </LayoutCard>
            </>
        );
    }
}

export default OrderFoodIndex;

/*
* loading={loading}
                redirect={redirect}
                title="todo"
                description="todo"
                keywords="todo"
* */
