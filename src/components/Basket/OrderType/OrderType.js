import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Input from '../../Input/Input';
import Card from '../../Cards/Card';
import AnimationWrapper from '../../Views/InstitutionShow/AnimationWrapper';

const OrderType = (props) => {
    return (
        <AnimationWrapper>
            <Row className="order-type justify-content-center">
                <Col xs={12} lg={6} xl={4}>
                    <Card className="login">
                        <h5>Zaloguj się</h5>
                        <Form onSubmit={props.loginSubmit}>
                            <Input
                                label="E-mail"
                                name="email"
                                onChange={(e) => props.handleChange(e, 'login')}
                                value={props.login.form.email}
                                error={props.loginError ? [props.loginError] : undefined}
                                variant="shadow"
                                size="lg"
                                floating
                            />
                            <Input
                                type="password"
                                label="Hasło"
                                name="password"
                                onChange={(e) => props.handleChange(e, 'login')}
                                value={props.login.form.password}
                                variant="shadow"
                                size="lg"
                                floating
                            />
                            <Link to='/todo' className="password-reminder" style={{marginBottom:0}}>Nie pamiętam hasła</Link>
                            <Link to='/rejestracja' className="password-reminder" style={{marginBottom:0}}>Zarejestruj się</Link>
                            <Button type="submit">
                                Zaloguj się
                            </Button>
                        </Form>
                    </Card>
                </Col>
                <Col xs={12} lg={6} xl={4}>
                    <Card className="order-as-guest">
                        <h5>Zamów jako gość</h5>
                        <Form onSubmit={props.guestSubmit}>
                            <Input
                                label="E-mail"
                                name="email"
                                onChange={(e) => props.handleChange(e, 'guest')}
                                value={props.guest.form.email}
                                error={props.guest.errors.email}
                                variant="shadow"
                                size="lg"
                                floating
                            />
                            <Input
                                label="Imię"
                                name="first_name"
                                onChange={(e) => props.handleChange(e, 'guest')}
                                value={props.guest.form.first_name}
                                error={props.guest.errors.first_name}
                                variant="shadow"
                                size="lg"
                                floating
                            />
                            <Input
                                label="Nazwisko"
                                name="last_name"
                                onChange={(e) => props.handleChange(e, 'guest')}
                                value={props.guest.form.last_name}
                                error={props.guest.errors.last_name}
                                variant="shadow"
                                size="lg"
                                floating
                            />
                            <Button type="submit">
                                Przejdź do realizacji zamówienia
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </AnimationWrapper>
    );
};


export default OrderType;
