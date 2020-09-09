import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Field, Form } from 'react-final-form';
import { Redirect } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import LayoutCard from '../Cards/LayoutCards/LayoutCard';
import Img400 from '../../img/404.png';
import Img500 from '../../img/500.png';
import { PrimaryButton } from '../Buttons/Button';
import Input from '../Input/Input';
import { gate } from '../../api';

const LInput = ({ type, name, label, onChange, value, error, textarea }) => (
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
        textarea={textarea}
    />
);

const StyledContentWrapper = styled.div`
    max-width: 100%;
    width: 700px;
    margin: 0 0 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const StyledWrapper = styled.div`
    display: flex;
`;
const StyledBlueBackground = styled.div`
    width: 600px;
    height: 600px;
    top: -180px;
    left: -280px;
    transform: rotate(70deg);
`;

const StyledLayoutCard = styled(LayoutCard)`
    position: relative;
    overflow: hidden;
`;

const StyledForm = styled.form`
    width: 320px;
`;

const StyledH3 = styled.h3`
    font-size: 4rem;
    font-weight: 100;
`;

const StyledP = styled.p`
    font-size: 1.8rem;
    margin: 25px auto;
    font-weight: 100;
    text-align: center;
`;

const DesktopWrapper = styled.div`
    display: none;
    @media screen and (min-width: 992px) {
        display: flex;
        align-items: center;
    }
`;

const Error = ({ code, content }) => {
    const [img, setImg] = useState(Img500);
    const [redirect, setRedirect] = useState(null);
    useEffect(() => {
        if (code === '404') {
            setImg(Img400);
        }
    }, [code]);
    return (
        <>
            {redirect && <Redirect to={redirect} push />}
            <StyledLayoutCard className="mt-5">
                <StyledWrapper>
                    <DesktopWrapper>
                        <img src={img} alt="" />
                        <StyledBlueBackground className="background-square background-square-primary " />
                    </DesktopWrapper>
                    <StyledContentWrapper>
                        <StyledH3>Błąd {code}</StyledH3>
                        <StyledP>{content}</StyledP>
                        <PrimaryButton to="/">Przejdź do strony głównej</PrimaryButton>
                        <StyledP>lub wypełnij formularz</StyledP>
                        <Form
                            onSubmit={values => {
                                axios
                                    .post(`${gate}/errors`, values)
                                    .then(() => {
                                        NotificationManager.success('Dziękujemy za opisanie błędu');
                                        setRedirect('/');
                                    })
                                    .catch(() => {
                                        NotificationManager.error('Wystąpił błąd. Spróbuj ponownie');
                                    });
                            }}
                            initialValues={{
                                error: code,
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.content) {
                                    errors.content = 'Wpisz treść';
                                }
                                return errors;
                            }}
                            render={({ handleSubmit }) => (
                                <StyledForm onSubmit={handleSubmit}>
                                    <Field
                                        name="phone"
                                        type="tel"
                                        render={({ input, meta }) => (
                                            <LInput
                                                label="Numer telefonu"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />
                                    <Field
                                        name="email"
                                        type="email"
                                        render={({ input, meta }) => (
                                            <LInput
                                                label="E-mail"
                                                {...input}
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />
                                    <Field
                                        name="content"
                                        type="textarea"
                                        render={({ input, meta }) => (
                                            <LInput
                                                label="Będziemy wdzięczni za pomoc i opisanie błędu*"
                                                {...input}
                                                textarea
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                            />
                                        )}
                                    />
                                    <small>* pole wymagane</small>
                                    <PrimaryButton type="submit" className="d-block mx-auto">
                                        Przejdź do strony głównej
                                    </PrimaryButton>
                                </StyledForm>
                            )}
                        />
                    </StyledContentWrapper>
                </StyledWrapper>
            </StyledLayoutCard>
        </>
    );
};

export default Error;
