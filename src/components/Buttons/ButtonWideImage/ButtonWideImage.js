import React from 'react';
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';

const ButtonWideImage = props => {
    return (
        <Button
            className={`${props.className} btn-wide-image`}
            onClick={props.onClick}
            href={props.href}
            variant={props.variant}
        >
            <img src={props.image} alt={props.alt}/>
            {props.children}
        </Button>
    );
};

ButtonWideImage.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    variant: PropTypes.string,
};

ButtonWideImage.defaultProps = {
    className: '',
    href: null,
    onClick: null,
    variant: 'primary',
};

export default ButtonWideImage;