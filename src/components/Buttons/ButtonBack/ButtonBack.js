import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons/faArrowLeft';
import { withRouter } from 'react-router-dom';

const ButtonBack = props => {
    return (
        <button className="btn btn-sm btn-back" type="button" onClick={() => props.history.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
        </button>
    );
};

export default withRouter(ButtonBack);