import React from 'react';
import ConsultantCard from '../../../Cards/ConsultantCard/ConsultantCard';
import image from '../../../../img/wide-button-1.png';

const StatusWaitingForCard = props => {
    return (
        <div className="d-flex align-items-end waiting-for-card">
            <div>
                <h6>STATUS: W przygotowaniu</h6>
                <p>
                    Twoja Karta mieszkań jest przygotowywana w Urzędzie - gdy będzie możliwość jej odbioru status u góry
                    zmienia się na: GOTOWA DO ODBIORU.
                </p>
                <p>
                    Masz pytania?<br/>
                    Z chęcią na nie odpowiemy!
                </p>
                <ConsultantCard
                    img={image}
                    className="card"
                    alt="Obsługa klienta"
                    phone="(62) 123 12 12"
                    position="Obsługa klienta"
                    name="Katarzyna Kowalska-Nowak"
                />
            </div>
        </div>
    );
};

export default StatusWaitingForCard;