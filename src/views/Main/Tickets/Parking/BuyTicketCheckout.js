import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import LayoutCardWithTitleAndPath from '../../../../templates/LayoutCardWithTitleAndPath';
import { TicketCheckOut } from '../TicketCheckOut';
import { API_PARKING_BUY } from '../../../../api';

const StyledMain = styled.main`
    overflow: hidden;
`;

const buyTicket = async (data, token) => {
    try {
        const response = await axios.post(API_PARKING_BUY, data, {
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
    const token = useSelector(state => state.token);
    const parkingTicketsData = useSelector(state => state.parkingTicketsData);
    const [redirect, setRedirect] = useState(null);
    return (
        <>
            {redirect && <Redirect to={redirect} />}
            <LayoutCardWithTitleAndPath
                pathItems={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/kup-bilet', label: 'Kup bilet' },
                    { url: '/kup-bilet/parkowanie', label: 'Parkowanie' },
                    { url: '/kup-bilet/parkowanie/podsumowanie', label: 'Podsumowanie' },
                ]}
                category="Parkowanie"
                title="Parkowanie - kup bilet"
                className="news-index"
            >
                <StyledMain>
                    <TicketCheckOut
                        piggyBank={!!token}
                        initialValues={{
                            ...parkingTicketsData,
                            minutes: parkingTicketsData.timeOwn
                                ? parkingTicketsData.timeOwn * 60
                                : parkingTicketsData.time,
                            paymentMethod: '1',
                            // eslint-disable-next-line camelcase
                            url_return: `${window.location.origin}/kup-bilet/parkowanie/podziekowanie`,
                        }}
                        price={parkingTicketsData.price}
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
                        onSubmit={values => {
                            buyTicket(values, token).then(response => {
                                if (response.url !== 'undefined') {
                                    if (response.url) {
                                        window.location.replace(response.url);
                                    } else if (response.success) {
                                        setRedirect('/kup-bilet/parkowanie/podziekowanie');
                                    } else {
                                        NotificationManager.error(response.message || 'Błąd w płatności');
                                    }
                                }
                            });
                            // .catch(e => console.error(e));
                        }}
                    />
                </StyledMain>
            </LayoutCardWithTitleAndPath>
        </>
    );
};
// TODO: Redirect to appropriate page

/*
* title="Wydarzenia - kup bilet"
            description="Wydarzenia - kup bilet"
            keywords="Wydarzenia - kup bilet"
            redirect={redirect}
            loading={false}
*
* */
