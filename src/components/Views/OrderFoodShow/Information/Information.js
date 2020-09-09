import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock, faEnvelope, faMapMarkerAlt, faPhone, faWindow} from '@fortawesome/pro-light-svg-icons';
import CarouselWithCounter from '../../../CarouselWithCounter/CarouselWithCounter';
import AnimationWrapper from '../../InstitutionShow/AnimationWrapper';
import {Map, Marker, TileLayer} from 'react-leaflet';


const DataWithIcon = ({icon, children}) => (
    <div className="data-container">
        <div className="icon">
            <FontAwesomeIcon icon={icon} fixedWidth/>
        </div>
        <p>{children}</p>
    </div>
);

const Opened = ({day, time}) => (
    <span className="time-container">
        <span className="day">{day}</span>
        <span className="time">{time}</span>
    </span>
);

const Information = ({item, photos}) => {
    const hasPhotos = photos.length !== 0;
    return (
        <AnimationWrapper>
            <>
                <Row className="mt-3">
                    <Col xs={{span: 12, order: 2}} lg={{span: hasPhotos ? 5 : 12, order: 1}}>
                        <DataWithIcon icon={faMapMarkerAlt}>
                            {item.street} {item.number} <br/>
                            {item.postal} {item.city}
                        </DataWithIcon>
                        {item.phone && (
                            <DataWithIcon icon={faPhone}>
                                {item.phone}
                            </DataWithIcon>
                        )}
                        {item.email && (
                            <DataWithIcon icon={faEnvelope}>
                                {item.email}
                            </DataWithIcon>
                        )}
                        {item.website && (
                            <DataWithIcon icon={faWindow}>
                                {item.website}
                            </DataWithIcon>
                        )}
                        {item.opening_hours && (
                            <DataWithIcon icon={faClock}>
                                Zapraszamy:<br/>
                                <Opened day="poniedziałek" time={item.monday}/>
                                <Opened day="wtorek" time={item.tuesday}/>
                                <Opened day="środa" time={item.wednesday}/>
                                <Opened day="czwartek" time={item.thursday}/>
                                <Opened day="piątek" time={item.friday}/>
                                <Opened day="sobota" time={item.saturday}/>
                                <Opened day="niedziela" time={item.sunday}/>
                                <br/>
                                Minimalne zamówienie od 30,00 zł<br/>
                                Dostawa gratis. Czas oczekiwania 50 min.
                            </DataWithIcon>
                        )}
                    </Col>
                    {hasPhotos && (
                        <Col xs={{span: 12, order: 1}} lg={{span: 7, order: 2}}>
                            <CarouselWithCounter
                                photos={photos}
                                sliderAlt="todo"
                            />
                        </Col>
                    )}

                </Row>
                {(item.lat && item.long) && <Row>
                    <Col>
                        <Map center={[item.lat, item.long]} zoom={13}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            />
                            <Marker position={[item.lat, item.long]}/>
                        </Map>
                    </Col>
                </Row>}
            </>
        </AnimationWrapper>
    );
};

export default Information;