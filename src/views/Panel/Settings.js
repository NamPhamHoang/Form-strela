import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import ButtonPanelSubmit from '../../components/Buttons/ButtonPanelSubmit';
import Input from '../../components/Input/Input';
import { changeHelper, clearData, getData } from '../../helpers';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import { API_USER_CHANGE_PASSWORD, API_USER_DATA_SHOW, API_USER_DATA_UPDATE } from '../../api';

const LInput = props => {
    return <Input {...props} variant="shadow" size="lg" floating />;
};

class Settings extends Component {
    state = {
        data: {
            form: {
                name: '',
                surname: '',
                companyName: '',
                pesel: '',
                parentPesel: '',
                nip: '',
                street: '',
                houseNumber: '',
                apartmentNumber: '',
                postCode: '',
                city: '',
                email: '',
                phone: '',
            },
            errors: {},
        },
        password: {
            form: {
                // eslint-disable-next-line camelcase
                old_password: '',
                password: '',
                // eslint-disable-next-line camelcase
                password_confirmation: '',
            },
            errors: {},
        },
        redirect: null,
        loading: true,
    };

    componentDidMount() {
        const data = { ...this.state.data };
        axios
            .get(API_USER_DATA_SHOW)
            .then(response => {
                data.form = getData(response.data.userData);
                this.setState({
                    data,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
            });
    }

    handleChange = e => {
        const [name, value] = changeHelper(e);
        this.setState(prevState => {
            const form = { ...prevState.form };
            form[name] = value;
            return { form };
        });
    };

    handleDataChange = e => {
        const [name, value] = changeHelper(e);
        this.setState(prevState => {
            const data = { ...prevState.data };
            data.form[name] = value;
            return { data };
        });
    };

    handlePasswordChange = e => {
        const [name, value] = changeHelper(e);
        this.setState(prevState => {
            const password = { ...prevState.password };
            password.form[name] = value;

            return { password };
        });
    };

    handlePasswordSubmit = e => {
        e.preventDefault();
        const { password } = this.state;

        axios
            .post(API_USER_CHANGE_PASSWORD, password.form)
            .then(() => {
                NotificationManager.success('Pomyślnie zaktualizowano hasło');
                password.errors = {};
                this.setState({ password });
            })
            .catch(error => {
                NotificationManager.error('Nie udało się zaktualizować hasła');
                password.errors = error.response.data.errors;
                password.form = clearData(password.form);
                this.setState({ password });
            });
    };

    handleDataSubmit = e => {
        e.preventDefault();
        const { data } = this.state;

        axios
            .post(API_USER_DATA_UPDATE, data.form)
            .then(() => {
                NotificationManager.success('Pomyślnie zaktualizowano dane');
                data.errors = {};
                this.setState({ data });
            })
            .catch(error => {
                NotificationManager.error('Nie udało się zaktualizować danych');
                data.errors = error.response.data.errors;
                this.setState({ data });
            });
    };

    isParenPeselNeeded = () => {
        const {
            data: {
                form: { pesel },
            },
        } = this.state;

        if (pesel.toString().length === 11 && 1 === 0) {
            const year = pesel.toString().slice(0, 2);
            let month = pesel.toString().slice(2, 4);
            const day = pesel.toString().slice(4, 6);

            let fullYear;

            if (parseInt(month, 10) < 20) {
                fullYear = 1900 + parseInt(year, 10);
                month = parseInt(month, 10);
            } else if (parseInt(month, 10) < 40) {
                fullYear = 2000 + parseInt(year, 10);
                month = parseInt(month, 10) - 20;
            } else if (parseInt(month, 10) < 60) {
                fullYear = 2100 + parseInt(year, 10);
                month = parseInt(month, 10) - 40;
            } else if (parseInt(month, 10) < 80) {
                fullYear = 2200 + parseInt(year, 10);
                month = parseInt(month, 10) - 60;
            } else {
                fullYear = 1800 + parseInt(year, 10);
                month = parseInt(month, 10) - 80;
            }

            const date = new Date();
            date.setFullYear(fullYear, month - 1, parseInt(day, 10));
            const check18 = new Date(Date.now());

            return date.getTime() > check18.setYear(check18.getFullYear() - 18);
        }
        return false;
    };

    render() {
        // eslint-disable-next-line no-unused-vars
        const { loading, redirect, data, password } = this.state;
        // eslint-disable-next-line no-unused-vars
        const { role } = this.props;
        return (
            <PanelTemplate
                className="settings"
                title="Panel użytkownika"
                description="panel"
                keywords="panel"
                loading={loading}
                redirect={redirect}
            >
                <SectionTitle>Ustawienia</SectionTitle>
                <Row>
                    {/* <Col xs={12} md={6} xl={5}>
                        <p style={{ visibility: 'hidden' }}>Zmień dane</p>
                        <Form className="form-group-spacing-md" onSubmit={this.handleDataSubmit}>
                            {role === 1 && (
                                <>
                                    <LInput
                                        label="Imię"
                                        name="name"
                                        value={data.form.name}
                                        error={data.errors.name}
                                        onChange={this.handleDataChange}
                                    />
                                    <LInput
                                        label="Nazwisko"
                                        name="surname"
                                        value={data.form.surname}
                                        error={data.errors.surname}
                                        onChange={this.handleDataChange}
                                    />
                                    <LInput
                                        label="PESEL"
                                        name="pesel"
                                        value={data.form.pesel}
                                        error={data.errors.pesel}
                                        onChange={this.handleDataChange}
                                    />
                                    {this.isParenPeselNeeded() && (
                                        <LInput
                                            label="PESEL rodzica"
                                            name="parentPesel"
                                            value={data.form.parentPesel}
                                            error={data.errors.parentPesel}
                                            onChange={this.handleDataChange}
                                        />
                                    )}
                                </>
                            )}
                            {role === 2 && (
                                <>
                                    <LInput
                                        label="Nazwa firmy"
                                        name="companyName"
                                        value={data.form.companyName}
                                        error={data.errors.companyName}
                                        onChange={this.handleDataChange}
                                    />
                                    <LInput
                                        label="NIP"
                                        name="nip"
                                        value={data.form.nip}
                                        error={data.errors.nip}
                                        onChange={this.handleDataChange}
                                    />
                                </>
                            )}
                            <LInput
                                label="Ulica"
                                name="street"
                                value={data.form.street}
                                error={data.errors.street}
                                onChange={this.handleDataChange}
                            />
                            <Row className="gutters-sm">
                                <Col xs={12} sm={6}>
                                    <LInput
                                        label="Numer domu"
                                        name="houseNumber"
                                        value={data.form.houseNumber}
                                        error={data.errors.houseNumber}
                                        onChange={this.handleDataChange}
                                    />
                                </Col>
                                <Col xs={12} sm={6}>
                                    <LInput
                                        label="Numer mieszkania"
                                        name="apartmentNumber"
                                        value={data.form.apartmentNumber}
                                        error={data.errors.apartmentNumber}
                                        onChange={this.handleDataChange}
                                    />
                                </Col>
                            </Row>
                            <LInput
                                label="Kod pocztowy"
                                name="postCode"
                                value={data.form.postCode}
                                error={data.errors.postCode}
                                onChange={this.handleDataChange}
                            />
                            <LInput
                                label="Miejscowość"
                                name="city"
                                value={data.form.city}
                                error={data.errors.city}
                                onChange={this.handleDataChange}
                            />
                            <LInput
                                label="E-mail"
                                name="email"
                                value={data.form.email}
                                error={data.errors.email}
                                onChange={this.handleDataChange}
                            />
                            <LInput
                                label="Telefon"
                                name="phone"
                                value={data.form.phone}
                                error={data.errors.phone}
                                onChange={this.handleDataChange}
                            />
                            <ButtonPanelSubmit />
                        </Form>
                    </Col> */}
                    <Col xs={12} md={6} xl={5} className="mt-5 mt-lg-0">
                        <p>Zmień hasło</p>
                        <Form className="form-group-spacing-md" onSubmit={this.handlePasswordSubmit}>
                            <LInput
                                type="password"
                                label="Obecne hasło"
                                name="old_password"
                                value={password.form.old_password}
                                error={password.errors.old_password}
                                onChange={this.handlePasswordChange}
                            />
                            <LInput
                                type="password"
                                label="Nowe hasło"
                                name="password"
                                value={password.form.password}
                                error={password.errors.password}
                                onChange={this.handlePasswordChange}
                            />
                            <LInput
                                type="password"
                                label="Powtórz nowe hasło"
                                name="password_confirmation"
                                value={password.form.password_confirmation}
                                error={password.errors.password_confirmation}
                                onChange={this.handlePasswordChange}
                            />
                            <ButtonPanelSubmit />
                        </Form>
                    </Col>
                </Row>
            </PanelTemplate>
        );
    }
}

const mapStateToProps = ({ role }) => ({ role });

export default connect(mapStateToProps)(Settings);
