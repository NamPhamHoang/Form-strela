import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import FormCheck from 'react-bootstrap/FormCheck';
import axios from 'axios';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import SelectAndDate from '../../components/Panel/Filters/SelectAndDate';
import { API_COMPANY_RESTAURANT_ORDERS, API_COMPANY_RESTAURANT_ORDERS_UPDATE } from '../../api';

const TableItem = ({ id, date, status, statusId, address, price, paymentType, items, statusChange }) => {
    const [opened, setOpened] = useState(false);
    return (
        <Accordion defaultActiveKey="0">
            <div className={`tr ${opened ? 'bg-light' : ''}`}>
                <div className="td">{id}</div>
                <div className="td">{moment(date).format('DD.MM.YYYY')}</div>
                <div className="td">{status}</div>
                <div className="td">{address}</div>
                <div className="td">{price} zł</div>
                <div className="td">{paymentType}</div>
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
                </div>
                <Accordion.Collapse eventKey="1">
                    <div className="inside-collapse">
                        <div className="items-list">
                            <ul className="list-unstyled mb-0">
                                {items.map(item => (
                                    <li key={item.id}>
                                        {item.quantity}x - {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="statuses">
                            <FormCheck
                                custom
                                type="radio"
                                name={`status-${id}`}
                                id={`status1-${id}`}
                                label="Zamówienie przyjęte"
                                onChange={() => statusChange(id, 0)}
                                checked={statusId === 0}
                            />
                            <FormCheck
                                custom
                                type="radio"
                                name={`status-${id}`}
                                id={`status2-${id}`}
                                label="W przygotowaniu"
                                onChange={() => statusChange(id, 1)}
                                checked={statusId === 1}
                            />
                            <FormCheck
                                custom
                                type="radio"
                                name={`status-${id}`}
                                id={`status3-${id}`}
                                label="Dowóz"
                                onChange={() => statusChange(id, 2)}
                                checked={statusId === 2}
                            />
                            <FormCheck
                                custom
                                type="radio"
                                name={`status-${id}`}
                                id={`status4-${id}`}
                                label="Dostarczone"
                                onChange={() => statusChange(id, 3)}
                                checked={statusId === 3}
                            />
                        </div>
                    </div>
                </Accordion.Collapse>
            </div>
        </Accordion>
    );
};

class RestaurantOrders extends Component {
    state = {
        orders: [],
        statuses: [
            { id: 0, name: 'Zamówienie przyjęte' },
            { id: 1, name: 'W przygotowaniu' },
            { id: 2, name: 'Dowóz' },
            { id: 3, name: 'Dostarczone' },
        ],
        loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = (filters = null) => {
        const API = new URL(API_COMPANY_RESTAURANT_ORDERS(this.props.panelCompany.id));
        if (filters) {
            if (filters.select) API.searchParams.append('status', filters.select);
            if (filters.date) API.searchParams.append('date', filters.date);
        }
        axios
            .get(API.href)
            .then(response => {
                this.setState({
                    orders: response.data,
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

    statusChange = (id, value) => {
        const API = API_COMPANY_RESTAURANT_ORDERS_UPDATE(this.props.panelCompany.id, id);
        const fd = { status: value };
        axios
            .put(API, fd)
            .then(response => {
                this.setState(state => {
                    const orders = [...state.orders];
                    const index = orders.findIndex(order => order.id === id);
                    orders[index] = response.data;
                    NotificationManager.success('Pomyślnie zmieniono status');

                    return {
                        orders,
                    };
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się zmienić statusu');
            });
    };

    render() {
        const { orders, statuses, redirect, loading } = this.state;
        return (
            <PanelTemplate company redirect={redirect} loading={loading} className="restaurant-orders">
                <SectionTitle>Restauracja - zamówienia</SectionTitle>
                <SelectAndDate handleSearch={this.handleSearch} selectLabel="Status zamówienia">
                    <option value="">Wszystkie</option>
                    {statuses.map(({ id, name }) => (
                        <option value={id} key={id}>
                            {name}
                        </option>
                    ))}
                </SelectAndDate>
                <div className="table-responsive">
                    <div className="simulated-table simulated-table-sm simulated-table-simple">
                        <div className="thead">
                            <div className="tr">
                                <div className="th">Numer zamówienia</div>
                                <div className="th">Data zamówienia</div>
                                <div className="th">Status</div>
                                <div className="th">Dane dostawy</div>
                                <div className="th">Kwota</div>
                                <div className="th">Forma płatności</div>
                                <div className="th">Akcje</div>
                            </div>
                        </div>
                        <div className="tbody">
                            {orders.map(
                                ({
                                    id,
                                    created_at: createdAt,
                                    statusName,
                                    number,
                                    status,
                                    street,
                                    city,
                                    postal,
                                    phone,
                                    first_name: firstName,
                                    last_name: lastName,
                                    price,
                                    paymentType,
                                    items,
                                }) => (
                                    <TableItem
                                        key={id}
                                        id={id}
                                        date={createdAt}
                                        status={statusName}
                                        statusId={status}
                                        address={
                                            <>
                                                {firstName} {lastName}
                                                <br />
                                                ul. {street} {number}
                                                <br />
                                                {postal} {city}
                                                <br />
                                                Tel: {phone}
                                            </>
                                        }
                                        price={price}
                                        paymentType={paymentType}
                                        items={items}
                                        statusChange={this.statusChange}
                                    />
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </PanelTemplate>
        );
    }
}

const mapStateToProps = ({ panelCompany }) => ({ panelCompany });

export default connect(mapStateToProps)(RestaurantOrders);
