import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { NotificationManager } from 'react-notifications';
import Input from '../../../components/Input/Input';
import LayoutCard from '../../../components/Cards/LayoutCards/LayoutCard';
import Path from '../../../components/Path/Path';
import ButtonBack from '../../../components/Buttons/ButtonBack/ButtonBack';
import BackgroundSquare from '../../../components/BackgroundSquare/BackgroundSquare';
import { logInAction } from '../../../actions';
import { gate } from '../../../api';

const LInput = ({ type, name, label, onChange, value, error }) => (
    <Input
        label={label}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        error={error}
        variant="shadow"
        size="lg"
        floating
    />
);

class Login extends Component {
    state = {
        form: {
            data: {
                email: '',
                password: '',
            },
            errors: {},
        },
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState(state => {
            const form = { ...state.form };
            form.data[name] = value;

            return form;
        });
    };

    handleLogin = e => {
        e.preventDefault();
        const form = { ...this.state.form };
        const { login } = this.props;

        login(form.data.email, form.data.password);
    };

    render() {
        return (
            <>
                <Helmet>
                    <title>Logowanie - Oficjalny Portal Gminy Jarocin</title>
                    <meta
                        name="description"
                        content="Zaloguj się do panelu Użytkownika/Przedsiębiorcy w serwisie jarocin.pl"
                    />
                </Helmet>
                <Path
                    items={[
                        { url: '/', label: 'Strona główna' },
                        { url: '/logowanie', label: 'Logowanie' },
                    ]}
                />
                <LayoutCard className="login-and-register login">
                    <BackgroundSquare />
                    <BackgroundSquare variant="light-gray" />
                    <ButtonBack />
                    <Row className="row-eq-height">
                        <Col xs={12} lg={6} className="form">
                            <h2>Witaj ponownie!</h2>
                            <h5>Zaloguj się do swojego konta w portalu!</h5>
                            <Form onSubmit={this.handleLogin}>
                                <LInput
                                    label="E-mail"
                                    type="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.form.data.email}
                                    error={this.props.error ? [this.props.error] : undefined}
                                />
                                <LInput
                                    label="Hasło"
                                    type="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.form.data.password}
                                />
                                <Row className="gutters-sm additional">
                                    <Col xs={6} />
                                    <Col xs={6} className="password-reminder">
                                        <Link to="/reset-hasla">Nie pamiętam hasła</Link>
                                    </Col>
                                </Row>
                                <Button type="submit">Zaloguj się</Button>
                            </Form>
                            <Link to="/rejestracja" className="change-link">
                                Nie masz jeszcze konta?
                                <br className="d-md-none" /> <strong>Zarejestruj się!</strong>
                            </Link>
                        </Col>
                        <Col xs={12} lg={6} className="login-by-social">
                            <Button
                                className="fb"
                                onClick={() => {
                                    axios
                                        .post(`${gate}/social/facebook/redirect`)
                                        .then(({ data }) => {
                                            window.location = data;
                                        })
                                        .catch(() => {
                                            NotificationManager.error('Błąd - spróbuj ponownie');
                                        });
                                }}
                            >
                                <FontAwesomeIcon icon={faFacebookF} size="lg" /> Zaloguj się przez Facebook
                            </Button>

                            <Button
                                className="google"
                                onClick={() => {
                                    axios
                                        .post(`${gate}/social/google/redirect`)
                                        .then(({ data }) => {
                                            window.location = data;
                                        })
                                        .catch(() => {
                                            NotificationManager.error('Błąd - spróbuj ponownie');
                                        });
                                }}
                            >
                                <FontAwesomeIcon icon={faGoogle} size="lg" /> Zaloguj się przez Google
                            </Button>
                        </Col>
                    </Row>
                </LayoutCard>
            </>
        );
    }
}

const mapStateToProps = ({ error }) => ({ error });

export default connect(mapStateToProps, {
    login: logInAction,
})(Login);
