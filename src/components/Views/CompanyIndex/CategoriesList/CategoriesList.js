import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getImage } from '../../../../helpers';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';

const CategoriesList = ({ categories, activeCategory }) => {
    const [active, setActive] = useState(true);
    return <div className="categories-list">
        <Button
            variant="link"
            onClick={() => setActive(!active)}
            className={`categories-button ${active ? 'active' : ''}`}
        >
            <FontAwesomeIcon icon={faAngleDown} size="3x"/>
        </Button>
        <div className={`categories-container ${active ? 'active' : ''}`}>
            <div className="list">
                {categories.map(({ slug, icon, text }) => {
                    return (
                        <Link
                            onClick={() => setActive(false)}
                            to={`/baza-firm/${slug}`}
                            className={`item link-clear ${activeCategory === slug ? 'active' : ''}`}
                            key={slug}
                        >
                            <img src={getImage(icon)}
                                 alt={`Zdjęcie kategorii ${text}`}/> {text}
                        </Link>
                    );
                })}
            </div>
        </div>
    </div>;
};

export default CategoriesList;