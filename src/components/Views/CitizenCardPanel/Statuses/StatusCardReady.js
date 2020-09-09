import React from 'react';
import ConsultantCard from '../../../Cards/ConsultantCard/ConsultantCard';
import Button from 'react-bootstrap/Button';
import image from '../../../../img/wide-button-1.png';

const StatusCardReady = props => {
    return (
        <div className="d-flex align-items-end card-ready">
            <div>
                <h6>STATUS: <span className="text-success">Gotowa do odbioru</span></h6>
                <p>
                    Twoja karta jest gotowa do odbioru w Urzędzie Miasta
                </p>
                <p>
                    Masz pytania?<br/>
                    Z chęcią na nie odpowiemy!
                </p>
                <ConsultantCard
                    img={image}
                    alt="Obsługa klienta"
                    phone="(62) 123 12 12"
                    position="Obsługa klienta"
                    name="Katarzyna Kowalska-Nowak"
                    className="card"
                />
                <Button size="sm" className="mt-4" onClick={props.revokeCard}>Zgubiłem/am kartę - proszę o nową</Button>
            </div>
        </div>

    );
};

export default StatusCardReady;