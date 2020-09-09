import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

export const UseChangeData = () => {
    const [redirect, setRedirect] = useState(null);
    const token = useSelector(state => state.token);
    const hasChangedData = useSelector(state => state.hasChangedData);
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        if (token && !hasChangedData && currentPath !== '/panel/uzupelnij-dane') {
            setRedirect('/panel/uzupelnij-dane');
        }
    }, [token, hasChangedData, location]);

    return redirect ? <Redirect to={redirect} /> : null;
};
