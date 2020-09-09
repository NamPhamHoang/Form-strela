import React, { useContext, useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import styled, { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import createDecorator from 'final-form-calculate';
import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons';
import { faCar, faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { faAngleLeft, faAngleRight, faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import LayoutCardWithTitleAndPath from '../../../../templates/LayoutCardWithTitleAndPath';
import {
    FontAwesomeIconSpinner,
    Step,
    Steps,
    StyledForm,
    StyledMain,
    StyledPrimaryButton,
    StyledSpan,
    StyledSumPrice,
    StyledSumPriceWrapper,
    StyledTableHeader,
    StyledTableRow,
    StyledTableRowPrice,
    StyledTicketOption as TicketOption,
    StyledTicketOptionWrapper as TicketOptionWrapper,
    StyledTicketPrice,
} from '../../../../components/StepsComponent';
import { getPrice } from '../../../../helpers';
import LicensePlate from '../../../../img/license-plate.png';
import { Input } from '../../../../components/Form/Input';
import { PrimaryButton } from '../../../../components/Buttons/Button';
import {
    API_PARKING_ZONES,
    API_PARKING_CHECK_PRICE,
    API_PARKING_ZONES_TICKETS,
    API_PARKING_GET_TICKET_DATA,
    API_VEHICLES,
} from '../../../../api';
import { SET_PARKING_TICKETS_TO_BUY } from '../../../../actions';
import { Select } from '../../../../components/Form/Select';

const StyledTicketOption = styled(TicketOption)``;

const StyledTicketOwnText = styled.p`
    color: ${({ active }) => (!active ? '#000000' : '#ffffff')};
    font-size: 1.6rem;
`;
const StyledTicketOwn = styled(StyledTicketOption)`
    grid-column: 3/5;
    flex-direction: row;
    span {
        color: ${({ active }) => (!active ? '#000000' : '#ffffff')};
    }
`;
const StyledTicketOptionWrapper = styled(TicketOptionWrapper)`
    grid-template-columns: repeat(${({ items }) => items}, 200px);
    margin: 0 auto;
    width: auto;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-left: 10px;
`;

const StyledSectionTitle = styled.h4`
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: none;
    margin: 30px auto 20px;
`;

const StyledSpanH = styled.span`
    margin-left: 5px;
`;

const StyledTicketRowData = styled.div`
    display: flex;
`;

const StyledSelect = styled(Select)`
    margin-top: 5px;
`;

const StyledLicensePlate = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    align-self: flex-start;
    span {
        position: absolute;
        left: 35px;
        font-size: 40px;
        top: -5px;
        text-transform: uppercase;
    }
`;

const getTicketPrice = async data => {
    try {
        const response = await axios.get(API_PARKING_CHECK_PRICE, {
            params: data,
        });
        return response.data.price;
    } catch (e) {
        return 0;
    }
};

const getTicketPriceAndTime = async data => {
    try {
        const response = await axios.get(API_PARKING_GET_TICKET_DATA, {
            params: data,
        });
        return response.data;
    } catch (e) {
        return 0;
    }
};

const decorator = createDecorator(
    {
        field: 'zone_id',
        updates: {
            timeOwn: () => null,
            time: () => null,
        },
    },
    {
        field: 'licensePlateSelect',
        updates: {
            // eslint-disable-next-line camelcase
            license_plate: (value, allValues) => value || allValues.license_plate,
        },
    },
    {
        field: 'license_plate',
        updates: {
            licensePlateSelect: () => null,
        },
    },
    {
        field: 'time',
        updates: {
            timeOwn: (timeValue, allValues) => (timeValue ? null : allValues.timeOwn),
            ownPrice: () => 0,
        },
    },
    {
        field: 'timeOwn',
        updates: {
            time: (timeOwnValue, allValues) => (timeOwnValue ? null : allValues.time),
            ownPrice: async (timeOwnValue, allValues) => {
                if (timeOwnValue) {
                    const response = await getTicketPrice({
                        zone: allValues.zone_id,
                        minutes: timeOwnValue * 60,
                    });
                    return response;
                }
                return 0;
            },
        },
    },
);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const getZones = async () => {
    try {
        const response = await axios.get(API_PARKING_ZONES);
        return response.data;
    } catch (e) {
        return [];
    }
};
const getTicketTypes = async zoneId => {
    try {
        const response = await axios.get(API_PARKING_ZONES_TICKETS(zoneId));
        return response.data.ticket;
    } catch (e) {
        return [];
    }
};

const getVehicles = async () => {
    try {
        const response = await axios.get(API_VEHICLES);

        return response.data.vehicles;
    } catch (e) {
        throw e;
    }
};

export const Ticket = () => {
    const [redirect, setRedirect] = useState(null);
    const [weekend, setWeekend] = useState(false);
    const [zones, setZones] = useState([]);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [step, setStep] = useState(1);
    const themeContext = useContext(ThemeContext);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            getZones().then(({ zones: newZones, weekend: newWeekend }) => {
                setZones(newZones);
                setWeekend(newWeekend || false);
            });
            // .catch(e => console.log(e));
        }, 100);

        if (token) {
            getVehicles().then(newVehicles => {
                setVehicles(newVehicles);
            });
        }
    }, [token]);
    return (
        <>
            {redirect && <Redirect to={redirect} />}
            <LayoutCardWithTitleAndPath
                pathItems={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/kup-bilet', label: 'Kup bilet' },
                    { url: '/kup-bilet/parkowanie', label: 'Parkowanie' },
                ]}
                category="Parkowanie"
                title="Parkowanie - kup bilet"
                className="news-index"
            >
                <StyledMain>
                    {!!weekend && (
                        <>
                            <StyledSectionTitle>W weekendy i święta strefa nie obowiązuje</StyledSectionTitle>
                        </>
                    )}
                    {!weekend && !!zones.length && (
                        <Form
                            decorators={[decorator]}
                            onSubmit={async values => {
                                dispatch({ type: SET_PARKING_TICKETS_TO_BUY, payload: values });
                                await sleep(100);
                                setRedirect('/kup-bilet/parkowanie/podsumowanie');
                            }}
                            mutators={{
                                reset: ([value], state, utils) => {
                                    utils.changeValue(state, 'time', () => value);
                                    utils.changeValue(state, 'timeOwn', () => value);
                                },
                                setPrice: ([value], state, utils) => {
                                    utils.changeValue(state, 'price', () => value);
                                },
                                setActiveUntil: ([value], state, utils) => {
                                    utils.changeValue(state, 'activeUntil', () => value);
                                },
                                setZoneName: ([value], state, utils) => {
                                    utils.changeValue(state, 'zoneName', () => value);
                                },
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.license_plate) {
                                    // eslint-disable-next-line camelcase
                                    errors.license_plate = 'Wpisz nr rejestracyjny';
                                }
                                return errors;
                            }}
                            render={({
                                submitting,
                                handleSubmit,
                                values: {
                                    zone_id: zoneId,
                                    zoneName,
                                    activeUntil,
                                    ownPrice,
                                    timeOwn,
                                    time,
                                    license_plate: licensePlate,
                                    price,
                                },
                                form,
                            }) => (
                                <StyledForm onSubmit={handleSubmit}>
                                    <Steps currentStep={step}>
                                        <Step>
                                            <StyledSectionTitle>
                                                Wybierz strefę
                                                <StyledFontAwesomeIcon color={themeContext.blue} icon={faInfoCircle} />
                                            </StyledSectionTitle>

                                            <StyledTicketOptionWrapper items={zones.length}>
                                                {zones.map(({ id, name }) => (
                                                    <StyledTicketOption
                                                        active={parseInt(zoneId, 10) === id}
                                                        onClick={() => {
                                                            if (parseInt(zoneId, 10) !== id) {
                                                                getTicketTypes(id)
                                                                    .then(response => {
                                                                        setTicketTypes(response);
                                                                    })
                                                                    .catch(() => {
                                                                        setTicketTypes([]);
                                                                    });
                                                            }
                                                            form.mutators.setZoneName(name);
                                                        }}
                                                        key={id}
                                                    >
                                                        <Field
                                                            name="zone_id"
                                                            component="input"
                                                            value={id}
                                                            type="radio"
                                                        />
                                                        <StyledTicketPrice>{name}</StyledTicketPrice>
                                                        <span>strefa</span>
                                                    </StyledTicketOption>
                                                ))}
                                            </StyledTicketOptionWrapper>

                                            {zoneId && (
                                                <>
                                                    <StyledSectionTitle>Wybierz czas</StyledSectionTitle>
                                                    <StyledTicketOptionWrapper items={4}>
                                                        {ticketTypes.map(item => (
                                                            <StyledTicketOption
                                                                active={parseInt(time, 10) === item.minutes}
                                                            >
                                                                <Field
                                                                    name="time"
                                                                    component="input"
                                                                    value={item.minutes}
                                                                    type="radio"
                                                                />
                                                                <StyledTicketPrice>
                                                                    {getPrice(item.price)}
                                                                </StyledTicketPrice>
                                                                <span>{item.name}</span>
                                                            </StyledTicketOption>
                                                        ))}

                                                        <StyledTicketOwn active={parseFloat(timeOwn) > 0}>
                                                            <Field
                                                                name="timeOwn"
                                                                component="input"
                                                                value="1"
                                                                type="radio"
                                                            />
                                                            <div>
                                                                <StyledTicketPrice>
                                                                    {getPrice(ownPrice)}
                                                                </StyledTicketPrice>
                                                                <span>własny czas</span>
                                                            </div>
                                                            <div>
                                                                <StyledTicketOwnText active={parseFloat(timeOwn) > 0}>
                                                                    Bilet ważny przez:
                                                                </StyledTicketOwnText>
                                                                <Field
                                                                    name="timeOwn"
                                                                    value="1"
                                                                    type="number"
                                                                    render={({ input }) => (
                                                                        <>
                                                                            <Input
                                                                                {...input}
                                                                                borderColor="#000"
                                                                                min="0.5"
                                                                                max="8"
                                                                                step="0.5"
                                                                                width="150px"
                                                                            />
                                                                            <StyledSpanH>h</StyledSpanH>
                                                                        </>
                                                                    )}
                                                                />
                                                            </div>
                                                        </StyledTicketOwn>
                                                    </StyledTicketOptionWrapper>
                                                </>
                                            )}
                                        </Step>
                                        {step > 1 && (
                                            <Step>
                                                <StyledTableHeader>
                                                    <span>Podsumowanie</span>
                                                </StyledTableHeader>

                                                <StyledTableRow>
                                                    <StyledTicketRowData>
                                                        <div>
                                                            <p>Bilet parkingowy</p>
                                                            <p>Jaorcin - {zoneName}</p>
                                                            <p>Czas: 1 godzina</p>
                                                            <p>Termin ważności: {activeUntil}</p>
                                                            <p>Samochód:</p>
                                                            <Field
                                                                name="license_plate"
                                                                type="text"
                                                                render={({ input, meta }) => (
                                                                    <>
                                                                        <Input
                                                                            {...input}
                                                                            placeholder="Podaj numer rejestracyjny"
                                                                            width="200px"
                                                                        />
                                                                        {meta.error && meta.touched && (
                                                                            <p>{meta.error}</p>
                                                                        )}
                                                                    </>
                                                                )}
                                                            />
                                                            {!!token || (
                                                                <p>
                                                                    lub <Link to="/logowanie">zaloguj się</Link> i
                                                                    wybierz z listy swoich pojazdów
                                                                </p>
                                                            )}

                                                            {!!token && (
                                                                <Field
                                                                    name="licensePlateSelect"
                                                                    type="text"
                                                                    render={({ input, meta }) => (
                                                                        <>
                                                                            <StyledSelect
                                                                                {...input}
                                                                                iconLeft={faCar}
                                                                                textAlign="left"
                                                                                width="200px"
                                                                                invert
                                                                            >
                                                                                <option value=" ">Twoje pojazdy</option>
                                                                                {vehicles.map(vehicle => (
                                                                                    <option
                                                                                        value={vehicle.licensePlate}
                                                                                        selected={
                                                                                            vehicle.licensePlate ===
                                                                                            input.value
                                                                                        }
                                                                                    >
                                                                                        {vehicle.description}
                                                                                    </option>
                                                                                ))}
                                                                            </StyledSelect>
                                                                            {meta.error && meta.touched && (
                                                                                <p>{meta.error}</p>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                />
                                                            )}
                                                        </div>
                                                        <StyledLicensePlate>
                                                            <img src={LicensePlate} alt="" />
                                                            <span>{licensePlate}</span>
                                                        </StyledLicensePlate>
                                                    </StyledTicketRowData>
                                                    <StyledTableRowPrice>{getPrice(price)}</StyledTableRowPrice>
                                                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
                                                    <span
                                                        role="button"
                                                        onClick={() => {
                                                            form.mutators.reset(null);
                                                            setStep(step - 1);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </span>
                                                </StyledTableRow>

                                                <StyledSumPriceWrapper>
                                                    <StyledSumPrice>Razem: {getPrice(price)}</StyledSumPrice>

                                                    <PrimaryButton size="s" disabled={submitting}>
                                                        {submitting && <FontAwesomeIconSpinner icon={faSpinnerThird} />}
                                                        {submitting || 'Przejdź do realizacji zamówienia'}
                                                    </PrimaryButton>
                                                </StyledSumPriceWrapper>
                                            </Step>
                                        )}
                                    </Steps>
                                    {step < 2 && (
                                        <StyledPrimaryButton
                                            size="l"
                                            type="button"
                                            disabled={(!time && !timeOwn) || !zoneId}
                                            onClick={() => {
                                                getTicketPriceAndTime({
                                                    zone: zoneId,
                                                    minutes: time || timeOwn * 60,
                                                })
                                                    .then(({ price: newPrice, activeUntil: newActiveUntil }) => {
                                                        form.mutators.setPrice(newPrice);
                                                        form.mutators.setActiveUntil(newActiveUntil);
                                                        setStep(step + 1);
                                                    })
                                                    .catch(() => {
                                                        // console.error(e);
                                                    });
                                            }}
                                        >
                                            <StyledSpan>Przejdź dalej</StyledSpan>
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </StyledPrimaryButton>
                                    )}

                                    {step > 1 && !submitting && (
                                        <StyledPrimaryButton
                                            size="l"
                                            type="button"
                                            onClick={() => {
                                                setStep(step - 1);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faAngleLeft} />
                                            <StyledSpan>Wstecz</StyledSpan>
                                        </StyledPrimaryButton>
                                    )}
                                </StyledForm>
                            )}
                        />
                    )}
                </StyledMain>
            </LayoutCardWithTitleAndPath>
        </>
    );
};

/*
* title="Wydarzenia - kup bilet"
            description="Wydarzenia - kup bilet"
            keywords="Wydarzenia - kup bilet"
            redirect={redirect}
            loading={false}
* */
