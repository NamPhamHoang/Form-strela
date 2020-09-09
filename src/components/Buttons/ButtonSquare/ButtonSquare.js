import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 60px;
    height: 60px;
    color: #ffffff;

    background-color: ${({ blue, red }) => (blue ? '#3dbbed' : red ? '#dc3545' : '#919191')};
    border-color: ${({ blue, red }) => (blue ? '#3dbbed' : red ? '#dc3545' : '#919191')};
`;

const ButtonSquare = ({ blue, red, ...props }) => {
    return (
        <StyledButton
            blue={blue}
            red={red}
            className={`${props.className} btn-square`}
            onClick={props.onClick}
            href={props.href}
            target={props.target ?? (props.href ? '_blank' : '')}
            variant={props.variant}
            {...props}
        >
            {props.children}
        </StyledButton>
    );
};

ButtonSquare.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    variant: PropTypes.string,
};

ButtonSquare.defaultProps = {
    className: '',
    href: null,
    onClick: null,
    variant: 'primary',
};

export default ButtonSquare;
