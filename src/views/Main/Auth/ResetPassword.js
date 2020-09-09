import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { Field, Form } from 'react-final-form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { NotificationManager } from 'react-notifications';
import { Helmet } from 'react-helmet';
import Path from '../../../components/Path/Path';
import LayoutCard from '../../../components/Cards/LayoutCards/LayoutCard';
import BackgroundSquare from '../../../components/BackgroundSquare/BackgroundSquare';
import ButtonBack from '../../../components/Buttons/ButtonBack/ButtonBack';
import Input from '../../../components/Input/Input';
import { gate } from '../../../api';

const StyledP = styled.p`
    text-align: center;
`;

export const ResetPassword = () => {
    return (
        <>
            <Helmet>
                <title>Reset hasła - Oficjalny Portal Gminy Jarocin</title>
                <meta name="description" content="Reset hasła - zresetuj swoje hasło w serwisie jarocin.pl" />
            </Helmet>
            <Path
                items={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/reset-hasla', label: 'Reset hasła' },
                ]}
            />

            <LayoutCard className="login-and-register login">
                <BackgroundSquare />
                <BackgroundSquare variant="light-gray" />
                <ButtonBack />
                <Row className="row-eq-height">
                    <Col xs={12} lg={6} className="form">
                        <h2>Reset hasła!</h2>
                        <h5>Podaj swój adres email aby zresetować hasło.</h5>
                        <Form
                            onSubmit={values => {
                                axios
                                    .post(`${gate}/reset`, values)
                                    .then(() => {
                                        NotificationManager.success('Wysłano e-mail z linkiem. Sprawdź pocztę');
                                    })
                                    .catch(() => {
                                        NotificationManager.success('Błąd - popraw email i spróbuj ponownie');
                                    });
                            }}
                            render={({ handleSubmit, submitting }) => (
                                <form onSubmit={handleSubmit}>
                                    <Field
                                        name="email"
                                        type="email"
                                        render={({ input, meta }) => (
                                            <Input
                                                label="E-mail"
                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                                {...input}
                                                variant="shadow"
                                                size="lg"
                                                floating
                                            />
                                        )}
                                    />
                                    <Button disabled={submitting} type="submit">
                                        Zresetuj hasło
                                    </Button>
                                </form>
                            )}
                        />
                        <StyledP>Link do zresetowania hasła zostanie wysłany na podany adres e-mail</StyledP>
                    </Col>
                </Row>
            </LayoutCard>
        </>
    );
};
