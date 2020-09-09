import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/pro-light-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import Path from '../../components/Path/Path';
import LayoutCard from '../../components/Cards/LayoutCards/LayoutCard';
import Title from '../../components/Titles/Title/Title';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import BackgroundSquare from '../../components/BackgroundSquare/BackgroundSquare';
import Information from '../../components/Views/OrderFoodShow/Information/Information';
import Menu from '../../components/Views/OrderFoodShow/Menu/Menu';
import { API_RESTAURANT_SHOW } from '../../api';
import BasketModal from '../../components/Modals/BasketModal/BasketModal';

const TabButton = ({ label, active, onClick, tabId }) => (
    <Col md={6}>
        <Button
            className="btn-block"
            size="sm"
            variant={active ? 'primary' : 'outline-primary'}
            onClick={() => {
                onClick(tabId);
            }}
        >
            {label}
        </Button>
    </Col>
);

class OrderFoodShow extends Component {
    state = {
        tab: 1,
        restaurant: {},
        photos: [],
        menu: [],
        // restaurantData: {},
        loading: true,
        redirect: null,
        basketModal: {
            opened: false,
            name: '',
            description: '',
            variants: [],
        },
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, redirect } = this.state;
        if (redirect) return;
        const { slug: oldSlug } = prevState.restaurant;
        const { slug } = this.props.match.params;

        if (slug && oldSlug && slug !== oldSlug) {
            this.resetData();
            return;
        }

        if (loading) {
            this.fetchData();
        }
    }

    resetData = () => {
        this.setState({
            loading: true,
            photos: [],
            restaurant: {},
            menu: [],
        });
    };

    fetchData = () => {
        const { slug } = this.props.match.params;
        const API = API_RESTAURANT_SHOW(slug);

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

    openBasketModal = (categoryId, itemId) => {
        const category = this.state.menu.find(cat => cat.id === categoryId);
        const item = category.items.find(it => it.id === itemId);
        const { name, description, variants } = item;
        this.setState({
            basketModal: {
                name,
                description,
                variants,
                opened: true,
            },
        });
    };

    closeBasketModal = () => {
        this.setState(state => {
            const basketModal = { ...state.basketModal };
            basketModal.opened = false;

            return {
                basketModal,
            };
        });
    };

    changeTab = id => {
        const tab = { ...this.state.tab };
        if (tab === id) return;

        this.setState({
            tab: id,
        });
    };

    render() {
        const { restaurant, photos, tab, menu, redirect, basketModal } = this.state;
        const { orderFood } = this.props.baskets;
        return (
            <>
                {redirect && <Redirect to={redirect} />}
                <Path
                    items={[
                        { url: '/', label: 'Strona główna' },
                        { url: '/zamow-jedzenie', label: 'Zamów jedzenie' },
                        { url: `/zamow-jedzenie/${restaurant.slug}`, label: restaurant.name },
                    ]}
                />
                <BasketModal
                    data={basketModal}
                    closeModal={this.closeBasketModal}
                    seller={restaurant.slug}
                    sellerName={restaurant.name}
                >
                    <h5>{basketModal.name}</h5>
                </BasketModal>

                <LayoutCard className="company-show order-food-show">
                    <BackgroundSquare />
                    {restaurant.logo && (
                        <div className="logo-container">
                            <img src={restaurant.logo} alt={`Logo firmy ${restaurant.title}`} />
                        </div>
                    )}
                    <Row>
                        <Col>
                            <SectionTitle>Zamów jedzenie</SectionTitle>
                            <Title>{restaurant.name}</Title>
                        </Col>
                        <Col xs={12} lg="auto" className="d-flex align-items-end">
                            <Link to="/zamow-jedzenie/koszyk" className="btn btn-orange btn-sm add-button">
                                <FontAwesomeIcon icon={faShoppingCart} /> Koszyk - {orderFood.sum}zł
                            </Link>
                        </Col>
                    </Row>
                    {orderFood.seller && restaurant.slug !== orderFood.seller && (
                        <p className="text-danger fw-300">
                            Uwaga! Już masz w koszyku dania restauracji {orderFood.sellerName}. W koszyku mogą znajdować
                            się dania tylko jednego dostawcy. Ponowny wybór spowoduje utratę poprzedniego koszyka.
                        </p>
                    )}
                    <Row className="tab-buttons">
                        <TabButton label="Menu" onClick={this.changeTab} tabId={1} active={tab === 1} />
                        <TabButton label="Informacje" onClick={this.changeTab} tabId={2} active={tab === 2} />
                    </Row>
                    {tab === 1 && <Menu menu={menu} openBasketModal={this.openBasketModal} />}
                    {tab === 2 && <Information item={restaurant} photos={photos} />}
                </LayoutCard>
            </>
        );
    }
}

const mapStateToProps = ({ baskets }) => ({ baskets });

export default connect(mapStateToProps)(OrderFoodShow);

/*
loading={loading}
                redirect={redirect}
                title="todo"
                description="todo"
                keywords="todo"
* */
