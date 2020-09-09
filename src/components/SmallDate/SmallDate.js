import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/pro-light-svg-icons';

const SmallDate = ({ date, className }) => {
    return (
        <p className={`simple-small-date ${className}`}>
            <FontAwesomeIcon icon={faCalendar} className={'mr-1'}/> {date}
        </p>
    );
};

SmallDate.propTypes = {
    date: PropTypes.string.isRequired,
    className: PropTypes.string,
};

SmallDate.defaultProps = {
    className: '',
};

export default SmallDate;