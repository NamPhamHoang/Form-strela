import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Redirect } from 'react-router-dom';
import LayoutCardWithTitleAndPath from '../../../../templates/LayoutCardWithTitleAndPath';
import { FontAwesomeIconSpinner, StyledMain } from '../../../../components/StepsComponent';
import { useGetListItems } from '../../../../hooks/GetList';
import { Select } from '../../../../components/Form/Select';
import { PrimaryButton } from '../../../../components/Buttons/Button';
import {
    API_BUS_TICKETS_DISCOUNTS,
    API_BUS_TICKETS_PRICES,
    API_BUS_TICKETS_STATIONS,
    API_BUS_TICKETS_STATIONS_AVAILABLE,
} from '../../../../api';
import { getPrice } from '../../../../helpers';
import { SET_BUS_TICKETS_TO_BUY } from '../../../../actions';

const StyledForm = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: 400px 1fr;
    grid-gap: 20px;
`;

const ButtonWrapper = styled.div`
    grid-column: 1/3;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledLabel = styled.label`
    display: flex;
    justify-content: space-between;
    & > input[type='radio'] {
        display: none;
    }
    & > input[type='radio']:checked ~ div {
        background-color: ${({ theme }) => theme.blueChecked};
        border-color: ${({ theme }) => theme.blueChecked};
    }
`;

const StyledTicketType = styled.div`
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.blue};
    background-color: ${({ theme }) => theme.blue};
    padding: 5px 0;
    text-align: center;
    width: 100px;
    color: ${({ theme }) => theme.white};
`;

const MapWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const StyledMap = styled(Map)`
    width: 100%;
`;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const Ticket = () => {
    const [redirect, setRedirect] = useState(null);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [map, setMap] = useState(null);

    const { prices } = useGetListItems(API_BUS_TICKETS_PRICES(from, to), to) || { prices: [] };
    const { stations } = useGetListItems(API_BUS_TICKETS_STATIONS, null) || { stations: [] };
    const { stations: availableStations } = useGetListItems(API_BUS_TICKETS_STATIONS_AVAILABLE(from), from) || {
        stations: [],
    };

    const { discounts } = useGetListItems(API_BUS_TICKETS_DISCOUNTS, null) || { discounts: [] };
    const dispatch = useDispatch();

    const saveMap = newMap => {
        setMap(newMap);
    };

    const onSubmit = async values => {
        dispatch({ type: SET_BUS_TICKETS_TO_BUY, payload: values });
        await sleep(1000);
        setRedirect('/kup-bilet/autobus/podsumowanie');
    };

    return (
        <>
            {redirect && <Redirect to={redirect} />}
            <LayoutCardWithTitleAndPath
                pathItems={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/kup-bilet', label: 'Kup bilet' },
                    { url: '/kup-bilet/autobus', label: 'Autobus' },
                ]}
                category="Bilet na autobus"
                title="Jarocińskie Linie Autobusowe - kup bilet"
                className="news-index"
            >
                <StyledMain>
                    <Form
                        onSubmit={onSubmit}
                        mutators={{}}
                        initialValues={{
                            discountValue: 0,
                            price: 0,
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.from) {
                                errors.from = 'Pole jest wymagane';
                            }
                            if (!values.to) {
                                errors.to = 'Pole jest wymagane';
                            }
                            if (!values.type) {
                                errors.type = 'WYMAGANE';
                            }
                            return errors;
                        }}
                        render={({ submitting, handleSubmit, values, form, errors }) => (
                            <StyledForm onSubmit={handleSubmit}>
                                <div>
                                    <p>Wybierz skąd</p>
                                    <Field
                                        name="from"
                                        render={({ input, meta }) => (
                                            <>
                                                <Select
                                                    width="400px"
                                                    fontSize="1.4rem"
                                                    textAlign="left"
                                                    {...input}
                                                    onChange={e => {
                                                        input.onChange(e);
                                                        setFrom(e.target.value);
                                                        form.change('to', null);
                                                    }}
                                                    defaultValue="Wybierz"
                                                >
                                                    <option value="">Wybierz skąd</option>
                                                    {stations.map(({ id, name }) => (
                                                        <option value={id} selected={input.value === id}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                </Select>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </>
                                        )}
                                    />
                                    <p>Wybierz dokąd</p>
                                    <Field
                                        name="to"
                                        render={({ input, meta }) => (
                                            <>
                                                <Select
                                                    width="400px"
                                                    fontSize="1.4rem"
                                                    textAlign="left"
                                                    {...input}
                                                    onChange={e => {
                                                        input.onChange(e);
                                                        setTo(e.target.value);
                                                    }}
                                                    defaultValue="Wybierz"
                                                >
                                                    <option value="">Wybierz dokąd</option>
                                                    {availableStations.map(({ id, name }) => (
                                                        <option value={id} selected={input.value === id}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                </Select>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </>
                                        )}
                                    />
                                    <p>Wybierz zniżkę</p>
                                    <Field
                                        name="discount"
                                        render={({ input }) => (
                                            <>
                                                <Select
                                                    width="400px"
                                                    fontSize="1.4rem"
                                                    textAlign="left"
                                                    {...input}
                                                    defaultValue="Wybierz"
                                                    onChange={e => {
                                                        input.onChange(e);
                                                        if (e.target.value) {
                                                            form.change(
                                                                'discountValue',
                                                                discounts.find(
                                                                    ({ id }) => id === parseInt(e.target.value, 10),
                                                                ).value,
                                                            );
                                                        } else {
                                                            form.change('discountValue', 0);
                                                        }
                                                    }}
                                                >
                                                    <option value="">Wybierz zniżkę</option>
                                                    {discounts.map(({ id, name }) => (
                                                        <option value={id} selected={input.value === id}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </>
                                        )}
                                    />
                                    {!!prices.length && (
                                        <>
                                            <p>Wybierz bilet {errors.type && <span>{errors.type}</span>}</p>
                                            <div>
                                                {prices.map(({ ticket_type_id: ticketId, name, price }) => (
                                                    <>
                                                        <Field
                                                            name="type"
                                                            type="radio"
                                                            value={`${ticketId}`}
                                                            render={({ input }) => (
                                                                <>
                                                                    {/* eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */}
                                                                    <StyledLabel>
                                                                        <span>{name}</span>
                                                                        <input
                                                                            {...input}
                                                                            onChange={e => {
                                                                                input.onChange(e);
                                                                                form.change('price', price);
                                                                            }}
                                                                        />
                                                                        <StyledTicketType>
                                                                            {getPrice(
                                                                                (price * (100 - values.discountValue)) /
                                                                                    100,
                                                                            )}
                                                                        </StyledTicketType>
                                                                    </StyledLabel>
                                                                </>
                                                            )}
                                                        />
                                                    </>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <MapWrapper>
                                    <StyledMap center={[51.97266, 17.50256]} zoom={13} ref={saveMap}>
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        {map && (
                                            <>
                                                {stations.filter(station => {
                                                    return parseInt(station.id, 10) === parseInt(values.from, 10);
                                                }).length && (
                                                    <>
                                                        <Marker
                                                            position={[
                                                                stations.filter(station => {
                                                                    return (
                                                                        parseInt(station.id, 10) ===
                                                                        parseInt(values.from, 10)
                                                                    );
                                                                })[0].lat,
                                                                stations.filter(station => {
                                                                    return (
                                                                        parseInt(station.id, 10) ===
                                                                        parseInt(values.from, 10)
                                                                    );
                                                                })[0].lng,
                                                            ]}
                                                        />
                                                    </>
                                                )}
                                                {stations.filter(station => {
                                                    return parseInt(station.id, 10) === parseInt(values.to, 10);
                                                }).length && (
                                                    <>
                                                        <Marker
                                                            position={[
                                                                stations.filter(station => {
                                                                    return (
                                                                        parseInt(station.id, 10) ===
                                                                        parseInt(values.to, 10)
                                                                    );
                                                                })[0].lat,
                                                                stations.filter(station => {
                                                                    return (
                                                                        parseInt(station.id, 10) ===
                                                                        parseInt(values.to, 10)
                                                                    );
                                                                })[0].lng,
                                                            ]}
                                                        />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </StyledMap>
                                </MapWrapper>
                                <ButtonWrapper>
                                    <PrimaryButton size="s" disabled={submitting}>
                                        {submitting && <FontAwesomeIconSpinner icon={faSpinnerThird} />}
                                        {submitting || 'Przejdź dalej'}
                                    </PrimaryButton>
                                </ButtonWrapper>
                            </StyledForm>
                        )}
                    />
                </StyledMain>
            </LayoutCardWithTitleAndPath>
        </>
    );
};

/*
title="Autobus - kup bilet"
description="Autobus - kup bilet"
keywords="Autobus - kup bilet"
redirect={redirect}
loading={false}
* */
