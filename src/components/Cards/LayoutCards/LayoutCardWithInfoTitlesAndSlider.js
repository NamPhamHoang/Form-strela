import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFilePdf, faMapMarkerAlt, faPhone, faWindow } from '@fortawesome/pro-light-svg-icons';
import Color from 'color';
import LayoutCardWithTitleAndPath from '../../../templates/LayoutCardWithTitleAndPath';
import Card from '../Card';
import { getImage } from '../../../helpers';

const getGradient = color => {
    const start = new Color(color).lighten(0.2).hex();
    const end = new Color(color).darken(0.2).hex();

    return `linear-gradient(to right, ${start}, ${end})`;
};

const LButton = ({ website, color, target }) => {
    if (color) {
        return (
            <a
                href={website}
                className="btn btn-sm"
                style={{
                    background: getGradient(color),
                    border: 'none',
                }}
                target={target}
            >
                <strong>Przejdź</strong> do strony
            </a>
        );
    }
    return (
        <a href={website} className="btn btn-primary btn-sm" target={target}>
            <strong>Przejdź</strong> do strony
        </a>
    );
};

LButton.defaultProps = {
    target: '_self',
};

const LCarousel = ({ color, photos, sliderAlt }) => {
    const mappedPhotos = photos.map((photo, index) => {
        return (
            <Carousel.Item key={photo}>
                <div className="photo-container" style={{ backgroundImage: `url(${photo.url})` }}>
                    <img src={photo.url} alt={`${sliderAlt} ${index + 1}`} />
                </div>
            </Carousel.Item>
        );
    });
    const alternative = color ? (
        <Carousel.Item>
            <div className="photo-container" style={{ background: getGradient(color) }} />
        </Carousel.Item>
    ) : (
        <Carousel.Item>
            <div
                className="photo-container"
                style={{ background: window.getComputedStyle(document.documentElement).getPropertyValue('--primary') }}
            />
        </Carousel.Item>
    );
    const carouselItems = Array.isArray(photos) && photos.length !== 0 ? mappedPhotos : alternative;
    return (
        <div className="carousel-parent">
            <Carousel controls={false}>{carouselItems}</Carousel>
        </div>
    );
};

const LayoutCardWithInfoTitlesAndSlider = ({
    item,
    file,
    fileLabel,
    category,
    photos,
    sliderAlt,
    pathItems,
    color,
    address,
    children,
}) => {
    const style = color ? { '--theme-color': color } : {};
    return (
        <LayoutCardWithTitleAndPath
            pathItems={pathItems}
            category={category}
            title={item.name}
            className="layout-card-with-info-titles-and-slider"
        >
            <Row>
                <Col>
                    <LCarousel color={color} photos={photos} sliderAlt={sliderAlt} />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col lg={4} xl={3}>
                    <Card className="info-card">
                        <div className="logo">
                            <img
                                src={getImage(item.logo)}
                                style={{ maxHeight: item.logo ? null : 50 }}
                                alt={`Logo spółki ${item.name}`}
                                className="img-fluid"
                            />
                        </div>
                        <h6 className="name">{item.name}</h6>
                        <ListGroup className="icon-list">
                            <ListGroup.Item>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth />
                                </div>
                                <div className="content">{address}</div>
                            </ListGroup.Item>
                            {item.phone && (
                                <ListGroup.Item>
                                    <div className="icon">
                                        <FontAwesomeIcon icon={faPhone} fixedWidth />
                                    </div>
                                    <div className="content">{item.phone}</div>
                                </ListGroup.Item>
                            )}
                            {item.email && (
                                <ListGroup.Item>
                                    <div className="icon">
                                        <FontAwesomeIcon icon={faEnvelope} fixedWidth />
                                    </div>
                                    <div className="content">{item.email}</div>
                                </ListGroup.Item>
                            )}
                            {item.website && (
                                <ListGroup.Item>
                                    <div className="icon">
                                        <FontAwesomeIcon icon={faWindow} fixedWidth />
                                    </div>
                                    <div className="content">{item.website.replace(/(^\w+:|^)\/\//, '')}</div>
                                </ListGroup.Item>
                            )}
                            {file && (
                                <ListGroup.Item>
                                    <div className="icon">
                                        <FontAwesomeIcon icon={faFilePdf} fixedWidth />
                                    </div>
                                    <div className="content">
                                        <a href={file} className="link-primary text-uppercase">
                                            {fileLabel}
                                        </a>
                                    </div>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        <LButton website={item.website} color={color} target="_blank" />
                    </Card>
                </Col>
                <Col lg={8} xl={9} className="main-content" style={style}>
                    {children}
                </Col>
            </Row>
        </LayoutCardWithTitleAndPath>
    );
};

export default LayoutCardWithInfoTitlesAndSlider;
