import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import TextAndDate from '../../components/Panel/Filters/TextAndDate';
import { API_COMPANY_RESTAURANT_ORDERS_USER } from '../../api';

const TableItem = ({ name, date, number, items, ship }) => {
    const [opened, setOpened] = useState(false);
    const sumPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <Accordion defaultActiveKey="0">
            <div className={`tr ${opened ? 'bg-light' : ''}`}>
                <div className="td">{name}</div>
                <div className="td">{date}</div>
                <div className="td">{number}</div>
                <div className="td">{(sumPrice + parseFloat(ship)).toFixed(2).replace('.', ',')} zł</div>
                <div className="td action-buttons">
                    <Accordion.Toggle
                        eventKey="1"
                        as={Button}
                        variant="primary"
                        size="sm"
                        onClick={() => setOpened(!opened)}
                    >
                        {opened ? 'Schowaj' : 'Zobacz'}
                    </Accordion.Toggle>
                    <Button variant="primary-darken" size="sm">
                        Ponów
                    </Button>
                </div>
                <Accordion.Collapse eventKey="1">
                    <div className="inside-collapse">
                        <p className="d-lg-none">Numer zamówienia: {number}</p>
                        <div className="items-list">
                            {items.map(item => {
                                const finalPrice = (item.price * item.quantity).toFixed(2).replace('.', ',');
                                return (
                                    <article key={item.id}>
                                        <div className="item-title">{item.name}</div>
                                        <div className="quantity">
                                            <input value={item.quantity} className="form-control" readOnly />
                                        </div>
                                        <div className="price">{finalPrice} zł</div>
                                    </article>
                                );
                            })}
                        </div>
                        <div className="sum">
                            <p>
                                Razem: {sumPrice.toFixed(2).replace('.', ',')} zł
                                <br />
                                Dostawa: {ship} zł
                                <br />
                                Razem: {(sumPrice + parseFloat(ship)).toFixed(2).replace('.', ',')} zł
                                <br />
                            </p>
                        </div>
                    </div>
                </Accordion.Collapse>
            </div>
        </Accordion>
    );
};

class OrderFoodPanel extends Component {
    state = {
        orders: [],
        loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = (filters = null) => {
        const API = new URL(API_COMPANY_RESTAURANT_ORDERS_USER);
        if (filters) {
            if (filters.text) API.searchParams.append('search', filters.text);
            if (filters.date) API.searchParams.append('date', filters.date);
        }
        axios
            .get(API.href)
            .then(response => {
                this.setState({
                    orders: response.data.data,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
            });
    };

    handleSearch = values => {
        this.fetchData(values);
    };

    render() {
        const { orders, loading, redirect } = this.state;
        return (
            <PanelTemplate className="order-food-panel" redirect={redirect} loading={loading}>
                <SectionTitle>Moje zamówienia</SectionTitle>
                <TextAndDate handleSearch={this.handleSearch} />
                <div className="table-responsive">
                    <div className="simulated-table simulated-table-sm simulated-table-simple">
                        <div className="thead">
                            <div className="tr">
                                <div className="th">Restauracja</div>
                                <div className="th">Data zakupu</div>
                                <div className="th">Numer zamówienia</div>
                                <div className="th">Kwota</div>
                                <div className="th action-buttons">Akcja</div>
                            </div>
                        </div>
                        <div className="tbody">
                            {orders.map(({ id, restaurant_name: name, date, price, ship_price: shipPrice, items }) => (
                                <TableItem
                                    key={id}
                                    name={name}
                                    date={date}
                                    number={id}
                                    price={price}
                                    ship={shipPrice}
                                    items={items}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </PanelTemplate>
        );
    }
}

export default OrderFoodPanel;
