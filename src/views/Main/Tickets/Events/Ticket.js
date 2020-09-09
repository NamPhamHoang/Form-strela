import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { faAngleRight, faAngleLeft, faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { faUser, faCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form } from 'react-final-form';
import createDecorator from 'final-form-calculate';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LayoutCardWithTitleAndPath from '../../../../templates/LayoutCardWithTitleAndPath';
import { API_TICKETS_EVENT_BY_SLUG } from '../../../../api';
import { Select } from '../../../../components/Form/Select';
import { PrimaryButton } from '../../../../components/Buttons/Button';
import { SET_TICKETS_TO_BUY } from '../../../../actions';
import { getPrice } from '../../../../helpers';
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
    StyledTicketOption,
    StyledTicketOptionWrapper,
    StyledTicketPrice,
} from '../../../../components/StepsComponent';

const StyledName = styled.p`
    font-size: 1.4rem;
`;
const StyledTicketCount = styled.p`
    font-size: 2.2rem;
    font-weight: 100;
`;
const StyledTicketSite = styled.p`
    font-size: 2.6rem;
    font-weight: 200;
    & > span {
        color: ${({ theme }) => theme.blue};
        font-weight: 300;
    }
`;

const StyledRow = styled.div`
    display: grid;
    grid-template-columns: repeat(${({ cols }) => cols + 1}, 40px);
    grid-gap: 10px;
    margin: 10px 0;
`;
const StyledSeat = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme, status, active }) =>
        // eslint-disable-next-line no-nested-ternary
        status ? theme.darkgray : active ? theme.green : theme.blue};
    height: 40px;
    position: relative;
    cursor: pointer;
    & > svg {
        font-size: 2rem;
    }
    ${({ active, status }) => {
        return (
            !active &&
            !status &&
            css`
                & > svg {
                    display: none;
                }
            `
        );
    }}
`;
const StyledSeatDisabled = styled(StyledSeat)`
    background-color: transparent;
    cursor: auto;
`;
const SeatFontAwesomeIcon = styled(FontAwesomeIcon)`
    position: absolute;
    font-size: 2rem;
    bottom: 0;
