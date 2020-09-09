// @flow
import {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

export const UseCompany = () => {
    const role = useSelector(state => state.role);
    const [redirect, setRedirect] = useState(null);
    useEffect(() => {
        if (role.toString() !== '2') {
            setRedirect('/');
        }
    }, [role]);
    return redirect;
};
