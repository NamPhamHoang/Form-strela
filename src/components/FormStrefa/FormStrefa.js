import React, { useState, Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Input from '../Input/Input';
import './FormStrefa.scss';

const SInput = ({ type, name, label, onChange, value, error }) => (
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
const FormStrefa = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [state, setState] = useState({
        form: {
            nazwa: '',
            siedziba_one: '',
            siedziba_two: '',
            siedziba_three: '',
            address_one: '',
            address_two: '',
            address_three: '',
            regon: '',
            numer: '',
            email: '',
            wpisz_one: '',
            wpisz_two: '',
            wpisz_three: '',
            adres_pla: '',
        },
        errors: {}
    })
    const onHandleChange = (e) => {
        const { name, value } = e.target;
           
            setState(state => {
                const form = { ...state};
                form[name] = value;
                return form;
            });
    }
        return (
        <>
            <p className="title_desription">
                <strong>Wypelnij formularz zgloszeniowy</strong>
            </p>

            <Form className="form_strefa">
                <Row className="row-height">
                    <Col className="col-padding">
                        <SInput 
                            variant="shadow" 
                            size="lg" 
                            label="Nazwa firmy" 
                            floating
                            name = "nazwa"
                            onChange={onHandleChange}
                            value={state.nazwa}
                            error={state.errors.nazwa}
                        />
                    </Col>
                </Row>

                <header  style={{ marginTop: '5px'}} >SIEDZIBA</header>
                <Row className="collum-sm row-height">
                    <Col md={4} sm={12} className="col-padding">
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="Ulica i numer lokalu" 
                            floating
                            name = "siedziba_one"
                            onChange={onHandleChange}
                            value={state.siedziba_one}
                        />
                    </Col>
                    <Col md={4} sm={12} className="col-padding">
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="Miejscowość" 
                            floating
                            name = "siedziba_two"
                            onChange={onHandleChange}
                            value={state.siedziba_two}
                        />
                    </Col>
                    <Col md={4} sm={12} className="col-padding">
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="Kod pocztowy" 
                            floating
                            name = "siedziba_three"
                            onChange={onHandleChange}
                            value={state.siedziba_three}
                        />
                    </Col>
                </Row>
                <header  style={{ marginTop: '5px'}}>ADRES DZIALALNOSCI</header>
                <Row>
                    <Col md={4} sm={12} className="col-padding">
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="Ulica i numer lokalu" 
                            floating
                            name = "address_one"
                            onChange={onHandleChange}
                            value={state.address_one}
                        />
                    </Col>

                    <Col md={4} sm={12} className="col-padding">
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="Miejscowość" 
                            floating 
                            name = "address_two"
                            onChange={onHandleChange}
                            value={state.address_two}
                        />
                    </Col>
                    <Col md={4} sm={12} className="col-padding">
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="Kod pocztowy" 
                            floating
                            name = "address_three"
                            onChange={onHandleChange}
                            value={state.address_three}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={12} className="col-padding">
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="NIP" 
                            floating
                            name="nip"
                            onChange={onHandleChange}
                            value={state.nip}
                        />
                    </Col>

                    <Col md={6} sm={12} className="col-padding">
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="REGON" 
                            floating
                            name="regon"
                            onChange={onHandleChange}
                            value={state.regon}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={12} className="col-padding">
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="Numer telefonu" 
                            floating
                            name="numer"
                            onChange={onHandleChange}
                            value={state.numer}
                        />
                    </Col>

                    <Col md={6} sm={12} className="col-padding">
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="E-mail" 
                            floating
                            type="email"
                            name="email"
                            onChange={onHandleChange}
                            value={state.email}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={4} sm={12} className="col-padding align-self-end">
                        <header style={{ marginLeft: '3px'}}>RODZAJ ASORTYMENTU/USLUGI</header>
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="Wpisz" 
                            floating
                            name="wpisz_one"
                            onChange={onHandleChange}
                            value={state.wpisz_one}
                        />
                    </Col>
                    <Col md={4} sm={12} className="col-padding">
                        <header style={{ marginLeft: '3px' }}>
                            RODZAJI WIELKOSC ULGI WYRAZONA W %; ZL LUB FORMIE RABATOW (NP,ILOSC DARMOWYCH WEJSC CZY
                            USLUG)
                        </header>
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="Wpisz" 
                            floating
                            name="wpisz_two"
                            onChange={onHandleChange}
                            value={state.wpisz_two}
                        />
                    </Col>
                    <Col lg={4} md={3} sm={12} className="col-padding align-self-end">
                        <header style={{ marginLeft: '3px' }}>
                            UWAGI, NP, TERMIN OBOWIAZYWANIA ULGI, WYLACZENIA ITP
                        </header>
                        <Input 
                            variant="shadow" 
                            size="lg" 
                            label="Wpisz" 
                            floating
                            name="wpisz_three"
                            onChange={onHandleChange}
                            value={state.wpisz_three}
                        />
                    </Col>
                    <button
                        className="btn_add-circel align-self-end"
                        onClick={e => {
                            e.preventDefault();
                            setIsOpen(!isOpen);
                        }}
                    >
                        {/* 
                        <i class="far fa-plus"></i> */}
                    </button>
                </Row>
                <div>
                    {isOpen ? (
                        <Row>
                            <Col md={4} sm={12} className="col-padding">
                                <Input 
                                    variant="shadow" 
                                    size="lg" 
                                    label="Ulica i numer lokalu" 
                                    floating 
                                />
                            </Col>

                            <Col md={4} sm={12} className="col-padding">
                                <Input 
                                    variant="shadow" 
                                    size="lg" 
                                    label="Miejscowość" 
                                    floating 
                                />
                            </Col>
                            <Col md={4} sm={12} className="col-padding">
                                <Input 
                                    variant="shadow" 
                                    size="lg" 
                                    label="Kod pocztowy" 
                                    floating 
                                />
                            </Col>
                        </Row>
                    ) : (
                        ''
                    )}
                </div>
                <Row>
                    <Col className="col-padding height_custom ">
                        <Input
                            variant="shadow"
                            size="lg"
                            label="Adres placówki/placówek, w których będą realizowane ulgi, znizki, rabaty"
                            floating
                            name="adres_pla"
                            onChange={onHandleChange}
                            value={state.adres_pla}
                        />
                    </Col>
                </Row>
                <Button type="submit" className="btn-submit-form">
                    Wyślij formularz
                </Button>
            </Form>
        </>
    );
};

export default FormStrefa;
