import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';

export const useGetListItems = (url, change) => {
    const token = useSelector(state => state.token);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (e) {

                return null;
            }
        };

        fetch().then(newData => {
            setData(newData);
        });
    }, [change, token, url]);
    return data;
};
