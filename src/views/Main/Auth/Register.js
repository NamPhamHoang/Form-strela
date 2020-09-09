import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-light-svg-icons/faUser';
import { faBuilding } from '@fortawesome/pro-light-svg-icons';
import { Field, Form } from 'react-final-form';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import Input from '../../../components/Input/Input';
import LayoutCard from '../../../components/Cards/LayoutCards/LayoutCard';
import Path from '../../../components/Path/Path';
import ButtonBack from '../../../components/Buttons/ButtonBack/ButtonBack';
import BackgroundSquare from '../../../components/BackgroundSquare/BackgroundSquare';
import { API_AUTH_REGISTER } from '../../../api';
import { isEmail } from '../../../helpers';
import { Modal } from '../../../components/Modals/Modal';

const ShowButton = styled.button`
    border: none;
    background-color: transparent;
    display: inline;
    color: ${({ theme: { blue } }) => blue};
`;

const ButtonsWrapper = styled.div`
    @media screen and (min-width: 1000px) {
        display: flex;
        button {
            margin: 1.5rem 15px 0 !important;
        }
    }
`;

const LCheck = ({ name, label, content, ...props }) => {
    let parsedLabel;
    const [toggled, setToggled] = useState(false);
    if (content) {
        parsedLabel = (
            <>
                {label}
                {!toggled && (
                    <button
                        type="button"
                        onClick={e => {
                            e.preventDefault();
                            setToggled(true);
                        }}
                        className="btn btn-link btn-sm p-0 m-0"
                    >
                        &nbsp;...rozwiń
                    </button>
                )}
                <span className={toggled ? '' : 'd-none'}>&nbsp;{content}</span>
                {toggled && (
                    <button
                        type="button"
                        onClick={e => {
                            e.preventDefault();
                            setToggled(false);
                        }}
                        className="btn btn-link btn-sm p-0 m-0"
                    >
                        &nbsp;...zwiń
                    </button>
                )}
            </>
        );
    } else {
        parsedLabel = label;
    }

    return <FormCheck custom type="checkbox" name={name} id={name} label={parsedLabel} {...props} />;
};

