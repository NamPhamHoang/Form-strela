import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SmallDate from '../../SmallDate/SmallDate';

const NewsListItem = ({ img, alt, title, date, to }) => {
    return (
        <div className="news-list-item">
            <div className="img-container">
                <img src={img} alt={alt} className="img-fluid"/>
            </div>
            <div className="information">
                <h5>{title}</h5>
                <SmallDate date={date}/>
                <div className="button">
                    <Link
                        to={to}
                        className="btn btn-primary btn-sm px-3"
                    >
                        <strong>Dowiedz się</strong> więcej
                    </Link>
                </div>

            </div>
        </div>
    );
};

NewsListItem.propTypes = {
    alt: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default NewsListItem;

