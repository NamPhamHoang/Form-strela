import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Basket from '../../components/Basket/Basket';
import { basketChangeQuantityAction, basketRemoveAction } from '../../actions';
import { API_RESTAURANT_PAYMENT, API_RESTAURANT_SHOW } from '../../api';

class OrderFoodBasket extends Component {
    state = {
        loading: true,
        redirect: null,
        freeShippingPrice: '0.00',
        minimalShippingPrice: '0.00',
        shippingPrice: '0.00',
    };

    componentDidMount() {
        const { seller } = this.props.baskets.orderFood;
        if (seller) {
            const API = API_RESTAURANT_SHOW(seller);
            axios.get(API)
                .then(response => {
                    this.setState(state => {
                        console.log(response.data);
                        const freeShippingPrice = response.data.restaurantData.free_shipping_value || '0.00';
                        const minimalShippingPrice = response.data.restaurantData.minimal_shipping_value || '0.00';
                        const shippingPrice = response.data.restaurantData.delivery_price || '0.00';
                        return {
                            loading: false, freeShippingPrice, shippingPrice, minimalShippingPrice,
                        };
                    });
                })
                .catch(error => {
                    this.setState({
                        redirect: '/404',
                    });
                });

        } else {
            this.setState({
                loading: false,
            });
        }
        console.log(this.props.baskets.orderFood.seller);
    }

    render() {
        const { loading, redirect, freeShippingPrice, minimalShippingPrice, shippingPrice } = this.state;
        return (
            <Basket
                id="orderFood"
                basket={this.props.baskets.orderFood}
                category="Zamów jedzenie"
                pathItems={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/zamow-jedzenie', label: 'Zamów jedzenie' },
                    { url: '/zamow-jedzenie/koszyk', label: 'Koszyk' },
                ]}
                title={'todo'}
                description={'todo'}
                keywords={'todo'}
                paymentURL={API_RESTAURANT_PAYMENT}
                remove={this.props.remove}
                changeQuantity={this.props.changeQuantity}
                freeShippingPrice={freeShippingPrice}
                minimalShippingPrice={minimalShippingPrice}
                shippingPrice={shippingPrice}
                loading={loading}
                redirect={redirect}
            />
        );
    }
}

const mapStateToProps = ({ baskets }) => ({ baskets });

export default connect(mapStateToProps, {
    remove: basketRemoveAction,
    changeQuantity: basketChangeQuantityAction,
})(OrderFoodBasket);

