import React, { Component } from 'react';
import Input from '../../components/Input/Input';
import { changeHelper, getData, setData } from '../../helpers';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { API_COMPANY_RESTAURANT_DATA_EDIT, API_COMPANY_RESTAURANT_DATA_UPDATE } from '../../api';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';


const LInput = (props) => {
    return (
        <Input
            {...props}
            variant="shadow"
            size="lg"
            floating
        />
    );
};

class RestaurantSettings extends Component {
    state = {
        form: {
            data: {
                minimal_shipping_value: '',
                free_shipping_value: '',
                waiting_time: '',
                cuisine_type: '',
                delivery_price: '',
            },
            errors: {},
        },
        loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const API = API_COMPANY_RESTAURANT_DATA_EDIT(this.props.panelCompany.id);
        axios.get(API)
            .then(response => {
                this.setState(state => {
                    const form = { ...state.form };
                    form.data = getData(response.data.data);
                    return {
                        form,
                        loading: false,
                    };
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
            });
    };

    change = (e) => {
        const [name, value] = changeHelper(e);
        this.setState(prevState => {
            const form = { ...prevState.form };
            form.data[name] = value;
            return { form };
        });
    };

    submit = (e) => {
        e.preventDefault();
        const { data } = this.state.form;
        const fd = setData(data);
        fd.append('_method', 'PUT');
        const API = API_COMPANY_RESTAURANT_DATA_UPDATE(this.props.panelCompany.id);
        axios.post(API, fd)
            .then(response => {
                this.setState(state => {
                    const form = { ...state.form };
                    form.errors = {};
                    NotificationManager.success('Pomyślnie zaktualizowano dane');
                    return { form };
                });
            })
            .catch(error => {
                if (error.response.status === 422) {
                    this.setState(state => {
                        const form = { ...state.form };
                        form.errors = error.response.data.errors;
                        NotificationManager.error('Nie udało się edytować danych');
                        return { form };
                    });
                } else {
                    this.setState({
                        redirect: `/${error.response.status || 404}`,
                    });
                }
            });

    };


    render() {
        const { loading, redirect, form } = this.state;

        return (
            <PanelTemplate
                loading={loading}
                redirect={redirect}
                className="restaurant-settings"
                company
            >
                <SectionTitle>Restauracja - Ustawienia</SectionTitle>
                <Row>
                    <Col xs={12} md={6} xl={5}>
                        <Form className="mt-5" onSubmit={this.submit}>
                            <LInput
                                label="Typ kuchni"
                                name="cuisine_type"
                                value={form.data.cuisine_type}
                                error={form.errors.cuisine_type}
                                onChange={this.change}
                            />
                            <LInput
                                label="Minimalna wartość zamówienia"
                                name="minimal_shipping_value"
                                value={form.data.minimal_shipping_value}
                                error={form.errors.minimal_shipping_value}
                                onChange={this.change}
                            />
                            <LInput
                                label="Cena dostawy"
                                name="delivery_price"
                                value={form.data.delivery_price}
                                error={form.errors.delivery_price}
                                onChange={this.change}
                            />
                            <LInput
                                label="Darmowa dostawa"
                                name="free_shipping_value"
                                value={form.data.free_shipping_value}
                                error={form.errors.free_shipping_value}
                                onChange={this.change}
                            />
                            <LInput
                                label="Czas oczekiwania"
                                name="waiting_time"
                                value={form.data.waiting_time}
                                error={form.errors.waiting_time}
                                onChange={this.change}
                            />
                            <Button type="submit" className="mt-5 text-white">
                                Zapisz
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </PanelTemplate>
        );
    }
}

const mapStateToProps = ({ panelCompany }) => ({ panelCompany });

export default connect(mapStateToProps)(RestaurantSettings);