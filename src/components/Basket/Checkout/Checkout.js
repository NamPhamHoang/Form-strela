import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '../../Cards/Card';
import Button from 'react-bootstrap/Button';
import Input from '../../Input/Input';
import AnimationWrapper from '../../Views/InstitutionShow/AnimationWrapper';

const Divider = ({ content }) => (
    <div className="form-group">
        <div className="form-control form-control-lg bg-primary text-white">{content}</div>
    </div>
);

const PaymentButton = ({ img, text, onClick, active }) => (
    <Button
        className={`btn-payment ${active ? 'active' : ''}`}
        onClick={onClick}
    >
        {img}
        <span className="text">{text}</span>
    </Button>
);

const Checkout = (props) => {
    return (
        <AnimationWrapper>
            <Form onSubmit={props.submitPayment} className="checkout">
                <Row>
                    <Col>
                        <Divider content="Gdzie dostarczyć Twoje zamówienie?"/>
                        <Input
                            label="Ulica i numer lokalu"
                            name="address"
                            onChange={(e) => props.handleChange(e, 'checkout')}
                            value={props.checkout.form.address}
                            error={props.checkout.errors.address}
                            variant="shadow"
                            size="lg"
                            floating
                        />
                        <Input
                            label="Miejscowość"
                            name="city"
                            onChange={(e) => props.handleChange(e, 'checkout')}
                            value={props.checkout.form.city}
                            error={props.checkout.errors.city}
                            variant="shadow"
                            size="lg"
                            floating
                        />
                        <Input
                            label="Kod pocztowy"
                            name="postal"
                            onChange={(e) => props.handleChange(e, 'checkout')}
                            value={props.checkout.form.postal}
                            error={props.checkout.errors.postal}
                            variant="shadow"
                            size="lg"
                            floating
                        />
                        <Input
                            label="Imię"
                            name="first_name"
                            onChange={(e) => props.handleChange(e, 'checkout')}
                            value={props.checkout.form.first_name}
                            error={props.checkout.errors.first_name}
                            variant="shadow"
                            size="lg"
                            floating
                        />
                        <Input
                            label="Nazwisko"
                            name="last_name"
                            onChange={(e) => props.handleChange(e, 'checkout')}
                            value={props.checkout.form.last_name}
                            error={props.checkout.errors.last_name}
                            variant="shadow"
                            size="lg"
                            floating
                        />
                        <Input
                            label="Numer telefonu"
                            name="phone"
                            onChange={(e) => props.handleChange(e, 'checkout')}
                            value={props.checkout.form.phone}
                            error={props.checkout.errors.phone}
                            variant="shadow"
                            size="lg"
                            floating
                        />
                        <Input
                            label="Adres e-mail"
                            name="email"
                            onChange={(e) => props.handleChange(e, 'checkout')}
                            value={props.checkout.form.email}
                            error={props.checkout.errors.email}
                            variant="shadow"
                            size="lg"
                            floating
                        />
                        <Divider content="Wybierz metodę płatności"/>
                        <div className="d-flex">
                            <PaymentButton
                                text="Gotówka"
                                alt="Płatność gotówką"
                                onClick={() => props.paymentChange(1)}
                                active={props.checkout.form.payment_type === 1}
                            />
                            <PaymentButton
                                text="Przelew online"
                                alt="Przelewy 24"
                                onClick={() => props.paymentChange(2)}
                                active={props.checkout.form.payment_type === 2}
                            />
                        </div>
                        {props.checkout.errors.payment_type && (
                            <div className="invalid-feedback d-block">{props.checkout.errors.payment_type[0]}</div>
                        )}
                    </Col>
                    <Col xs={12} lg={5} xl={4}>
                        <Card className="checkout-card">
                            <header>
                                <h6>Podsumowanie</h6>
                            </header>
                            <main className="prices">
                                <div className="sum-and-ship">
                                    <div>Razem</div>
                                    <div>{props.basket.sum} zł</div>
                                    <div>Dostawa</div>
                                    <div>{props.shippingPrice} zł</div>
                                </div>
                                <div className="total-sum">
                                    <div>Razem</div>
                                    <div>{(parseFloat(props.basket.sum) + parseFloat(props.shippingPrice)).toFixed(2).replace('.', ',')} zł</div>
                                </div>
                            </main>
                            <Button type="submit">Zamawiam i płacę</Button>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </AnimationWrapper>
    );
};


export default Checkout;
