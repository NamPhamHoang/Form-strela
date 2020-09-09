import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank } from '@fortawesome/pro-solid-svg-icons';
import { getPrice } from '../../../helpers';
import { CheckBox } from '../../../components/Form/CheckBox';
import { PrimaryButton } from '../../../components/Buttons/Button';
import { FontAwesomeIconSpinner, Step, Steps } from '../../../components/StepsComponent';
import { FETCH_ERROR, LOGIN, newLogInAction } from '../../../actions';
import Input from '../../../components/Input/Input';

const LInput = ({ type, name, label, onChange, value, error }) => (
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

const StyledCheckBoxWrapper = styled.div`
    grid-column: 1;
    grid-row: 4/6;
`;

const StyledForm = styled.form`
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-rows: 50px auto;
    grid-gap: 30px;
`;
const StyledFormHeading = styled.p`
    grid-column: 1;
    grid-row: 1;
    color: #ffffff;
    background-color: ${({ theme: { blue } }) => blue};
    padding: 10px 15px;
    border-radius: 10px;
    font-size: 1.4rem;
    margin: 0 0 auto;
`;

const StyledFormPaymentTypes = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
    grid-column: 1;
    grid-row: 2/4;
`;
const StyledFormPaymentType = styled.label`
    line-height: 1;
    border: 1px solid ${({ theme: { blue } }) => blue};
    border-radius: 10px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: ${({ theme: { blue }, active }) => (active ? blue : '#ffffff')};
    text-align: center;
    color: ${({ active }) => (active ? '#ffffff' : '#000000')};
    & > input {
        display: none;
    }
`;

const StyledRightPanel = styled.div`
    ${({ theme: { shadow } }) => shadow};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    grid-column: 2;
    grid-row: 1/5;
    padding: 10px 10px 50px;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
    transform: translateY(calc(50% + 50px));
`;

const StyledLine = styled.div`
    height: 1px;
    background-color: #000000;
    width: 100%;
`;

const StyledPrice = styled.span`
    color: ${({ theme: { blue } }) => blue};
    font-size: 1.6rem;
    margin: 20px auto;
`;

const StyledHeading = styled.h4`
    margin: 10px auto;
`;

const StyledFontAwesomeIconPiggyBank = styled(FontAwesomeIcon)`
    color: ${({ theme: { blue }, active }) => (active ? '#FFFFFF' : blue)};
    font-size: 35px;
`;

const StyledPanel = styled.div`
    ${({ theme: { shadow } }) => shadow};
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
`;

const StyledWrapper = styled.div`
    display: grid;
    margin: 0 auto;
    width: auto;
    grid-template-columns: repeat(2, 400px);
    grid-gap: 30px;
    padding: 20px 0 0;
`;

const StyledFormLogin = styled.form`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
`;

export const TicketCheckOut = ({ initialValues, onSubmit, price, piggyBank, inputs }) => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const [step, setStep] = useState(1);
    const [unLoggedData, setUnLoggedData] = useState({});

    useEffect(() => {
        if (token || unLoggedData.email) {
            setStep(2);
        }
    }, [token, unLoggedData]);

    return (
        <Steps currentStep={step}>
            <Step>
                <StyledWrapper>
                    <StyledPanel>
                        <Form
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Email jest wymagany';
                                }
                                if (!values.password) {
                                    errors.password = 'Hasło jest wymagana';
                                }
                                return errors;
                            }}
                            onSubmit={async values => {
                                try {
                                    await sleep(100);
                                    const response = await newLogInAction(values);
                                    const {
                                        access_token: newToken,
                                        hasChangedData,
                                        role,
                                        isUserCityMember,
                                        expires_in: expiresIn,
                                    } = response;
                                    dispatch({
                                        type: LOGIN,
                                        payload: {
                                            hasChangedData,
                                            role,
                                            token: newToken,
                                            isUserCityMember,
                                            expiresIn,
                                        },
                                    });
                                } catch (e) {
                                    dispatch({
                                        type: FETCH_ERROR,
                                        payload: 'Niepoprawny email lub hasło',
                                    });
                                }
                            }}
                            render={({ handleSubmit }) => (
                                <StyledFormLogin onSubmit={handleSubmit}>
                                    <h4>Zaloguj się</h4>
                                    <Field
                                        name="email"
                                        type="email"
                                        render={({ input }) => <LInput label="E-mail" {...input} />}
                                    />
                                    <Field
                                        name="password"
                                        type="password"
                                        render={({ input }) => <LInput label="Hasło" {...input} />}
                                    />
                                    <Link to="/">Nie pamiętam hasła</Link>
                                    <PrimaryButton size="s" type="submit">
                                        Zaloguj się
                                    </PrimaryButton>
                                </StyledFormLogin>
                            )}
                        />
                    </StyledPanel>
                    <StyledPanel>
                        <Form
                            onSubmit={async values => {
                                await sleep(100);
                                setUnLoggedData(values);
                            }}
                            render={({ handleSubmit }) => (
                                <StyledFormLogin onSubmit={handleSubmit}>
                                    <h4>Kup jako gość</h4>
                                    {inputs.map(item => (
                                        <Field
                                            name={item.name}
                                            type={item.type}
                                            render={({ input }) => (
                                                <LInput label={item.label} {...input} required="required" />
                                            )}
                                        />
                                    ))}
                                    <PrimaryButton size="s" type="submit">
                                        Przejdź do realizacji zamówienia
                                    </PrimaryButton>
                                </StyledFormLogin>
                            )}
                        />
                    </StyledPanel>
                </StyledWrapper>
            </Step>
            <Step>
                <Form
                    onSubmit={onSubmit}
                    initialValues={{ ...initialValues, ...unLoggedData }}
                    render={({ values, submitting, handleSubmit }) => (
                        <StyledForm onSubmit={handleSubmit}>
                            <StyledFormHeading>Wybierz metodę płatności</StyledFormHeading>

                            <StyledFormPaymentTypes>
                                <StyledFormPaymentType active={values.paymentMethod === '1'}>
                                    <Field name="paymentMethod" id="accept" component="input" type="radio" value="1" />
                                    PRZELEWY24
                                </StyledFormPaymentType>
                                {piggyBank && (
                                    <StyledFormPaymentType active={values.paymentMethod === '2'}>
                                        <Field
                                            name="paymentMethod"
                                            id="accept"
                                            component="input"
                                            type="radio"
                                            value="2"
                                        />
                                        <StyledFontAwesomeIconPiggyBank
                                            active={values.paymentMethod === '2'}
                                            icon={faPiggyBank}
                                        />
                                        Wirtualna skarbonka
                                    </StyledFormPaymentType>
                                )}
                            </StyledFormPaymentTypes>

                            <StyledRightPanel>
                                <StyledHeading>Podsumowanie</StyledHeading>
                                <StyledLine />

                                <StyledPrice>Razem: {getPrice(price)}</StyledPrice>

                                <StyledLine />

                                <StyledPrimaryButton
                                    disabled={!(!!values.accept && !!values.paymentMethod) || submitting}
                                >
                                    {submitting && <FontAwesomeIconSpinner icon={faSpinnerThird} />}
                                    {submitting || 'Zamawiam i płacę'}
                                </StyledPrimaryButton>
                            </StyledRightPanel>

                            <StyledCheckBoxWrapper>
                                <Field
                                    name="accept"
                                    id="accept"
                                    type="checkbox"
                                    render={({ input }) => (
                                        <CheckBox {...input}>
                                            Akceptuje{' '}
                                            <Link to="/regulamin" target="_blank">
                                                regulamin
                                            </Link>{' '}
                                            serwisu Jarocin.pl
                                        </CheckBox>
                                    )}
                                />
                            </StyledCheckBoxWrapper>
                        </StyledForm>
                    )}
                />
            </Step>
        </Steps>
    );
};

TicketCheckOut.defaultProps = {
    piggyBank: false,
    price: 0,
};
