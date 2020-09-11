import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Input from '../Input/Input';
import './FormStrefa.scss';
const FormStrefa = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [Wpisz, setWpisz] = useState([]);
    const addNewWpisz = () => {
        const array = Wpisz;
        const newItem = {
            id: Wpisz.length,
            name: 'wpisz' + Wpisz.length,
        };
        array.push(newItem);
        setWpisz(array);
    };

    return (
        <>
            <Form
                initialValues={{ wpisz_one: '', wpisz_two: '', wpisz_three: '' }}
                onSubmit={values => {}}
                validate={values => {}}
                render={({ handleSubmit }) => (
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
                            <header>SIEDZIBA</header>
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
                                                label="Miejscowość"
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
                                                label="Kod pocztowy"
                                                floating
                                                name="siedziba_three"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />
                                </Col>
                            </Row>

                            <header>ADRES DZIALALNOSCI</header>
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
                                        name="wpisz_one"
                                        render={({ input, meta }) => (
                                            <>
                                                <header>RODZAJ ASORTYMENTU/USŁUGI</header>
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
                                        name="wpisz_two"
                                        render={({ input, meta }) => (
                                            <>
                                                <header>
                                                    RODZAJI WIELKOŚĆ ULGI WYRAZONA W %; ZŁ LUB FORMIE RABATÓW (NP,ILOŚĆ
                                                    DARMOWYCH WEJSC CZY USŁUG)
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
                                        name="wpisz_three"
                                        render={({ input, meta }) => (
                                            <>
                                                <header>UWAGI, NP, TERMIN OBOWIAZYWANIA ULGI, WYLACZENIA ITP</header>
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
                                        addNewWpisz();
                                        setIsOpen(!isOpen);
                                    }}
                                >
                                    <p className="plus_icon">+</p>
                                </button>
                            </Row>
                            <div className="newWpisz">
                                {Wpisz.map(ele => {
                                    return (
                                        <Row>
                                            <Col md={4} sm={12} className="col-padding align-self-end">
                                                <Field
                                                    name={`${ele.name}.1`}
                                                    render={({ input, meta }) => (
                                                        <>
                                                            <Input
                                                                variant="shadow"
                                                                size="lg"
                                                                label="Wpisz"
                                                                floating
                                                                name={`${ele.name}.1`}
                                                                className="wpisz"
                                                                {...input}
                                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            </Col>
                                            <Col md={4} sm={12} className="col-padding">
                                                <Field
                                                    name={`${ele.name}.2`}
                                                    render={({ input, meta }) => (
                                                        <>
                                                            <Input
                                                                variant="shadow"
                                                                size="lg"
                                                                label="Wpisz"
                                                                floating
                                                                name={`${ele.name}.2`}
                                                                className="wpisz"
                                                                {...input}
                                                                error={
                                                                    !!meta.error &&
                                                                    !!meta.touched && [meta.error] &&
                                                                    !!meta.data
                                                                }
                                                            />
                                                        </>
                                                    )}
                                                />
                                            </Col>
                                            <Col md={4} sm={12} className="col-padding align-self-end">
                                                <Field
                                                    name={`${ele.name}.3`}
                                                    className="wpisz"
                                                    render={({ input, meta }) => (
                                                        <>
                                                            <Input
                                                                variant="shadow"
                                                                size="lg"
                                                                label="Wpisz"
                                                                floating
                                                                name={`${ele.name}.3`}
                                                                {...input}
                                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            </Col>
                                        </Row>
                                    );
                                })}
                            </div>
                            <Field
                                name="adres"
                                render={({ input, meta }) => (
                                    <Row className="row-height">
                                        <Col className="col-padding">
                                            <Input
                                                variant="shadow"
                                                size="lg"
                                                label="Adres placówki/plaówek, w których będą realizowane ulgi, znizki, rabaty"
                                                floating
                                                name="adres"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        </Col>
                                    </Row>
                                )}
                            />
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
