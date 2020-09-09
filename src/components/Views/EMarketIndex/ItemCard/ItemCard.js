import React from 'react';
import { faStar as solid } from '@fortawesome/pro-solid-svg-icons';
import { faClock, faMapMarkerAlt, faStar as light } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import image from '../../../../img/image2.png';
import moment from 'moment';

const ItemCard = ({
                      id, thumbnailUrl, slug, price, title, location, created_at, fav, promotion, toggleFavorite,
                  }) => {
        const icon = fav ? solid : light;
        const alt = typeof thumbnailUrl === 'string' ? 'jest zdjęcie' : 'brak zdjęcia';
        const img = thumbnailUrl || image;

        return (
            <Col xs={12} sm={6} lg={4} xl={3} className="item-card-column">
                <Link
                    to={`/e-targ/${slug}`}
                    className="link-clear"
                >
                    <div className="item-card">
                        <div className="main-image">
                            <img src={img} alt={alt}/>
                        </div>
                        {promotion && <div className="promotion">Promowane</div>}
                        <div className="title-container">
                            <h5>{title}</h5>
                        </div>
                        <div className="price-and-favorite">
                            <h6 className="price">{price} zł</h6>
                            <button type="button" className="btn btn-link favorite" onClick={(e) => {
                                e.preventDefault();
                                toggleFavorite(id);
                            }}>
                                <FontAwesomeIcon icon={icon}/>
                            </button>
                        </div>

                        <div className="information">
                            <div>
                                <FontAwesomeIcon icon={faMapMarkerAlt}/> {location}
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faClock}/> {moment(created_at).format('DD.MM.YYYY')}
                            </div>
                        </div>
                    </div>
                </Link>
            </Col>
        );
    }
;


export default ItemCard;
