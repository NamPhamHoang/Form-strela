import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import LayoutCardWithTitleAndPath from '../../../../templates/LayoutCardWithTitleAndPath';
import { TicketCheckOut } from '../TicketCheckOut';
import { API_BUS_TICKETS_BUY } from '../../../../api';

const StyledMain = styled.main`
    overflow: hidden;
`;

const buyTicket = async (data, token) => {
    try {
        const response = await axios.post(API_BUS_TICKETS_BUY, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        return e.response.data;
    }
};

export const BusBuyTicketCheckout = () => {
    const busTicketsData = useSelector(state => state.busTicketsData);
    const token = useSelector(state => state.token);

    return (
        <>
            <LayoutCardWithTitleAndPath
                pathItems={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/kup-bilet', label: 'Kup bilet' },
                    { url: '/kup-bilet/autobus', label: 'Autobus' },
                    { url: '/kup-bilet/autobus/podsumowanie', label: 'Podsumowanie' },
                ]}
                category="Bilet na autobus"
                title="Jarocińskie Linie Autobusowe - kup bilet"
                className="news-index"
            >
                <StyledMain>
                    <TicketCheckOut
                        initialValues={{
                            ...busTicketsData,
                            paymentMethod: '1',
                            // eslint-disable-next-line camelcase
                            url_return: `${window.location.origin}/kup-bilet/autobus/podziekowanie`,
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
                        price={(busTicketsData.price * (100 - busTicketsData.discountValue)) / 100}
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
* title="Autobus - kup bilet"
            description="Autobus - kup bilet"
            keywords="Autobus - kup bilet"
            redirect={null}
            loading={false}
* */
