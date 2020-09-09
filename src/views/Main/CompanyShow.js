import React, { useCallback, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEnvelope, faMapMarkerAlt, faPhone, faWindow } from '@fortawesome/pro-light-svg-icons';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import Path from '../../components/Path/Path';
import LayoutCard from '../../components/Cards/LayoutCards/LayoutCard';
import Title from '../../components/Titles/Title/Title';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import CarouselWithCounter from '../../components/CarouselWithCounter/CarouselWithCounter';
import NavigationArrows from '../../components/NavigationArrows/NavigationArrows';
import { API_COMPANIES_SHOW } from '../../api';
import { nominatimURL } from '../../helpers';
import { SETLOADING } from '../../actions';

const DataWithIcon = ({ icon, children }) => (
    <div className="data-container">
        <div className="icon">
            <FontAwesomeIcon icon={icon} fixedWidth />
        </div>
        <p>{children}</p>
    </div>
);

const Opened = ({ day, time }) => (
    <span className="time-container">
        <span className="day">{day}</span>
        <span className="time">{time}</span>
    </span>
);

const CompanyShowNew = ({ match }) => {
    const [redirect, setRedirect] = useState(null);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);
    const [company, setCompany] = useState({});
    const [category, setCategory] = useState({});
    const [photos, setPhotos] = useState([]);

    const [isPreview, setIsPreview] = useState(false);
    const dispatch = useDispatch();

    const fetchCompanyCallback = useCallback(() => {
        if (match.params.slug) {
            const { slug } = match.params;
            const API = API_COMPANIES_SHOW(slug);

            axios
                .get(API)
                .then(response => {
                    console.log(response.data);
                    setPrev(response.data.prev);
                    setNext(response.data.next);
                    setCompany(response.data.company);
                    setPhotos(response.data.photos);
                    setCategory(response.data.category);

                    dispatch({ type: SETLOADING, payload: false });
                })
                .catch(error => {
                    if (error.response) {
                        setRedirect(`/${error.response.status || 404}`);
                    }
                });
        } else {
            const params = new URL(window.location).searchParams;
            const newCompany = JSON.parse(params.get('data'));
            // company.slug = 'preview';

            setCompany(newCompany);
            setPhotos(newCompany.photos);

            const nominatimAPI = nominatimURL(newCompany.city, newCompany.postal, newCompany.street, newCompany.number);
            axios.get(nominatimAPI).then(response => {
                const { data } = response;
                if (data.length > 0) {
                    newCompany.lat = data[0].lat;
                    newCompany.long = data[0].lon;
                    setCompany(newCompany);
                }
                dispatch({ type: SETLOADING, payload: false });
            });
        }
    }, [dispatch, match]);
    useEffect(() => {
        setIsPreview(!match.params.slug);
        fetchCompanyCallback();
    }, [match, fetchCompanyCallback]);
    return (
        <>
            {redirect && <Redirect to={redirect} />}
            <Path
                items={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/baza-firm', label: 'Baza firm' },
                    { url: `/baza-firm/${category.slug}`, label: category.name || 'Nazwa kategorii' },
                    { url: `/baza-firm/firma/${match.params.slug}`, label: company.name },
                ]}
            />
            <LayoutCard className="company-show">
                {!isPreview && (
                    <NavigationArrows
                        prev={{
                            link: `/baza-firm/firma/${prev}`,
                            label: 'Poprzednia firma',
                            disabled: !prev,
                        }}
                        next={{
                            link: `/baza-firm/firma/${next}`,
                            label: 'Następna firma',
                            disabled: !next,
                        }}
                    />
                )}
                <Row>
                    <Col>
                        <SectionTitle>Baza firm</SectionTitle>
                        <Title>{company.name}</Title>
                    </Col>
                    {company.logo && (
                        <Col md="auto">
                            <img src={company.logo} alt={`Logo firmy ${company.name}`} className="logo" />
                        </Col>
                    )}
                </Row>
                <Row className="mt-3">
                    <Col xs={{ span: 12, order: 2 }} lg={{ span: photos.length !== 0 ? 5 : 12, order: 1 }}>
                        <DataWithIcon icon={faMapMarkerAlt}>
                            {company.street} {company.number} <br />
                            {company.postal} {company.city}
                        </DataWithIcon>
                        {company.phone && <DataWithIcon icon={faPhone}>{company.phone}</DataWithIcon>}
                        {company.email && <DataWithIcon icon={faEnvelope}>{company.email}</DataWithIcon>}
                        {company.website && <DataWithIcon icon={faWindow}>{company.website}</DataWithIcon>}
                        {company.opening_hours && (
                            <DataWithIcon icon={faClock}>
                                Zapraszamy:
                                <br />
                                <Opened day="poniedziałek" time={company.monday} />
                                <Opened day="wtorek" time={company.tuesday} />
                                <Opened day="środa" time={company.wednesday} />
                                <Opened day="czwartek" time={company.thursday} />
                                <Opened day="piątek" time={company.friday} />
                                <Opened day="sobota" time={company.saturday} />
                                <Opened day="niedziela" time={company.sunday} />
                            </DataWithIcon>
                        )}
                    </Col>
                    {photos.length !== 0 && (
                        <Col xs={{ span: 12, order: 1 }} lg={{ span: 7, order: 2 }}>
                            <CarouselWithCounter photos={photos} sliderAlt="todo" />
                        </Col>
                    )}
                </Row>
                <Row>
                    <Col>
                        <p className="text-justify my-3">{company.description}</p>
                    </Col>
                </Row>
                {company.lat && company.long && (
                    <Row>
                        <Col>
                            <Map center={[company.lat, company.long]} zoom={13}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[company.lat, company.long]} />
                            </Map>
                        </Col>
                    </Row>
                )}
            </LayoutCard>
        </>
    );
};

export default CompanyShowNew;

/*
*
* redirect={redirect}
                loading={loading}
                key={this.props.match.params.slug}
                title={company.seo_title}
                description={company.seo_description}
                keywords="todo"
* */
