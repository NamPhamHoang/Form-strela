import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const useGetItem = url => {
  const token = useSelector(state => state.token);
  const [data, setData] = useState(null);

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

  useEffect(() => {
    fetch().then(newData => {
      setData(newData);
    });
  }, []);
  return data;
};
