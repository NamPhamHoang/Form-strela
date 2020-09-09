import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import qrCode from '../../img/qrcode.png';
import cardFront from '../../img/karta-przod.png';
import cardBack from '../../img/karta-tyl.png';
import image from '../../img/image.png';
import StatusNoCard from '../../components/Views/CitizenCardPanel/Statuses/StatusNoCard';
import StatusWaitingForCard from '../../components/Views/CitizenCardPanel/Statuses/StatusWaitingForCard';
import StatusCardReady from '../../components/Views/CitizenCardPanel/Statuses/StatusCardReady';
import BackgroundSquare from '../../components/BackgroundSquare/BackgroundSquare';
import { API_USER_CARD_GET, API_USER_CARD_REQUEST, API_USER_CARD_REVOKE } from '../../api';
import Loading from '../../components/Loading/Loading';

class CitizenCardPanel extends Component {
    state = {
        card: {
            plasticCard: false,
        },
        loading: true,
        cardLoading: false,
        redirect: null,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios
            .get(API_USER_CARD_GET)
            .then(response => {
                const { card } = response.data;
                this.setState({
                    card: card || {},
                    loading: false,
                    cardLoading: false,
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
            });
    };

    setCardLoadingTrue = callback => {
        this.setState(
            {
                cardLoading: true,
            },
            callback,
        );
    };

    revokeCard = () => {
        this.setCardLoadingTrue(() => {
            axios
                .post(API_USER_CARD_REVOKE)
                .then(() => {
                    NotificationManager.success('Pomyślnie zgłoszono zgubienie karty');
                    this.fetchData();
                })
                .catch(() => {
                    NotificationManager.error(
                        'Nie udało się zgłosić zgubienia. Spróbuj ponownie lub skontaktuj się z administratorem.',
                    );
                });
        });
    };

    requestCard = () => {
        this.setCardLoadingTrue(() => {
            axios
                .post(API_USER_CARD_REQUEST)
                .then(() => {
                    NotificationManager.success('Pomyślnie poproszono o wydanie drukowanej karty');
                    this.fetchData();
                })
                .catch(() => {
                    NotificationManager.error(
                        'Nie udało się wydać drukowanej karty. Spróbuj ponownie lub skontaktuj się z administratorem.',
                    );
                });
        });
    };

    render() {
        const { card, loading, redirect, cardLoading } = this.state;
        return (
            <PanelTemplate loading={loading} redirect={redirect} className="citizen-card-panel">
                <img src={image} alt="todo" className="floating-image" />
                <BackgroundSquare />
                <SectionTitle>Karta mieszkańca</SectionTitle>
                <div className="content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dicta dolore eos excepturi
                        ipsam laboriosam laudantium non provident quas quia quod recusandae similique, sit. Consectetur
                        fuga id iure nulla odio. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam
                        asperiores, at commodi debitis dignissimos doloremque est eum eveniet, excepturi harum inventore
                        magni maxime molestiae odio omnis quia ullam voluptates. Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Commodi cupiditate dicta rerum? Aliquid, consequatur cupiditate enim esse
                        excepturi illum, impedit in itaque praesentium rem, repellat saepe sed sit suscipit totam.
                    </p>
                    <Row>
                        <Col xs={12} xl={7} className="card-container">
                            <div>
                                <img src={cardFront} alt="Przód karty mieszkańca" className="img-fluid" />
                            </div>
                            <div className="card-back">
                                <p className="identity">
                                    {card.name} {card.surname}
                                    <br />
                                    Numer karty: {card.number}
                                </p>
                                <img src={qrCode} alt="Kod QR karty mieszkańca" className="qr-code" />
                                <img src={cardBack} alt="Tył karty mieszkańca" className="img-fluid card-image" />
                            </div>
                        </Col>
                        <Col xs={12} xl={5} className="statuses">
                            {cardLoading && <Loading />}
                            {card.plasticCard === 0 && <StatusNoCard requestCard={this.requestCard} />}
                            {card.plasticCard === 0 && <StatusNoCard requestCard={this.requestCard} />}
                            {card.status === 'KARTA W PRZYGOTOWANIU' && <StatusWaitingForCard />}
                            {card.status === 'KARTA GOTOWA DO ODBIORU' && (
                                <StatusCardReady revokeCard={this.revokeCard} />
                            )}
                        </Col>
                    </Row>
                </div>
            </PanelTemplate>
        );
    }
}

export default CitizenCardPanel;
