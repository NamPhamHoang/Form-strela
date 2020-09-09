import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getImage } from '../../../helpers';
import SmallDate from '../../../components/SmallDate/SmallDate';

export const NewsListItem = ({ img, slug, title, date, sneakPeek, categoryLink }) => (
    <div className="news-list-item">
        <div className="img-container">
            <img src={getImage(img)} alt={`Zdjęcie aktualności ${title}`} className="img-fluid" />
        </div>
        <div className="information">
            <h5>{title}</h5>
            <div className="date-and-category">
                <SmallDate date={moment(date).format('DD.MM.YYYY')} />
            </div>
            <p>{sneakPeek}</p>
            <div className="button">
                <Link to={`/${categoryLink}/${slug}`} className="btn btn-primary">
                    <strong>Dowiedz się</strong> więcej
                </Link>
            </div>
        </div>
    </div>
);
NewsListItem.propTypes = {
    img: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    sneakPeek: PropTypes.string.isRequired,
    categoryLink: PropTypes.string,
};

NewsListItem.defaultProps = {
    categoryLink: 'aktualnosci',
};