const Register = () => {
    const [redirect, setRedirect] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkBoxes] = useState([
        {
            name: 'regulation',
            label: (
                <>
                    *Oświadczam, że znam i akceptuję postanowienia{' '}
                    <Link to="/regulamin" target="_blank">
                        Regulaminu Platformy
                    </Link>
                    .
                </>
            ),
            required: true,
        },
        {
            name: 'rodo',
            label: (
                <>
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celach marketingowych i otrzymywanie
                    informacji handlowych od administratora
                </>
            ),
            content: (
                <>
                    platformy tj. Jarocińskiej Agencji Rozwoju Spółka z o.o. z wykorzystaniem telekomunikacyjnych
                    urządzeń końcowych (m.in. telefon) oraz środków komunikacji elektronicznej (m.in. SMS, e-mail).
                </>
            ),
        },
        {
            name: 'rodo-b2b',
            label:
                'Wyrażam zgodę na przetwarzanie moich danych osobowych w celach marketingowych i otrzymywanie informacji handlowych od podmiotów',
            content:
                'współpracujących z Jarocińską Agencją Rozwoju Spółka z o.o. z wykorzystaniem telekomunikacyjnych urządzeń końcowych (m.in. telefon) oraz środków komunikacji elektronicznej (m.in. SMS, e-mail).',
        },
    ]);
    return (
        <>
            {redirect && <Redirect to={redirect} />}
            <Helmet>
                <title>Rejestracja - Oficjalny Portal Gminy Jarocin</title>
                <meta
                    name="description"
                    content="Zarejestruj się w serwisie Jarocin.pl i korzystaj z wszystkich modułów!"
                />
            </Helmet>
            <Path
                items={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/rejestracja', label: 'Rejestracja' },
                ]}
            />
            <LayoutCard className="login-and-register register">
                <BackgroundSquare />
                <BackgroundSquare variant="light-gray" />
                <ButtonBack />
                <Row>
                    <Col className="form">
                        <h2>Witaj!</h2>
                        <h5>Zarejestruj się w portalu i zyskaj dostęp do wszystkich funkcjonalności!</h5>
                        <Form
                            initialValues={{ role_id: 1 }}
                            onSubmit={values => {
                                axios
                                    .post(API_AUTH_REGISTER, values)
                                    .then(() => {
                                        NotificationManager.success(
                                            'Pomyślnie zarejestrowano. Aktywuj swoje konto linkiem wysłanym na podany adres e-mail.',
                                        );
                                        setRedirect('/logowanie');
                                    })
                                    .catch(({ response: { status } }) => {
                                        if (status === 422) {
                                            NotificationManager.error(
                                                'E-mail jest już używany - zmień go i spróbuj ponownie',
                                            );
                                        } else {
                                            NotificationManager.error('Błąd - spróbuj ponownie');
                                        }
                                    });
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Wpisz adres email';
                                } else if (!isEmail(values.email)) {
                                    errors.email = 'Wpisz poprawny adres email';
                                } /* else if (submitErrors.email) {
                                    [errors.email] = submitErrors.email;
                                } */

                                if (!values.password) {
                                    errors.password = 'Wpisz hasło';
                                } else if (values.password.leading < 8) {
                                    errors.password = 'Minimalna długość hasła to 8 znaków';
                                }

                                if (!values.password_confirmation) {
                                    // eslint-disable-next-line camelcase
                                    errors.password_confirmation = 'Powtórz hasło';
                                }

                                if (
                                    values.password &&
                                    values.password_confirmation &&
                                    values.password !== values.password_confirmation
                                ) {
                                    errors.password = 'Wpisane hasła są różne';
                                }

                                if (!values.regulation) {
                                    errors.regulation = 'Wymagane';
                                }
                                return errors;
                            }}
                            render={({ handleSubmit, values, form }) => (
                                <form onSubmit={handleSubmit}>
                                    <ButtonsWrapper>
                                        <Button
                                            variant={values.role_id === 1 ? 'primary' : 'gray'}
                                            onClick={() => {
                                                form.change('role_id', 1);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faUser} /> Rejestracja mieszkańca
                                        </Button>

                                        <Button
                                            variant={values.role_id === 2 ? 'primary' : 'gray'}
                                            onClick={() => {
                                                form.change('role_id', 2);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faBuilding} /> Rejestracja firmy
                                        </Button>
                                    </ButtonsWrapper>
                                    <Field
                                        name="email"
                                        type="email"
                                        render={({ input, meta }) => (
                                            <Input
                                                label="E-mail"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                                variant="shadow"
                                                size="lg"
                                                floating
                                            />
                                        )}
                                    />
                                    <Field
                                        name="password"
                                        type="password"
                                        render={({ input, meta }) => (
                                            <Input
                                                label="Hasło"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                                variant="shadow"
                                                size="lg"
                                                floating
                                            />
                                        )}
                                    />
                                    <Field
                                        name="password_confirmation"
                                        type="password"
                                        render={({ input, meta }) => (
                                            <Input
                                                label="Powtórz hasło"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                                variant="shadow"
                                                size="lg"
                                                floating
                                            />
                                        )}
                                    />

                                    {checkBoxes.map(({ name, label, content }) => (
                                        <Field
                                            name={name}
                                            type="checkbox"
                                            render={({ input, meta }) => (
                                                <>
                                                    <LCheck
                                                        key={`confirm-${label}`}
                                                        label={label}
                                                        content={content}
                                                        {...input}
                                                        isInvalid={!!meta.error && !!meta.touched}
                                                    />
                                                </>
                                            )}
                                        />
                                    ))}

                                    <div className="floating-label floating-label-lg form-group">
                                        Informacje o przetwarzaniu danych osobowych
                                        <ShowButton
                                            type="button"
                                            onClick={() => {
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            ...pokaż
                                        </ShowButton>
                                    </div>

                                    {/* <div className="floating-label floating-label-lg form-group">
                                        Polityka Cookies <Link to='/polityka-cookies' target="_blank">pokaż</Link>
                                    </div> */}

                                    <Button type="submit">Załóż konto</Button>
                                </form>
                            )}
                        />

                        <Link to="/logowanie" className="change-link">
                            Rejestrowałeś się już w portalu?
                            <br className="d-md-none" /> <strong>Zaloguj się!</strong>
                        </Link>
                    </Col>
                </Row>
            </LayoutCard>

            <Modal
                opened={isModalOpen}
                closeModal={() => {
                    setIsModalOpen(false);
                }}
            >
                <h4>Informacje o przetwarzaniu danych osobowych:</h4>
                <h5>Administrator danych. </h5>
                <p>
                    Administratorem danych osobowych Jarocińska Agencja Rozwoju sp. z o.o. ul. T. Kościuszki 15B, 63-200
                    Jarocin,<a href="mailto:jar@jarjarocin.pl">jar@jarjarocin.pl</a>, tel:
                    <a href="tel:627400295">62-740-02-95</a> nazywanym dalej JAR.
                </p>
                <h5>Inspektor ochrony danych</h5>
                <p>
                    JAR sp. z o.o. wyznaczył inspektora ochrony danych, z którym można się skontaktować pod e‑mail:{' '}
                    <a href="mailto:iodo@jarjarocin.pl">iodo@jarjarocin.pl</a>
                </p>
                <h5>Cele i podstawy przetwarzania</h5>
                <p>
                    Będziemy przetwarzać Państwa dane osobowe w celu realizacji umowy polegającej ma udostępnianiu usług
                    elektronicznych na platformie{' '}
                    <Link to="/" target="_blank">
                        jarocin.pl
                    </Link>{' '}
                    zgodnie z art. 6 ust. 1 lit. b rodo.
                </p>
                <h5>Odbiorcy danych osobowych</h5>
                <p>
                    Państwa dane osobowe będą przekazywane, innemu Użytkownikowi platformy jedynie w celu wykonania
                    umowy zawartej na Platformie oraz podmiotom, które wspomagają JAR w obsłudze platformy i którym JAR
                    powierzy przetwarzanie danych osobowych na podstawie umowy powierzenia przetwarzania.
                </p>
                <h5>Okres przechowywania danych</h5>
                <p>
                    Dane osobowe przez okres obowiązania umowy (funkcjonowania Konta na platformie) oraz po jego
                    usunięciu w czasie niezbędnym do ustalenia, dochodzenia i egzekucji roszczeń, a także rozpatrywania
                    skarg i wniosków Użytkowników wynikających z zawartych umów, w celu ochrony prawnie uzasadnionego
                    interesu JAR lub Użytkowników, zgodnie z art. 6 ust. 1 pkt f) RODO.
                </p>
                <h5>Prawa osób, których dane dotyczą </h5>
                <p>Zgodnie z RODOprzysługuje Państwu:</p>
                <ol>
                    <li>prawo dostępu do swoich danych oraz otrzymania ich kopii;</li>
                    <li>prawo do sprostowania (poprawiania) swoich danych;</li>
                    <li>prawo do żądania usunięcia danych osobowych;</li>
                    <li>prawo do żądania ograniczenia lub wniesienia sprzeciwu wobec przetwarzania danych;</li>
                    <li>prawo do wniesienia skargi do Prezesa UODO;</li>
                </ol>
                <h5>Informacja o wymogu podania danych.</h5>
                <p>Podanie danych osobowych jest dobrowolne jednak niezbędne do korzystani z usług platformy.</p>
                <h5>Profilowanie</h5>
                <p>
                    JAR stosuje wobec profilowanie w rozumieniu art. 4 pkt 4) RODO w celu prezentacji wybranych ofert
                    dopasowanych do poszczególnych Użytkowników. Dane osobowe mogą być również analizowane automatycznie
                    w celu optymalizacji świadczenia usług. Użytkownik ma prawo wnieść w dowolnym momencie, bezpłatnie
                    sprzeciw wobec takiego przetwarzania. Szczegółowe informacje dotyczące przetwarzania danych
                    osobowych oraz zasad prywatności dostępne są w wskazanym wyżej regulaminie.
                </p>
            </Modal>
        </>
    );
};
export default Register;
