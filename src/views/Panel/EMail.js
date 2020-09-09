import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Field, Form } from 'react-final-form';
import { useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import Input from '../../components/Input/Input';
import { PrimaryButton, RedButton } from '../../components/Buttons/Button';
import { gate } from '../../api';

const LInput = props => {
    return <Input {...props} variant="shadow" size="lg" floating />;
};

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
`;

const EmailEnd = styled.span`
    display: block;
    margin-bottom: 1rem;
    margin-left: 10px;
`;

const FieldWrapper = styled.div`
    display: flex;
    align-items: center;
    .form-group {
        min-width: 330px;
    }
`;

export const EMail = () => {
    const [loading, setLoading] = useState(true);
    const [redirect] = useState(null);
    const [hasEmail, setHasEmail] = useState(false);
    const token = useSelector(state => state.token);

    useEffect(() => {
        axios
            .put(
                `${gate}/webmail/check`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then(({ data: { hasAccount } }) => {
                setHasEmail(hasAccount);
                setLoading(false);
            });
    }, [token]);

    return (
        <PanelTemplate className="order-food-panel" redirect={redirect} loading={loading}>
            <SectionTitle>Poczta</SectionTitle>

            <Grid>
                {!hasEmail && (
                    <>
                        <Form
                            onSubmit={values => {
                                axios
                                    .post(
                                        `${gate}/webmail`,
                                        { ...values, name: values.email },
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        },
                                    )
                                    .then(() => {
                                        NotificationManager.success('Utworzono skrzynkę pocztową');
                                        setHasEmail(true);
                                    })
                                    .catch(e => {
                                        if (e.response) {
                                            NotificationManager.error(JSON.stringify(e.response.data.errors, '', 3));
                                        }
                                    });
                            }}
                            initialValues={{
                                allow: false,
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Wpisz email';
                                }
                                if (!values.password) {
                                    errors.password = 'Wpisz hasło';
                                }
                                if (!values.password_confirmation) {
                                    // eslint-disable-next-line camelcase
                                    errors.password_confirmation = 'Powtórz wpisane hasło';
                                }
                                if (
                                    values.password_confirmation &&
                                    values.password &&
                                    values.password !== values.password_confirmation
                                ) {
                                    errors.password = 'Wpisane hasła są różne';
                                }

                                return errors;
                            }}
                            render={({ handleSubmit, values, form }) => (
                                <form onSubmit={handleSubmit}>
                                    <Field
                                        name="email"
                                        render={({ input, meta }) => (
                                            <FieldWrapper>
                                                <LInput
                                                    label="Podaj adres jaki chciałbyś posiadać"
                                                    {...input}
                                                    onChange={e => {
                                                        input.onChange(e);
                                                        form.change('allow', false);
                                                    }}
                                                    error={!!meta.error && !!meta.touched && [meta.error]}
                                                />
                                                <EmailEnd>@poczta-jarocin.pl</EmailEnd>
                                            </FieldWrapper>
                                        )}
                                    />
                                    {!values.allow && (
                                        <PrimaryButton
                                            type="button"
                                            onClick={() => {
                                                axios
                                                    .get(`${gate}/webmail`, {
                                                        params: {
                                                            name: values.email,
                                                        },
                                                        headers: {
                                                            Authorization: `Bearer ${token}`,
                                                        },
                                                    })
                                                    .then(({ data }) => {
                                                        form.change('allow', data.allow);
                                                    })
                                                    .catch(e => {
                                                        if (e.response) {
                                                            NotificationManager.error(
                                                                'Przepraszamy, ale podany adres jest zajęty. Podaj inny i kliknij Sprawdź email',
                                                            );
                                                        }
                                                    });
                                            }}
                                        >
                                            Sprawdź email
                                        </PrimaryButton>
                                    )}
                                    {!!values.allow && (
                                        <>
                                            <div>
                                                <p>
                                                    Brawo, adres jest dostępny, jeśli chcesz założyć konto e-mail o
                                                    podanym adresie {values.email}@poczta-jarocin.pl podaj hasło poniżej
                                                    i kliknij Utwórz konto. Podane hasło będzie służyć do logowania w
                                                    przyszłości. Jeśli nie chcesz założyć konta, kliknij Anuluj
                                                </p>
                                            </div>
                                            <Field
                                                name="password"
                                                type="password"
                                                render={({ input, meta }) => (
                                                    <LInput
                                                        label="Hasło"
                                                        {...input}
                                                        error={!!meta.error && !!meta.touched && [meta.error]}
                                                    />
                                                )}
                                            />
                                            <Field
                                                name="password_confirmation"
                                                type="password"
                                                render={({ input, meta }) => (
                                                    <LInput
                                                        label="Powtórz hasło"
                                                        {...input}
                                                        error={!!meta.error && !!meta.touched && [meta.error]}
                                                    />
                                                )}
                                            />

                                            <PrimaryButton type="submit">Utwórz konto</PrimaryButton>
                                            <PrimaryButton
                                                type="button"
                                                onClick={() => {
                                                    form.reset({ allow: false });
                                                }}
                                                className="ml-1"
                                            >
                                                Anuluj
                                            </PrimaryButton>
                                        </>
                                    )}
                                </form>
                            )}
                        />
                    </>
                )}

                {!!hasEmail && (
                    <div>
                        <p>KONFIGURACJA POCZTY</p>
                        <p>login: twój adres email</p>
                        <p>Serwer poczty przychodzącej (POP3, port 110): pop3.poczta-jarocin.pl</p>
                        <p>Serwer poczty wychodzącej (SMTP, port 587): smtp.poczta-jarocin.pl</p>
                        <p>Serwer usługi IMAP (port 143): imap.poczta-jarocin.pl</p>
                        <p>Serwer poczty przychodzącej z obsługą SSL (POP3, port 995): poczta67946.tld.pl</p>
                        <p>Serwer poczty wychodzącej z obsługą SSL (SMTP, port 465): poczta67946.tld.pl</p>
                        <p>Serwer usługi IMAP z obsługą SSL (port 993): poczta67946.tld.pl</p>
                        <PrimaryButton href="http://poczta.poczta-jarocin.pl/" target="_blank" className="mb-3">
                            Zaloguj się
                        </PrimaryButton>
                        <Form
                            onSubmit={values => {
                                console.log(values);
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.password) {
                                    errors.password = 'Wpisz hasło';
                                }
                                if (!values.password_confirmation) {
                                    // eslint-disable-next-line camelcase
                                    errors.password_confirmation = 'Powtórz wpisane hasło';
                                }
                                if (
                                    values.password_confirmation &&
                                    values.password &&
                                    values.password !== values.password_confirmation
                                ) {
                                    errors.password = 'Wpisane hasła są różne';
                                }

                                return errors;
                            }}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <Field
                                        name="password"
                                        type="password"
                                        render={({ input, meta }) => (
                                            <LInput
                                                label="Hasło"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />
                                    <Field
                                        name="password_confirmation"
                                        type="password"
                                        render={({ input, meta }) => (
                                            <LInput
                                                label="Powtórz hasło"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />

                                    <PrimaryButton type="submit">Zmień hasło</PrimaryButton>
                                </form>
                            )}
                        />

                        <RedButton className="mt-3" type="button">
                            Usuń konto
                        </RedButton>
                    </div>
                )}
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dicta dolore eos excepturi ipsam
                    laboriosam laudantium non provident quas quia quod recusandae similique, sit. Consectetur fuga id
                    iure nulla odio. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam asperiores,
                    at commodi debitis dignissimos doloremque est eum eveniet, excepturi harum inventore magni maxime
                    molestiae odio omnis quia ullam voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Commodi cupiditate dicta rerum? Aliquid, consequatur cupiditate enim esse excepturi illum,
                    impedit in itaque praesentium rem, repellat saepe sed sit suscipit totam.
                </div>
            </Grid>
        </PanelTemplate>
    );
};
