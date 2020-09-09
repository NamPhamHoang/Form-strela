import React from 'react';
import { Link } from 'react-router-dom';
import SmallDate from '../SmallDate/SmallDate';

const NewsItem = ({ date, title, img, to, alt }) => (
    <Link to={to} className="item link-clear">
        <div className="photo-container" style={{ backgroundImage: `url(${img})` }}>
            <img src={img} alt={alt}/>
        </div>
        <div className="content">
            <SmallDate date={date}/>
            <h6>{title}</h6>
        </div>
    </Link>
);

export default NewsItem;