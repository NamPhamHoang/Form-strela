import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { Field, Form } from 'react-final-form';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import ReactGA from 'react-ga';
import { PrimaryButton } from './Buttons/Button';
import Input from './Input/Input';
import { gate } from '../api';

const StyledWrapper = styled.div`
    position: fixed;
    right: 0;
    top: 250px;
    display: flex;
    transition: transform 0.3s ease-in-out;
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : 'calc(100% - 25px)')});
    @media screen and (max-width: 700px) {
        display: none;
    }
    z-index: 1000;
`;
const RotatedButton = styled(PrimaryButton)`
    transform: translateY(-100%) rotate(-90deg);
    transform-origin: right bottom;
    position: absolute;
    width: auto;
    left: -225px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    * {
        flex-shrink: 0;
    }
    span {
        transform: rotate(180deg);
    }
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    transform: rotate(90deg);
`;

const StyledForm = styled.form`
    position: relative;
    display: flex;
    background-color: ${({ theme: { lightergray } }) => lightergray};
    width: 300px;
    flex-direction: column;
    padding: 20px 20px 10px 50px;
    p {
        text-align: center;
    }
    border-bottom-left-radius: 20px;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
    margin: 0 auto;
`;

export const SuggestForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <StyledWrapper isOpen={isOpen}>
            <Form
                onSubmit={(values, form) => {
                    axios
                        .post(`${gate}/errors`, values)
                        .then(() => {
                            setTimeout(() => {
                                form.reset({
                                    email: null,
                                    content: null,
                                });
                                setIsOpen(false);
                                NotificationManager.success('Twoja wiadomość została wysłana');
                            }, 100);
                        })
                        .catch(() => {
                            NotificationManager.error('Wystąpił błąd. Spróbuj ponownie');
                        });
                }}
                initialValues={{
                    error: 'sugestia',
                }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Podaj adres e-mail';
                    }
                    if (!values.content) {
                        errors.content = 'Podaj treść';
                    }
                    return errors;
                }}
                render={({ handleSubmit }) => (
                    <StyledForm onSubmit={handleSubmit}>
                        <p>
                            Masz sugestie? Uwagi? Propozycje co do działania serwisu?
                            <br /> <strong>Napisz!</strong>
                        </p>

                        <Field
                            name="email"
                            type="email"
                            render={({ input, meta }) => (
                                <Input
                                    label="E-mail"
                                    error={!!meta.error && !!meta.touched && [meta.error]}
                                    variant="shadow"
                                    size="lg"
                                    floating
                                    {...input}
                                />
                            )}
                        />

                        <Field
                            name="content"
                            render={({ input, meta }) => (
                                <Input
                                    label="Treść"
                                    error={!!meta.error && !!meta.touched && [meta.error]}
                                    variant="shadow"
                                    size="lg"
                                    floating
                                    {...input}
                                    textarea
                                />
                            )}
                        />

                        <StyledPrimaryButton>Wyślij</StyledPrimaryButton>
                    </StyledForm>
                )}
            />
            <RotatedButton
                onClick={() => {
                    if (!isOpen) {
                        ReactGA.event({
                            category: 'Uzytkownik',
                            action: 'Otwarcie formularza Twoje sugestie',
                        });
                    }
                    setIsOpen(!isOpen);
                }}
            >
                <span>Twoje sugestie</span> <StyledFontAwesomeIcon icon={faComment} />
            </RotatedButton>
        </StyledWrapper>
    );
};
