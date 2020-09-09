import React from 'react';
import Button from 'react-bootstrap/Button';

const ButtonPanelSubmit = ({ className, ...rest }) => {
    return (
        <Button type="submit" className={`panel-submit-button ${className}`} {...rest}>Zapisz dane</Button>
    );
};

ButtonPanelSubmit.defaultProps = {
    className: '',
};

export default ButtonPanelSubmit;