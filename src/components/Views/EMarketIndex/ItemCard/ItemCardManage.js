import React from 'react';
import PropTypes from 'prop-types';
import { faClock, faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import image from '../../../../img/image2.png';
import Button from 'react-bootstrap/Button';

const ItemCardManage = ({ id, src, price, title, city, date, promotion, toExpire, slug, extend, display, handleExtension, handleAttempt, displayDeleteModal, handleEdit }) => {
    const alt = typeof src === 'string' ? 'jest zdjęcie' : 'brak zdjęcia';
    const img = src || image;
    
    return (
        <Col xs={12} sm={6} lg={4} xl={3} className="item-card-column">
            <div className="h-75">
                <Link to={`/e-targ/${slug}`} className="link-clear">
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
                        </div>
                        <div className="information">
                            <div>
                                <FontAwesomeIcon icon={faMapMarkerAlt}/> {city}
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faClock}/> {date}
                            </div>
                        </div>

                    </div>
                </Link>
            </div>
            <div className="rest-container">
                <div className="buttons">
                    <Button variant="primary" onClick={() => handleEdit(id)}>Edytuj</Button>
                    {/* <Button variant="primary-darken">Promuj</Button> */}
                    {!display && (
                        <Button variant="primary-darkest" onClick={() => handleAttempt(id)}>Ponów</Button>
                    )}
                    {extend && (
                        <Button variant="success" onClick={() => handleExtension(id)}>Przedłuż</Button>
                    )}
                    {!!(!extend && display) && (
                        <Button variant="primary-darken" onClick={() => displayDeleteModal(id, title)}>Zakończ</Button>
                    )}
                </div>
                <p className="till-end">Do końca wyświetlania: {toExpire} dni</p>
            </div>
        </Col>
    );
};

ItemCardManage.propTypes = {
    src: PropTypes.oneOfType([
        PropTypes.string,
    ]),
    city: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    favorite: PropTypes.bool,
    price: PropTypes.string.isRequired,
    promotion: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};

ItemCardManage.defaultProps = {
    src: null,
    favorite: false,
};

export default ItemCardManage;
