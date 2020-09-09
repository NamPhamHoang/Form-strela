import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import PanelTemplate from '../../templates/PanelTemplate';
import { changeHelper } from '../../helpers';
import Input from '../../components/Input/Input';
import ButtonPanelSubmit from '../../components/Buttons/ButtonPanelSubmit';
import BackgroundSquare from '../../components/BackgroundSquare/BackgroundSquare';
import { API_USER_DATA_STORE } from '../../api';
import { updateHasChangedDataAction } from '../../actions';

class CompleteData extends Component {
    state = {
        data: {
            form: {
                name: '',
                surname: '',
                companyName: '',
                pesel: '',
                nip: '',
                street: '',
                houseNumber: '',
                apartmentNumber: '',
                postCode: '',
                city: '',
            },
            errors: {},
        },
        redirect: null,
        loading: false,
    };

    componentDidMount() {
        console.log("componentDidMount");
        const { hasChangedData } = this.props;
        if (hasChangedData) {
            this.setState({
                redirect: '/panel/ustawienia',
            });
        }
    }

    handleChange = (e) => {
        const [name, value] = changeHelper(e);
        this.setState(prevState => {
            const data = { ...prevState.data };
            data.form[name] = value;
            return { data };
        });
    };

    formSubmit = (e) => {
        e.preventDefault();
        const { data } = this.state;
        const fd = data.form;
        axios.post(API_USER_DATA_STORE, fd)
            .then(async () => {
                NotificationManager.success('Pomyślnie zaktualizowano dane');
                await this.props.updateHasChangedData(true);
                this.setState({
                    redirect: '/panel/ustawienia',
                });
            })
            .catch(error => {
                if (error.response.status === 422) {
                    data.errors = error.response.data.errors;
                    NotificationManager.error('Nie udało się edytować danych');
                    this.setState({
                        data,
                    });
                } else {
                    this.setState({
                        redirect: `/${error.response.status} || 404`,
                    });
                }
            });
    };

    render() {
        const { data, redirect, loading } = this.state;
        const { role } = this.props;
        return (
            <PanelTemplate
                redirect={redirect}
                loading={loading}
                className="complete-data"
            >
                <BackgroundSquare/>
                <img src="https://picsum.photos/500/500" alt="todo" className="positioned-image"/>
                <h4 className="main-title">
                    Aby przejść do wszystkich funkcjonalności w panelu {role === 1 ? 'klienta' : 'firmy'}&nbsp;<strong>uzupełnij
                    poniższe dane</strong>:
                </h4>
                <Row className="justify-content-center justify-content-lg-start">
                    <Col xs={12} sm={8} lg={7} xl={5}>
                        <Form onSubmit={this.formSubmit}>
                            {role === 1 && (
                                <>
                                    <Input
                                        label="Imię"
                                        name="name"
                                        onChange={this.handleChange}
                                        value={data.form.name}
                                        error={data.errors.name}
                                        variant="shadow"
                                        size="lg"
                                        floating
                                    />
                                    <Input
                                        label="Nazwisko"
                                        name="surname"
                                        onChange={this.handleChange}
                                        value={data.form.surname}
                                        error={data.errors.surname}
                                        variant="shadow"
                                        size="lg"
                                        floating
                                    />
                                    <Input
                                        label="PESEL"
                                        name="pesel"
                                        onChange={this.handleChange}
                                        value={data.form.pesel}
                                        error={data.errors.pesel}
                                        variant="shadow"
                                        size="lg"
                                        floating
                                    />
                                </>
                            )}
                            {role === 2 && <>
                                <Input
                                    label="Nazwa firmy"
                                    name="companyName"
                                    onChange={this.handleChange}
                                    value={data.form.companyName}
                                    error={data.errors.companyName}
                                    variant="shadow"
                                    size="lg"
                                    floating
                                />
                                <Input
                                    label="NIP"
                                    name="nip"
                                    onChange={this.handleChange}
                                    value={data.form.nip}
                                    error={data.errors.nip}
                                    variant="shadow"
                                    size="lg"
                                    floating
                                />
                            </>}
                            <Input
                                label="Ulica"
                                name="street"
                                onChange={this.handleChange}
                                value={data.form.street}
                                error={data.errors.street}
                                variant="shadow"
                                size="lg"
                                floating
                            />
                            <Row className="gutters-sm">
                                <Col xs={12} sm={6}>
                                    <Input
                                        label="Numer domu"
                                        name="houseNumber"
                                        onChange={this.handleChange}
                                        value={data.form.houseNumber}
                                        error={data.errors.houseNumber}
                                        variant="shadow"
                                        size="lg"
                                        floating
                                    />
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Input
                                        label="Numer mieszkania"
                                        name="apartmentNumber"
                                        onChange={this.handleChange}
                                        value={data.form.apartmentNumber}
                                        error={data.errors.apartmentNumber}
                                        variant="shadow"
                                        size="lg"
                                        floating
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Kod pocztowy"
                                name="postCode"
                                onChange={this.handleChange}
                                value={data.form.postCode}
                                error={data.errors.postCode}
                                variant="shadow"
                                size="lg"
                                floating
                            />
                            <Input
                                label="Miejscowość"
                                name="city"
                                onChange={this.handleChange}
                                value={data.form.city}
                                error={data.errors.city}
                                variant="shadow"
                                size="lg"
                                floating
                            />
                            <ButtonPanelSubmit/>
                        </Form>
                    </Col>
                </Row>
            </PanelTemplate>
        );
    }
}

const mapStateToProps = ({ role, hasChangedData }) => ({ role, hasChangedData });

export default connect(mapStateToProps, {
    updateHasChangedData: updateHasChangedDataAction,
})(CompleteData);