import React from 'react';
import Button from 'react-bootstrap/Button';

const StatusNoCard = props => {
    return (
        <div className="d-flex align-items-center justify-content-center h-100">
            <div>
                <Button size="sm" onClick={props.requestCard}>
                    Proszę o wersję drukowaną
                </Button>
            </div>
        </div>
    );
};

export default StatusNoCard;