`;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const decorator = createDecorator({
    field: 'quantity',
    updates: {
        prices: (quantityValue, allValues) => {
            let newRows;
            if (allValues.prices) {
                const { prices } = allValues;
                newRows = Object.assign(prices);
                if (newRows.length > quantityValue) {
                    newRows = newRows.slice(0, quantityValue);
                } else {
                    while (newRows.length < quantityValue) {
                        newRows.push({
                            id: null,
                            item: newRows.length,
                            name: `Osoba ${newRows.length + 1}`,
                            price: 0,
                        });
                    }
                }
            } else {
                newRows = Array.from({ length: quantityValue }).map((value, index) => {
                    return {
                        id: null,
                        item: index + 1,
                        name: `Osoba ${index + 1}`,
                        price: 0,
                    };
                });
            }

            return newRows;
        },
    },
});

export const Ticket = ({
    match: {
        params: { slug },
    },
}) => {
    const [step, setStep] = useState(1);
    const [event, setEvent] = useState({
        name: null,
        hall: null,
    });
    const [redirect, setRedirect] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(API_TICKETS_EVENT_BY_SLUG(slug));
                return response.data.event;
            } catch (e) {
                setRedirect(e.response.status);
                return {};
            }
        };
        fetch().then(newEvent => {
            setEvent(newEvent);
        });
    }, [slug]);

    return (
        <>
            {redirect && <Redirect to={redirect} />}
            <LayoutCardWithTitleAndPath
                pathItems={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/kup-bilet', label: 'Kup bilet' },
                    { url: '/kup-bilet/wydarzenia', label: 'Wydarzenia' },
                    { url: `/kup-bilet/wydarzenia/${slug}`, label: event.name },
                ]}
                category="Wydarzenia"
                title="Wydarzenia - kup bilet"
                className="news-index"
            >
                <StyledMain>
                    <StyledName>{event.name}</StyledName>

                    <Form
                        onSubmit={async values => {
                            dispatch({ type: SET_TICKETS_TO_BUY, payload: values });
                            await sleep(100);
                            setRedirect('/kup-bilet/wydarzenia/podsumowanie');
                        }}
                        mutators={{
                            setQuantity: ([value], state, utils) => {
                                utils.changeValue(state, 'quantity', () => value);
                            },
                            ...arrayMutators,
                        }}
                        initialValues={{ slug }}
                        decorators={[decorator]}
                        render={({ handleSubmit, form, values, submitting }) => (
                            <StyledForm onSubmit={handleSubmit}>
                                <Steps currentStep={step}>
                                    <Step>
                                        {!!event.hall && (
                                            <>
                                                {event.hall.map(({ name, seats }) => (
                                                    <StyledRow cols={seats.length}>
                                                        <div>{name}</div>
                                                        {seats.map(({ active, status }, index) => (
                                                            <>
                                                                {!!active || <StyledSeatDisabled />}
                                                                {!!active && !status && (
                                                                    <StyledSeat
                                                                        onClick={() => {
                                                                            if (!values.prices) {
                                                                                form.mutators.push('prices', {
                                                                                    id: null,
                                                                                    item: 1,
                                                                                    name: `Miejsce <span>${name}${index +
                                                                                        1}</span>`,
                                                                                    price: 0,
                                                                                    row: name,
                                                                                    seat: index,
                                                                                });
                                                                                form.mutators.setQuantity(1);
                                                                            } else {
                                                                                const isExist = values.prices.findIndex(
                                                                                    ({
                                                                                        row: itemRow,
                                                                                        seat: itemSeat,
                                                                                    }) => {
                                                                                        return (
                                                                                            name === itemRow &&
                                                                                            itemSeat === index
                                                                                        );
                                                                                    },
                                                                                );
                                                                                if (isExist !== -1) {
                                                                                    form.mutators.remove(
                                                                                        'prices',
                                                                                        isExist,
                                                                                    );
                                                                                    form.mutators.setQuantity(
                                                                                        values.prices.length - 1,
                                                                                    );
                                                                                } else {
                                                                                    form.mutators.push('prices', {
                                                                                        id: null,
                                                                                        item: values.prices.length + 1,
                                                                                        name: `Miejsce <span>${name}${index +
                                                                                            1}</span>`,
                                                                                        price: 0,
                                                                                        row: name,
                                                                                        seat: index,
                                                                                    });
                                                                                    form.mutators.setQuantity(
                                                                                        values.prices.length + 1,
                                                                                    );
                                                                                }
                                                                            }
                                                                        }}
                                                                        active={
                                                                            values.prices &&
                                                                            values.prices.findIndex(
                                                                                ({ row: itemRow, seat: itemSeat }) => {
                                                                                    return (
                                                                                        name === itemRow &&
                                                                                        itemSeat === index
                                                                                    );
                                                                                },
                                                                            ) !== -1
                                                                        }
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            color="#ffffff"
                                                                            icon={faCheck}
                                                                        />
                                                                    </StyledSeat>
                                                                )}

                                                                {!!active && !!status && (
                                                                    <StyledSeat status={status}>
                                                                        <SeatFontAwesomeIcon
                                                                            color="#ffffff"
                                                                            icon={faUser}
                                                                        />
                                                                    </StyledSeat>
                                                                )}
                                                            </>
                                                        ))}
                                                    </StyledRow>
                                                ))}
                                            </>
                                        )}

                                        {!!event.hall || (
                                            <>
                                                <StyledTicketCount>Wybierz ilość biletów</StyledTicketCount>
                                                <Field
                                                    name="quantity"
                                                    render={({ input }) => (
                                                        <>
                                                            <Select
                                                                width="300px"
                                                                fontSize="2rem"
                                                                {...input}
                                                                defaultValue="Wybierz ilość biletów"
                                                            >
                                                                <option value="">Wybeirz ilość</option>
                                                                {Array.from({ length: 10 }).map((value, index) => (
                                                                    <option
                                                                        value={index + 1}
                                                                        selected={input.value === index + 1}
                                                                    >
                                                                        {index + 1}
                                                                    </option>
                                                                ))}
                                                            </Select>
                                                        </>
                                                    )}
                                                />
                                            </>
                                        )}
                                    </Step>
                                    <Step>
                                        <FieldArray name="prices">
                                            {({ fields }) => (
                                                <>
                                                    {step === 2 &&
                                                        fields.map((name, index) => (
                                                            <>
                                                                <StyledTicketSite
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: values.prices[index].name,
                                                                    }}
                                                                />
                                                                <StyledTicketOptionWrapper
                                                                    key={name}
                                                                    items={event.prices.length}
                                                                >
                                                                    {event.prices &&
                                                                        event.prices.map(
                                                                            ({ id, price, name: ticketName }) => (
                                                                                <StyledTicketOption
                                                                                    key={`radio${name}.${id}`}
                                                                                    active={
                                                                                        id === values.prices[index].id
                                                                                    }
                                                                                >
                                                                                    <Field
                                                                                        name={`${name}.id`}
                                                                                        component="input"
                                                                                        type="radio"
                                                                                        value={id}
                                                                                        onChange={() => {
                                                                                            form.mutators.update(
                                                                                                'prices',
                                                                                                index,
                                                                                                {
                                                                                                    ...values.prices[
                                                                                                        index
                                                                                                    ],
                                                                                                    id,
                                                                                                    price,
                                                                                                    ticketName,
                                                                                                },
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                    <StyledTicketPrice>
                                                                                        {parseFloat(price).toFixed(2)}{' '}
                                                                                        zł
                                                                                    </StyledTicketPrice>
                                                                                    <span>{ticketName}</span>
                                                                                </StyledTicketOption>
                                                                            ),
                                                                        )}
                                                                </StyledTicketOptionWrapper>
                                                            </>
                                                        ))}
                                                </>
                                            )}
                                        </FieldArray>
                                    </Step>
                                    <Step>
                                        <StyledTableHeader>
                                            <span>Nazwa</span>
                                            <span>Cena</span>
                                        </StyledTableHeader>
                                        {values.prices &&
                                            step === 3 &&
                                            values.prices.map(({ name, seat, price, row }, index) => (
                                                <StyledTableRow>
                                                    <span>
                                                        {event.name} {row && seat !== null ? `${row}${seat}` : name}
                                                    </span>
                                                    <StyledTableRowPrice>{getPrice(price)}</StyledTableRowPrice>
                                                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
                                                    <span
                                                        role="button"
                                                        onClick={() => {
                                                            form.mutators.remove('prices', index);
                                                            form.mutators.setQuantity(values.prices.length - 1);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </span>
                                                </StyledTableRow>
                                            ))}

                                        <StyledSumPriceWrapper>
                                            <StyledSumPrice>
                                                Razem:{' '}
                                                {!!values.prices &&
                                                    getPrice(
                                                        values.prices.reduce((previousValue, { price }) => {
                                                            return previousValue + price;
                                                        }, 0),
                                                    )}
                                            </StyledSumPrice>

                                            <PrimaryButton size="s" disabled={submitting}>
                                                {submitting && <FontAwesomeIconSpinner icon={faSpinnerThird} />}
                                                {submitting || 'Przejdź do realizacji zamówienia'}
                                            </PrimaryButton>
                                        </StyledSumPriceWrapper>
                                    </Step>
                                </Steps>

                                {step < 3 && (
                                    <StyledPrimaryButton
                                        size="l"
                                        disabled={
                                            (step === 1 && !values.prices) ||
                                            (step === 2 && !values.prices.every(({ id }) => !!id))
                                        }
                                        type="button"
                                        onClick={() => {
                                            setStep(step + 1);
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
                </StyledMain>
            </LayoutCardWithTitleAndPath>
        </>
    );
};

/*
*
* title="Wydarzenia - kup bilet"
            description="Wydarzenia - kup bilet"
            keywords="Wydarzenia - kup bilet"
            redirect={redirect}
            loading={false}
* */
