import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/pro-light-svg-icons';

const ButtonPrint = props => {
    return (
        <div className={props.className}>
            <Button
                className={`${props.className} btn-print`}
                onClick={() => window.print()}
                href={props.href}
                size="sm"
                variant="gray"
            >
                <FontAwesomeIcon icon={faPrint}/> Drukuj
            </Button>
        </div>

    );
};

ButtonPrint.defaultProps = {
    className: '',
};


export default ButtonPrint;