import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = ({
    value,
    disabled,
    multiple,
    type,
    readOnly,
    name,
    id,
    label,
    min,
    max,
    size,
    error,
    onChange,
    variant,
    floating,
    textarea,
    rows,
    groupClass,
    inputClass,
    children,
    select,
    icon,
    step,
}) => {
    let input = inputClass;
    let group = groupClass;
    const [labelActive, setLabelActive] = useState(false);
    switch (variant) {
        case 'shadow':
            input += ' form-control-shadow';
            break;
        case 'outline-primary':
            input += ' form-control-outline-primary';
            group += ' outline-primary';
            break;
        case 'outline-secondary':
            input += ' form-control-outline-secondary';
            group += ' outline-secondary';
            break;
        default:
            input += ' form-control';
    }
    if (floating) {
        group += ' floating-label';
        if (size) group += ` floating-label-${size}`;
        if (type === 'date') group += ' date';
    }

    const isInvalid = !!error;

    const attributes = {
        className: input,
        size,
        id: id || name,
        name,
        onChange,
        isInvalid,
        disabled,
        readOnly,
        value,
        onBlur: () => {
            if (value === '') {
                setLabelActive(false);
            }
        },
        onFocus: () => {
            setLabelActive(true);
        },
    };
    if (select) {
        attributes.as = 'select';
        attributes.multiple = multiple;
    } else if (textarea) {
        attributes.as = 'textarea';
        attributes.type = undefined;
        attributes.rows = rows || '3';
    } else {
        attributes.type = type;
    }

    if (['date', 'number', 'range'].includes(attributes.type)) {
        if (min) attributes.min = min;
        if (max) attributes.max = max;
        if (step) attributes.step = step;
    }

    const labelClassName = `${labelActive || (value !== '' && attributes.type !== 'date') ? 'active' : ''} ${
        select ? 'select' : ''
    }`;

    useEffect(() => {
        setLabelActive(!!value);
    }, [value]);

    const formControl = <FormControl {...attributes}>{children}</FormControl>;
    return (
        <FormGroup className={group}>
            {floating && icon && <FontAwesomeIcon icon={icon} fixedWidth />}
            {label && (
                <FormLabel htmlFor={name} className={labelClassName}>
                    {label}
                </FormLabel>
            )}
            {formControl}
            {isInvalid && <FormControl.Feedback type="invalid">{error[0]}</FormControl.Feedback>}
        </FormGroup>
    );
};

Input.defaultProps = {
    floating: false,
    variant: null,
    groupClass: '',
    inputClass: '',
    size: null,
    type: 'text',
    label: '',
    value: '',
    multiple: false,
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string]),
    multiple: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    floating: PropTypes.bool,
    groupClass: PropTypes.string,
    inputClass: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    type: PropTypes.oneOf(['text', 'password', 'email', 'date', 'number']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    variant: PropTypes.oneOf(['shadow', 'outline-primary', 'outline-secondary']),
};

export default Input;
