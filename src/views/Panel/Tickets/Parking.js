import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { faCar, faPiggyBank } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';

import { Field, Form } from 'react-final-form';
import PanelTemplate from '../../../templates/PanelTemplate';
import SectionTitle from '../../../components/Titles/SectionTitle/SectionTitle';
import { Select } from '../../../components/Form/Select';
import { getPrice } from '../../../helpers';
import {
    API_GET_PARKING_TICKETS,
    API_PARKING_PIGGY_BANK_BALANCE,
    API_PARKING_REFUND_TICKET,
    API_VEHICLES,
} from '../../../api';
import { PrimaryButton } from '../../../components/Buttons/Button';
import Input from '../../../components/Input/Input';
import { FontAwesomeIconSpinner } from '../../../components/StepsComponent';

const LInput = ({ ...props }) => <Input {...props} size="lg" floating />;

const Tr = styled.div`
    grid-template-columns: repeat(8, 1fr);
    & > div {
        margin: auto 0;
    }
`;

const StyledWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & > div {
        display: flex;
        align-items: center;
        & > span {
            margin: 0 20px;
            cursor: pointer;
            color: ${({ theme: { blue } }) => blue};
            text-decoration: underline;
        }
    }
`;

const StyledModalTitle = styled(Modal.Title)`
    color: ${({ theme: { blue } }) => blue};
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: #ffffff;
    margin-right: 10px;
`;

const VirtualMoney = styled.div`
    background-color: ${({ theme: { blue } }) => blue};
    color: #ffffff;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
    & > span {
        font-size: 1.6rem;
        margin-left: 10px;
    }
    width: auto;
`;

const StyledModalForm = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`;

