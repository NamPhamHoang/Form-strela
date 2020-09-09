import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { LOGIN, LOGOUT } from '../actions';
import { API_REFRESH_TOKEN } from '../api';

export const UseAuth = () => {
    const token = useSelector(state => state.token);
    const expiresIn = useSelector(state => state.expiresIn);
    const [redirect, setRedirect] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            setRedirect('/logowanie');
        } else if (expiresIn && expiresIn * 1 - 1000 * 60 * 60 < new Date().getTime()) {
            axios.post(API_REFRESH_TOKEN).then(response => {
                const {
                    access_token: newToken,
                    hasChangedData,
                    role,
                    isUserCityMember,
                    expires_in: newExpiresIn,
                    daysLeftToActivate,
                } = response.data;
                dispatch({
                    type: LOGIN,
                    payload: {
                        hasChangedData,
                        role,
                        token: newToken,
                        isUserCityMember,
                        expiresIn: newExpiresIn,
                        daysLeftToActivate,
                    },
                });
            });
        } else if (expiresIn && expiresIn < new Date().getTime()) {
            dispatch({
                type: LOGOUT,
                payload: {},
            });
            setRedirect('/logowanie');
        }
    }, [token, expiresIn, dispatch]);
    return redirect ? <Redirect to={redirect} /> : null;
};
