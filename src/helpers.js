import moment from 'moment';
import noImage from './img/no-image.png';

export function buildQuery(name, value) {
    const { search } = this.props.location;
    const params = new URLSearchParams(search);
    if (!value) {
        params.delete(name);
    } else {
        params.set(name, value);
    }

    return `?${params.toString()}`;
}

export function getQuery(name) {
    const { search } = this.props.location;
    const params = new URLSearchParams(search);

    return params.get(name);
}

export const getData = (data, only = null) => {
    const newData = {};

    Object.keys(data).forEach(index => {
        if (Array.isArray(only) && !only.includes(index)) return;
        const item = data[index];
        newData[index] = item === null ? '' : item;
    });

    return newData;
};

export const setData = (data, only = null, fd = new FormData()) => {
    Object.keys(data).forEach(index => {
        if (Array.isArray(only) && !only.includes(index)) return;
        let item = data[index];
        if (item === false || item === true) item = item === true ? 1 : 0;
        fd.append(index, item);
    });

    return fd;
};

export const clearData = (data, only = null) => {
    const newData = {};
    Object.keys(data).forEach(index => {
        if (Array.isArray(only) && !only.includes(index)) return;
        newData[index] = '';
    });

    return newData;
};

export const setFiles = (files, fd = new FormData()) => {
    Object.keys(files).forEach(index => {
        const item = files[index];
        fd.append(item.name, item.file, item.fileName);
    });

    return fd;
};

export const dateJson = date => {
    date.setHours(4);
    return date.toJSON().slice(0, 10);
};

export const changeHelper = e => {
    const { name, type } = e.target;
    const value = ['radio', 'checkbox'].includes(type) ? e.target.checked : e.target.value;

    return [name, value];
};

export const checkIfDataExpired = (callback, date, minutes = 15) => {
    const old = date === null ? moment().subtract(1, 'day') : moment(date);
    const now = moment();
    const difference = moment.duration(now.diff(old)).asMinutes();
    if (difference > minutes) callback();
};

export const getImage = image => {
    return image || noImage;
};

export const getInstitutionPathName = typeName => {
    let pathName;

    if (typeName === 'Osiedla i sołectwa') {
        pathName = {
            url: '/osiedla-i-solectwa',
            label: 'Osiedla i sołectwa',
        };
    } else {
        pathName = { url: '/szkoly-przedszkola-zlobki', label: 'Szkoły podstawowe, przedszkola i żłobki' };
    }

    return pathName;
};

export const nominatimURL = (city, postal, street, number = 'pl', format = 'json') => {
    const API = new URL('https://nominatim.openstreetmap.org/search');
    if (city) API.searchParams.append('city', city);
    if (postal) API.searchParams.append('postal', postal);
    if (street && number) {
        API.searchParams.append('street', `${number} ${street}`);
    } else if (street) {
        API.searchParams.append('street', street);
    }
    API.searchParams.append('format', format);
    // API.searchParams.append('country', country);

    return API.href;
};

export const getPrice = (price, currency = 'PLN') =>
    `${parseFloat(price || 0).toLocaleString('pl-PL', { style: 'currency', currency })}`;

export const isEmail = email => {
    // eslint-disable-next-line no-useless-escape
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
    );
};

const isFile = data => {
    return data.name && data.size && data.type && data.lastModified;
};

export const createFormData = (formData, key, data) => {
    if (isFile(data)) {
        formData.append(key, data);
    } else if (data === Object(data) || Array.isArray(data)) {
        // eslint-disable-next-line
        for (let i in data) {
            createFormData(formData, `${key}[${i}]`, data[i]);
        }
    } else if (data === false || data === true) {
        formData.append(key, !!data);
    } else {
        formData.append(key, data);
    }
};
