import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonWideIcon = ({ onClick, className: className1, icon, href, active, children, image }) => {
    const className = `${className1} ${active ? 'active' : ''} btn-wide-icon`;
    return (
        <Button className={className} onClick={onClick} href={href} variant={null}>
            {!!image && image}
            {icon && <FontAwesomeIcon icon={icon} className="icon" size="lg" />}
            <span className="text">{children}</span>
        </Button>
    );
};

ButtonWideIcon.propTypes = {
    icon: PropTypes.instanceOf(Object),
    className: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    image: PropTypes.element,
};

ButtonWideIcon.defaultProps = {
    className: '',
    href: null,
    onClick: null,
    icon: null,
    image: null,
};

export default ButtonWideIcon;
