import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Input from '../Input/Input';
import "./FormStrefa.scss"
const FormStrefa = () => {
    return (
        <>
            <p>
                <strong>Wypelnij formularz zgloszeniowy</strong>
            </p>

            <Form className="form_strefa">
                <Input label="Nazwa firmy" floating />
                <header>SIEDZIBA</header>
                <Row>
                    <Col>
                        <Input label="Ulica i numer lokalu" floating />
                    </Col>

                    <Col>
                        <Input label="Miejscowość" floating />
                    </Col>
                    <Col>
                        <Input label="Kod pocztowy" floating />
                    </Col>
                </Row>
                <header>ADRES DZIALALNOSCI</header>
                <Row>
                    <Col>
                        <Input label="Ulica i numer lokalu" floating />
                    </Col>

                    <Col>
                        <Input label="Miejscowość" floating />
                    </Col>
                    <Col>
                        <Input label="Kod pocztowy" floating />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input label="NIP" floating />
                    </Col>

                    <Col>
                        <Input label="REGON" floating />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input label="Numer telefonu" floating />
                    </Col>

                    <Col>
                        <Input label="E-mail" floating />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <header>RODZAJ ASORTYMENTU/USLUGI</header>
                        <Input label="Wpisz" floating />
                    </Col>
                    <Col>
                        <header>
                            RODZAJI WIELKOSC ULGI WYRAZONA W %; ZL LUB FORMIE RABATOW 
                            (NP,ILOSC DARMOWYCH WEJSC CZY USLUG)
                        </header>
                        <Input label="Wpisz" floating />
                    </Col>
                    <Col>
                        <header>UWAGI, NP, TERMIN OBOWIAZYWANIA ULGI, WYLACZENIA ITP</header>
                        <Input label="Wpisz" floating />
                    </Col>
                </Row>

                <Input label="Adres placówki/placówek, w których będą realizowane ulgi, znizki, rabaty" floating />
            </Form>
        </>
    );
};

export default FormStrefa;
