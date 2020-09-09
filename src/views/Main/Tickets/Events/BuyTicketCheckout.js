import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import LayoutCardWithTitleAndPath from '../../../../templates/LayoutCardWithTitleAndPath';
import { TicketCheckOut } from '../TicketCheckOut';
import { API_TICKETS_EVENT_BUY } from '../../../../api';

const StyledMain = styled.main`
    overflow: hidden;
`;

const buyTicket = async (data, token) => {
    try {
        const response = await axios.post(API_TICKETS_EVENT_BUY, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        return e.response.data;
    }
};

export const BuyTicketCheckout = () => {
    const tickets = useSelector(state => state.ticketsData);
    const token = useSelector(state => state.token);

    return (
        <>
            <LayoutCardWithTitleAndPath
                pathItems={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/kup-bilet', label: 'Kup bilet' },
                    { url: '/kup-bilet/wydarzenia', label: 'Wydarzenia' },
                    { url: '/kup-bilet/wydarzenia/podsumowanie', label: 'Podsumowanie' },
                ]}
                category="Wydarzenia"
                title="Wydarzenia - kup bilet"
                className="news-index"
            >
                <StyledMain>
                    <TicketCheckOut
                        initialValues={{
                            ...tickets,
                            paymentMethod: '1',
                            url_return: `${window.location.origin}/kup-bilet/wydarzenia/podziekowanie`,
                        }}
                        onSubmit={values => {
                            buyTicket(values, token)
                                .then(response => {
                                    if (response.url) {
                                        window.location.replace(response.url);
                                    }
                                })
                                .catch(e => console.error(e));
                        }}
                        price={
                            !!tickets.prices &&
                            tickets.prices.reduce((previousValue, { price }) => {
                                return previousValue + price;
                            }, 0)
                        }
                        inputs={[
                            {
                                name: 'email',
                                type: 'email',
                                label: 'E-mail',
                            },
                            {
                                name: 'name',
                                type: 'text',
                                label: 'Imię',
                            },
                            {
                                name: 'surname',
                                type: 'text',
                                label: 'Nazwisko',
                            },
                        ]}
                    />
                </StyledMain>
            </LayoutCardWithTitleAndPath>
        </>
    );
};

/*
* title="Wydarzenia - kup bilet"
            description="Wydarzenia - kup bilet"
            keywords="Wydarzenia - kup bilet"
            redirect={null}
            loading={false}
*
* */
