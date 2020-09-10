import React, { useState, Component } from 'react';
import { Field, Form } from 'react-final-form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Input from '../Input/Input';
import './FormStrefa.scss';
import { isEmail } from '../../helpers';
const FormStrefa = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const form = [
    //         nazwa,
    //         siedziba_one,
    //         siedziba_two,
    //         siedziba_three,
    //         address_one,
    //         address_two,
    //         address_three,
    //         regon,
    //         number,
    //         email,
    //         wpisz_one,
    //         wpisz_two,
    //         wpisz_three,
    //         adres_pla,
    // ],
    return (
        <>
            <Form
                initialValues={{ role_id: 1 }}
                onSubmit={values => {}}
                validate={values => {
                    const errors = {};
                    
                    return errors;
                }}
                render={({ handleSubmit, values, form }) => (
                    <>
                        <p className="title_desription">
                            <strong>Wypelnij formularz zgloszeniowy</strong>
                        </p>

                        <form className="form_strefa" onSubmit={handleSubmit}>
                            <Field
                                name="nazwa"
                                render={({ input, meta }) => (
                                    <Row className="row-height">
                                        <Col className="col-padding">
                                            <Input
                                                variant="shadow"
                                                size="lg"
                                                label="Nazwa firmy"
                                                floating
                                                name="nazwa"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        </Col>
                                    </Row>
                                )}
                            />
                            <header style={{ marginTop: '5px' }}>SIEDZIBA</header>
                            <Row className="collum-sm row-height">
                                <Col md={4} sm={12} className="col-padding">
                                    <Field
                                        name="siedziba"
                                        render={({ input, meta }) => (
                                            <>
                                                <Input
                                                    variant="shadow"
                                                    size="lg"
                                                    label="Ulica i numer lokalu"
                                                    floating
                                                    name="siedziba_one"
                                                    {...input}
                                                    error={!!meta.error && !!meta.touched && [meta.error]}
                                                />
                                            </>
                                        )}
                                    />
                                </Col>
                                <Col md={4} sm={12} className="col-padding">
                                    <Field
                                        name="siedziba_two"
                                        render={({ input, meta }) => (
                                            <Input
                                                variant="shadow"
                                                size="lg"
                                                label="Ulica i numer lokalu"
                                                floating
                                                name="siedziba_two"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />
                                </Col>
                                <Col md={4} sm={12} className="col-padding">
                                    <Field
                                        name="siedziba_three"
                                        render={({ input, meta }) => (
                                            <Input
                                                variant="shadow"
                                                size="lg"
                                                label="Ulica i numer lokalu"
                                                floating
                                                name="siedziba_three"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />
                                </Col>
                            </Row>

                            <header style={{ marginTop: '5px' }}>ADRES DZIALALNOSCI</header>
                            <Row>
                                <Col md={4} sm={12} className="col-padding">
                                    <Field
                                        name="address_one"
                                        render={({ input, meta }) => (
                                            <>
                                                <Input
                                                    variant="shadow"
                                                    size="lg"
                                                    label="Ulica i numer lokalu"
                                                    floating
                                                    name="address_one"
                                                    {...input}
                                                    error={!!meta.error && !!meta.touched && [meta.error]}
                                                />
                                            </>
                                        )}
                                    />
                                </Col>
                                <Col md={4} sm={12} className="col-padding">
                                    <Field
                                        name="address_two"
                                        render={({ input, meta }) => (
                                            <Input
                                                variant="shadow"
                                                size="lg"
                                                label="Miejscowość"
                                                floating
                                                name="address_two"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />
                                </Col>
                                <Col md={4} sm={12} className="col-padding">
                                    <Field
                                        name="address_three"
                                        render={({ input, meta }) => (
                                            <Input
                                                variant="shadow"
                                                size="lg"
                                                label="Kod pocztowy"
                                                floating
                                                name="address_three"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6} sm={12} className="col-padding">
                                    <Field
                                        name="nip"
                                        render={({ input, meta }) => (
                                            <>
                                                <Input
                                                    variant="shadow"
                                                    size="lg"
                                                    label="NIP"
                                                    floating
                                                    name="nip"
                                                    {...input}
                                                    error={!!meta.error && !!meta.touched && [meta.error]}
                                                />
                                            </>
                                        )}
                                    />
                                </Col>
                                <Col md={6} sm={12} className="col-padding">
                                    <Field
                                        name="regon"
                                        render={({ input, meta }) => (
                                            <Input
                                                variant="shadow"
                                                size="lg"
                                                label="REGON"
                                                floating
                                                name="regon"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />
                                </Col>
                                <Col md={6} sm={12} className="col-padding">
                                    <Field
                                        name="numer"
                                        render={({ input, meta }) => (
                                            <Input
                                                variant="shadow"
                                                size="lg"
                                                label="Numer telefonu"
                                                floating
                                                name="numer"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />
                                </Col>
                                <Col md={6} sm={12} className="col-padding">
                                    <Field
                                        name="email"
                                        render={({ input, meta }) => (
                                            <Input
                                                variant="shadow"
                                                size="lg"
                                                label="E-mail"
                                                floating
                                                type="email"
                                                name="email"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col md={4} sm={12} className="col-padding align-self-end">
                                    <Field
                                        name="address_one"
                                        render={({ input, meta }) => (
                                            <>
                                                <header style={{ marginLeft: '3px' }}>RODZAJ ASORTYMENTU/USLUGI</header>
                                                <Input
                                                    variant="shadow"
                                                    size="lg"
                                                    label="Wpisz"
                                                    floating
                                                    name="wpisz_one"
                                                    {...input}
                                                    error={!!meta.error && !!meta.touched && [meta.error]}
                                                />
                                            </>
                                        )}
                                    />
                                </Col>
                                <Col md={4} sm={12} className="col-padding">
                                    <Field
                                        name="address_two"
                                        render={({ input, meta }) => (
                                            <>
                                                <header style={{ marginLeft: '3px' }}>
                                                    RODZAJI WIELKOSC ULGI WYRAZONA W %; ZL LUB FORMIE RABATOW (NP,ILOSC
                                                    DARMOWYCH WEJSC CZY USLUG)
                                                </header>
                                                <Input
                                                    variant="shadow"
                                                    size="lg"
                                                    label="Wpisz"
                                                    floating
                                                    name="wpisz_two"
                                                    {...input}
                                                    error={!!meta.error && !!meta.touched && [meta.error]}
                                                />
                                            </>
                                        )}
                                    />
                                </Col>
                                <Col md={4} sm={12} className="col-padding align-self-end">
                                    <Field
                                        name="address_three"
                                        render={({ input, meta }) => (
                                            <>
                                                <header style={{ marginLeft: '3px' }}>
                                                    UWAGI, NP, TERMIN OBOWIAZYWANIA ULGI, WYLACZENIA ITP
                                                </header>
                                                <Input
                                                    variant="shadow"
                                                    size="lg"
                                                    label="Wpisz"
                                                    floating
                                                    name="wpisz_three"
                                                    {...input}
                                                    error={!!meta.error && !!meta.touched && [meta.error]}
                                                />
                                            </>
                                        )}
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
                                                <Input variant="shadow" size="lg" label="Miejscowość" floating />
                                            </Col>
                                            <Col md={4} sm={12} className="col-padding">
                                                <Input variant="shadow" size="lg" label="Kod pocztowy" floating />
                                            </Col>
                                        </Row>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            <Button type="submit" className="btn-submit-form">
                                Wyślij formularz
                            </Button>
                        </form>
                    </>
                )}
            />
        </>
    );
};

export default FormStrefa;
