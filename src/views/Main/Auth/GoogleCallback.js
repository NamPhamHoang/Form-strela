import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import { gate } from '../../../api';
import { LOGIN } from '../../../actions';

export const GoogleCallback = () => {
    const { token } = useParams();
    const [redirect, setRedirect] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        axios
            .post(`${gate}/social/google/${token}`)
            .then(({ data }) => {
                const {
                    // eslint-disable-next-line no-shadow
                    access_token: token,
                    hasChangedData,
                    role,
                    isUserCityMember,
                    expires_in: expiresIn,
                    daysLeftToActivate,
                    avatar,
                } = data;
                dispatch({
                    type: LOGIN,
                    payload: {
                        hasChangedData,
                        role,
                        token,
                        isUserCityMember,
                        expiresIn,
                        daysLeftToActivate,
                        avatar,
                    },
                });
            })
            .catch(() => {
                setRedirect('/logowanie');
            });
    }, [token, dispatch]);

    useEffect(() => {
        setTimeout(() => {
            if (redirect) {
                NotificationManager.error('Błąd - proszę spróbować ponownie');
            }
        }, 100);
    }, [redirect]);

    return (
        <>
            {redirect && <Redirect to={redirect} />}
            <Loading className="mt-5" />
            <p className="text-center font-weight-light text-muted">Proszę czekać</p>
        </>
    );
};
