import React from 'react';

const ValidationError = ({ error }) => {
    return <>
        {error !== undefined && (
            <div className="d-block invalid-feedback my-3">{error[0]}</div>
        )}
    </>;
};

export default ValidationError;