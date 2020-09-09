import React from 'react';
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import {faFacebookF, faGooglePlusG, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ButtonSocial = props => {
    let icon; let text;
    switch (props.variant) {
        case 'tw':
            text = 'Twitter';
            icon = faTwitter;
            break;
        case 'gplus':
            text = 'Google+';
            icon = faGooglePlusG;
            break;
        case 'fb':
            text = 'Facebook';
            icon = faFacebookF;
            break;
        default:
            throw new Error('Variant can be only one of these: tw, gplus, fb');
    }
    return (
        <Button
            className={`${props.className} btn-social btn-social-${props.variant}`}
            onClick={props.onClick}
            href={props.href}
            size={props.size}
        >
            {props.pillValue !== 0 && <span className="pill">{props.pillValue}</span>}
            <FontAwesomeIcon icon={icon} /> {text}
        </Button>
    );
};

ButtonSocial.propTypes = {
    variant: PropTypes.oneOf(['fb', 'tw', 'gplus']).isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.string,
    href: PropTypes.string,
    pillValue: PropTypes.number,
};

ButtonSocial.defaultProps = {
    className: '',
    href: null,
    size: 'sm',
    onClick: null,
    pillValue: 0,
};

export default ButtonSocial;