export const MyParkingTickets = () => {
    const [loading, setLoading] = useState(true);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalPiggyBank, setModalPiggyBank] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [redirect] = useState(null);
    const [balance, setBalance] = useState(0);
    const [update, setUpdate] = useState(0);

    const token = useSelector(state => state.token);

    const addVehicle = async values => {
        try {
            const response = await axios.post(API_VEHICLES, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.status;
        } catch (e) {
            throw e;
        }
    };

    const payPiggyBank = async data => {
        try {
            const response = await axios.post(API_PARKING_PIGGY_BANK_BALANCE, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.url;
        } catch (e) {
            throw e;
        }
    };

    const refundTicket = async id => {
        try {
            const response = await axios.post(
                API_PARKING_REFUND_TICKET(id),
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            return response.data.amount;
        } catch (e) {
            throw e;
        }
    };

    useEffect(() => {
        const getTickets = async () => {
            try {
                const response = await axios.get(API_GET_PARKING_TICKETS, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { tickets: tickets1 } = response.data;
                return tickets1;
            } catch (e) {
                throw e;
            }
        };

        const getBalance = async () => {
            try {
                const response = await axios.get(API_PARKING_PIGGY_BANK_BALANCE, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { balance: balance1 } = response.data;
                return balance1;
            } catch (e) {
                throw e;
            }
        };

        getTickets()
            .then(newTickets => {
                setTickets(newTickets);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });

        const getVehicles = async () => {
            try {
                const response = await axios.get(API_VEHICLES, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { vehicles: vehicles1 } = response.data;
                return vehicles1;
            } catch (e) {
                throw e;
            }
        };

        getBalance().then(newBalance => setBalance(newBalance));
        // .catch(e => console.error(e));

        getVehicles().then(newVehicles => setVehicles(newVehicles));
        // .catch(e => console.error(e));
    }, [update, token]);

    return (
        <PanelTemplate loading={loading} redirect={redirect}>
            <SectionTitle>Parkowanie</SectionTitle>
            <StyledWrapper>
                <div>
                    <Select iconLeft={faCar} textAlign="left" width="300px" invert>
                        <option>Twoje pojazdy</option>
                        {vehicles.map(({ licensePlate, description }) => (
                            <option value={licensePlate}>{description}</option>
                        ))}
                    </Select>
                    <span
                        role="button"
                        tabIndex="0"
                        onClick={() => {
                            setModalAdd(true);
                        }}
                        onKeyPress={() => {
                            setModalAdd(true);
                        }}
                    >
                        Dodaj nowy pojazd
                    </span>
                </div>
                <div>
                    <span
                        role="button"
                        tabIndex="0"
                        onClick={() => {
                            setModalPiggyBank(true);
                        }}
                        onKeyPress={() => {
                            setModalPiggyBank(true);
                        }}
                    >
                        Doładuj skarbonkę
                    </span>
                    <VirtualMoney>
                        <StyledFontAwesomeIcon icon={faPiggyBank} />
                        Wirtualna skarbonka
                        <span>{getPrice(balance)}</span>
                    </VirtualMoney>
                </div>
            </StyledWrapper>

            <div className="table-responsive">
                <div className="simulated-table simulated-table-sm simulated-table-simple">
                    <div className="thead">
                        <Tr className="tr">
                            <div className="th">Data zakupu</div>
                            <div className="th">Strefa</div>
                            <div className="th">Czas</div>
                            <div className="th">Termin ważności</div>
                            <div className="th">Pojazd</div>
                            <div className="th">Kwota</div>
                            <div className="th">Forma płatności</div>
                            <div className="th">Akcja</div>
                        </Tr>
                    </div>
                    <div className="tbody">
                        {tickets.map(
                            ({
                                ticket_id: id,
                                zone,
                                canRefund,
                                payment_method: paymentMethod,
                                minutes,
                                license_plate: licensePlate,
                                active_from: activeFrom,
                                active_until: activeUntil,
                                price,
                            }) => (
                                <Tr className="tr">
                                    <div className="td">{activeFrom}</div>
                                    <div className="td">{zone}</div>
                                    <div className="td">{parseFloat((minutes / 60).toString(10)).toFixed(2)} h</div>
                                    <div className="td">{activeUntil}</div>
                                    <div className="td">{licensePlate}</div>
                                    <div className="td">{getPrice(price)}</div>
                                    <div className="td">{paymentMethod}</div>
                                    <div className="td">
                                        {canRefund && (
                                            <PrimaryButton
                                                size="xxxs"
                                                onClick={() => {
                                                    refundTicket(id).then(() => {
                                                        setUpdate(update + 1);
                                                    });
                                                    // .catch(e => console.error(e));
                                                }}
                                            >
                                                Zakończ
                                            </PrimaryButton>
                                        )}
                                    </div>
                                </Tr>
                            ),
                        )}
                    </div>
                </div>
            </div>

            <Modal
                show={modalAdd}
                onHide={() => {
                    setModalAdd(false);
                }}
                size="lg"
                centered
            >
                <Modal.Header>
                    <StyledModalTitle>Dodaj pojazd</StyledModalTitle>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={values => {
                            addVehicle(values).then(() => {
                                setModalAdd(false);
                                setUpdate(update + 1);
                            });
                        }}
                        render={({ handleSubmit, submitting }) => (
                            <StyledModalForm onSubmit={handleSubmit}>
                                <Field
                                    name="licensePlate"
                                    type="text"
                                    render={({ input }) => (
                                        <LInput
                                            {...input}
                                            required="required"
                                            label="Numer rejestracyjny pojazdu"
                                            groupClass="w-50"
                                        />
                                    )}
                                />
                                <Field
                                    name="description"
                                    type="text"
                                    render={({ input }) => (
                                        <LInput {...input} required="required" label="Opis" groupClass="w-50" />
                                    )}
                                />

                                <PrimaryButton type="submit" disabled={!!submitting}>
                                    {submitting && <FontAwesomeIconSpinner icon={faSpinnerThird} />}
                                    {submitting || 'Dodaj'}
                                </PrimaryButton>
                            </StyledModalForm>
                        )}
                    />
                </Modal.Body>
            </Modal>

            <Modal
                show={modalPiggyBank}
                onHide={() => {
                    setModalPiggyBank(false);
                }}
                size="lg"
                centered
            >
                <Modal.Header>
                    <StyledModalTitle>Doładuj skarbonkę</StyledModalTitle>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        initialValues={{
                            // eslint-disable-next-line camelcase
                            url_return: `${window.location.origin}/po-platnosci`,
                        }}
                        onSubmit={values => {
                            payPiggyBank(values).then(url => {
                                if (url) {
                                    window.location.replace(url);
                                }
                            });
                            // .catch(e => console.error(e));
                        }}
                        render={({ handleSubmit, submitting }) => (
                            <StyledModalForm onSubmit={handleSubmit}>
                                <Field
                                    name="value"
                                    type="number"
                                    render={({ input }) => (
                                        <LInput
                                            {...input}
                                            required="required"
                                            label="Kwota"
                                            groupClass="w-50"
                                            step="0.01"
                                            min="0.01"
                                        />
                                    )}
                                />
                                <PrimaryButton type="submit">
                                    {submitting && <FontAwesomeIconSpinner icon={faSpinnerThird} />}
                                    {submitting || 'Doładuj'}
                                </PrimaryButton>

                                <p>Płatność realizowana przez Przelewy24</p>
                            </StyledModalForm>
                        )}
                    />
                </Modal.Body>
            </Modal>
        </PanelTemplate>
    );
};
