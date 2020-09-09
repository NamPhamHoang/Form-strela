import React, { useEffect, useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Button, FormCheck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/pro-regular-svg-icons';
import { faEye } from '@fortawesome/pro-light-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/pro-light-svg-icons';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { API_INVESTMENT_MAP_CATEGORIES_INDEX } from '../../api';
import Path from '../../components/Path/Path';
import LayoutCard from '../../components/Cards/LayoutCards/LayoutCard';
import { SETLOADING } from '../../actions';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const InvestmentsMapNew = () => {
    const [redirect, setRedirect] = useState(null);
    const [categories, setCategories] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(API_INVESTMENT_MAP_CATEGORIES_INDEX)
            .then(response => {
                setCategories(
                    response.data.categories.map(item => {
                        item.visible = true;
                        return item;
                    }),
                );
                dispatch({ type: SETLOADING, payload: false });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się pobrać kategorii inwestycji');
                setRedirect('/404');
            });
    }, [dispatch]);

    const toggleCategoryVisibility = id => {
        const newCategories = [...categories];
        const index = newCategories.findIndex(item => item.id === id);
        newCategories[index].visible = !newCategories[index].visible;
        setCategories(newCategories);
    };

    const toggleAll = visibility => () => {
        const newCategories = [...categories];
        newCategories.forEach(category => {
            category.visible = visibility;
        });
        setCategories(newCategories);
    };

    return (
        <>
            <Helmet>
                <title>Mapa inwestycji - Oficjalny Portal Gminy Jarocin</title>
                <meta name="description" content="Mapa inwestycji - sprawdź inwestycje w Gminie Jarocin!" />
            </Helmet>
            {redirect && <Redirect to={redirect} />}
            <Path
                items={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/mapa-inwestycji', label: 'Mapa inwestycji' },
                ]}
            />
            <LayoutCard className="investments-map">
                <Map center={[51.97266, 17.50256]} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {categories.map(({ visible, investments, marker }) => {
                        if (visible) {
                            const categoryIcon = new L.Icon({
                                iconUrl: marker,
                                iconRetinaUrl: marker,
                                iconAnchor: null,
                                popupAnchor: [0, 0],
                                iconSize: [31.2, 48],
                                shadowUrl: null,
                                shadowSize: null,
                                shadowAnchor: null,
                            });
                            return investments
                                .filter(({ lat, lon }) => {
                                    return lat && lon;
                                })
                                .map(({ lat, lon, id, url, text, img }) => {
                                    return (
                                        <Marker icon={categoryIcon} key={id} position={[lat, lon]}>
                                            <Popup className="investment-popup">
                                                <img
                                                    src={img}
                                                    className="img-fluid"
                                                    alt={`zdjęcie do obrazka numer - ${id}`}
                                                />
                                                <p>{text}</p>
                                                {url && <a href={url}>dowiedz się więcej</a>}
                                            </Popup>
                                        </Marker>
                                    );
                                });
                        }
                        return null;
                    })}
                </Map>
                <div className={`categories-manager ${menuVisible ? 'visible' : ''}`}>
                    <div className="button">
                        <Button
                            onClick={() => {
                                setMenuVisible(!menuVisible);
                            }}
                        >
                            <FontAwesomeIcon icon={faLayerGroup} />
                        </Button>
                    </div>
                    <div className="categories custom-scrollbar">
                        <div className="header-icons">
                            <Button title="Schowaj wszystkie" variant="link" onClick={() => toggleAll(false)}>
                                <FontAwesomeIcon icon={faEyeSlash} />
                            </Button>
                            <Button title="Pokaż wszystkie" variant="link" onClick={() => toggleAll(true)}>
                                <FontAwesomeIcon icon={faEye} />
                            </Button>
                        </div>
                        {categories.map(category => (
                            <div key={category.id} className="category">
                                <img
                                    src={category.marker}
                                    alt={`zdjęcie do obrazka nuemr - ${category.id}`}
                                    className="marker-thumb"
                                />
                                <FormCheck
                                    custom
                                    type="checkbox"
                                    name={`category-${category.id}`}
                                    id={`category-${category.id}`}
                                    label={category.name}
                                    onChange={() => toggleCategoryVisibility(category.id)}
                                    checked={category.visible}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </LayoutCard>
        </>
    );
};

export default InvestmentsMapNew;
