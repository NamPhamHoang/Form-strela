import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { Redirect } from 'react-router-dom';
import LayoutCardWithTitleAndPath from '../../templates/LayoutCardWithTitleAndPath';
import BackgroundSquare from '../BackgroundSquare/BackgroundSquare';
import OrderType from './OrderType/OrderType';
import Items from './Items/Items';
import Checkout from './Checkout/Checkout';
import { logInAction } from '../../actions';
import { API_USER_DATA_SHOW } from '../../api';

class Basket extends Component {
    state = {
        tab: 1,
        login: {
            form: {
                email: '',
                password: '',
            },
            errors: {},
        },
        register: {
            form: {
                email: '',
            },
            errors: {},
        },
        guest: {
            form: {
                email: '',
                // eslint-disable-next-line camelcase
                first_name: '',
                // eslint-disable-next-line camelcase
                last_name: '',
            },
            errors: {},
        },
        checkout: {
            form: {
                address: '',
                city: '',
                postal: '',
                // eslint-disable-next-line camelcase
                first_name: '',
                // eslint-disable-next-line camelcase
                last_name: '',
                phone: '',
                email: '',
                // eslint-disable-next-line camelcase
                payment_type: '',
            },
            errors: {},
        },
    };

    submitPayment = e => {
        e.preventDefault();
        const { basket, paymentURL, token } = this.props;
        const config = {};
        if (token) {
            config.headers = {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        const fd = {
            ...this.state.checkout.form,
            ...basket,
        };
        axios
            .post(paymentURL, fd, config)
            .then(response => {
                window.location = response.data.url;
            })
            .catch(error => {
                NotificationManager.error('Nie udało się wysłać zamówienia. Sprawdź błędy');
                if (error.response) {
                    this.setState(state => {
                        const checkout = { ...state.checkout };
                        checkout.errors = error.response.data.errors;
                        return { checkout };
                    });
                }
            });
    };

    handleFormChange = (e, type) => {
        const { value, name } = e.target;
        this.setState(state => {
            const form = { ...state[type] };
            form.form[name] = value;
            return {
                [type]: form,
            };
        });
    };

    paymentChange = value => {
        this.setState(state => {
            const checkout = { ...state.checkout };
            // eslint-disable-next-line camelcase
            checkout.form.payment_type = value;
            return { checkout };
        });
    };

    setTab = tab => {
        this.setState({ tab });
    };

    loginSubmit = e => {
        e.preventDefault();
        const { login } = this.state;
        this.props.login(login.form.email, login.form.password);
    };

    guestSubmit = e => {
        e.preventDefault();
        this.setState(state => {
            const checkout = { ...state.checkout };
            const guest = { ...state.guest };
            checkout.form.email = guest.form.email;
            // eslint-disable-next-line camelcase
            checkout.form.first_name = guest.form.first_name;
            // eslint-disable-next-line camelcase
            checkout.form.last_name = guest.form.last_name;

            return { checkout, tab: 3 };
        });
    };

    getLoggedUserData = () => {
        const { token } = this.props;
        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            axios
                .get(API_USER_DATA_SHOW)
                .then(response => {
                    this.setState(state => {
                        const checkout = { ...state.checkout };
                        const { userData } = response.data;
                        checkout.form.address = `${userData.street} ${userData.houseNumber}${
                            userData.apartmentNumber ? `/${userData.apartmentNumber}` : ''
                        }`;
                        checkout.form.city = userData.city;
                        checkout.form.postal = userData.postCode;
                        // eslint-disable-next-line camelcase
                        checkout.form.first_name = userData.name;
                        // eslint-disable-next-line camelcase
                        checkout.form.last_name = userData.surname;
                        checkout.form.email = userData.email;
                        checkout.form.phone = userData.phone;
                        return {
                            checkout,
                            tab: 3,
                        };
                    });
                })
                .catch(() => {
                    NotificationManager.error('Nie udało się pobrać danych');
                });
        }
    };

    render() {
        const {
            category,
            shippingPrice,
            // loading,
            redirect,
            freeShippingPrice,
            minimalShippingPrice,
            className,
            pathItems,
            basket,
            // title,
            // description,
            // keywords,
            id,
            remove,
            changeQuantity,
            error,
        } = this.props;
        const { tab, login, register, guest, checkout } = this.state;
        let currentElement;
        if (tab === 1) {
            currentElement = (
                <Items
                    basket={basket}
                    basketId={id}
                    remove={remove}
                    changeQuantity={changeQuantity}
                    setTab={() => this.setTab(2)}
                    shippingPrice={shippingPrice}
                    freeShippingPrice={freeShippingPrice}
                    minimalShippingPrice={minimalShippingPrice}
                />
            );
        } else if (tab === 2) {
            currentElement = (
                <OrderType
                    loginError={error}
                    loginSubmit={this.loginSubmit}
                    guestSubmit={this.guestSubmit}
                    handleChange={this.handleFormChange}
                    setTab={() => this.setTab(3)}
                    login={login}
                    register={register}
                    guest={guest}
                />
            );
        } else if (tab === 3) {
            currentElement = (
                <Checkout
                    submitPayment={this.submitPayment}
                    handleChange={this.handleFormChange}
                    checkout={checkout}
                    paymentChange={this.paymentChange}
                    basket={basket}
                    shippingPrice={parseFloat(freeShippingPrice) < parseFloat(basket.sum) ? '0,00' : shippingPrice}
                />
            );
        }
        if (tab === 2) {
            this.getLoggedUserData();
        }
        return (
            <>
                {redirect && <Redirect to={redirect} />}
                <LayoutCardWithTitleAndPath
                    pathItems={pathItems}
                    category={category}
                    title="Koszyk"
                    className={`basket ${className}`}
                >
                    <BackgroundSquare />
                    {currentElement}
                </LayoutCardWithTitleAndPath>
            </>
        );
    }
}

Basket.defaultProps = {
    className: '',
    category: '',
    pathItems: [],
    loading: false,
    redirect: null,
};

const mapStateToProps = ({ error, token }) => ({ error, token });

export default connect(mapStateToProps, {
    login: logInAction,
})(Basket);

/*
*  title={title}
                description={description}
                keywords={keywords}
                loading={loading}
                redirect={redirect}
* */
