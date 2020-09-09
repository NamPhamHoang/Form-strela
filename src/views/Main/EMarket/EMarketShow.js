import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCoins, faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import axios from 'axios';
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Path from '../../../components/Path/Path';
import LayoutCard from '../../../components/Cards/LayoutCards/LayoutCard';
import Title from '../../../components/Titles/Title/Title';
import SectionTitle from '../../../components/Titles/SectionTitle/SectionTitle';
import ItemInfo from '../../../components/Views/EMarketShow/ItemInfo/ItemInfo';
import UserCard from '../../../components/Views/EMarketShow/UserCard/UserCard';
import OtherItems from '../../../components/Views/EMarketShow/OtherItems/OtherItems';
import CarouselWithCounter from '../../../components/CarouselWithCounter/CarouselWithCounter';
import NavigationArrows from '../../../components/NavigationArrows/NavigationArrows';
import { API_EMARKET_PANEL_FAV_TOGGLE, API_EMARKET_SEND_MAIL, API_EMARKET_SHOW } from '../../../api';
import { changeHelper } from '../../../helpers';
import Input from '../../../components/Input/Input';

const LInput = props => {
    return <Input {...props} variant="shadow" size="lg" floating />;
};

class EMarketShow extends Component {
    state = {
        ad: {
            phone: '',
            ads: [],
        },
        emailModal: {
            data: {
                email: '',
                text: '',
            },
            errors: {},
            show: false,
        },
        redirect: null,
        loading: true,
    };

    isPreview = !this.props.match.params.slug;

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, redirect } = this.state;
        if (redirect) return;
        const { slug: oldSlug } = prevState.ad;
        const { slug } = this.props.match.params;

        if (!loading && slug && oldSlug && slug !== oldSlug) {
            this.resetData();
            return;
        }

        if (loading) {
            this.fetchData();
        }
    }

    resetData = () => {
        this.setState({
            // ad: {},
            loading: true,
        });
    };

    fetchData = () => {
        document.querySelector('html').scrollTop = 0;
        if (!this.isPreview) {
            const { slug } = this.props.match.params;
            const { token } = this.props;
            const config = {
                headers: {},
            };
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            const API = API_EMARKET_SHOW(slug);

            axios
                .get(API, config)
                .then(response => {
                    const { ad } = response.data;
                    this.setState({
                        ad,
                        loading: false,
                    });
                })
                .catch(error => {
                    if (error.response) {
                        this.setState({
                            redirect: `/${error.response.status || 404}`,
                        });
                    }
                });
        } else {
            const params = new URL(window.location).searchParams;
            const ad = JSON.parse(params.get('data'));
            ad.slug = 'preview';
            this.setState({
                ad,
                loading: false,
            });
        }
    };

    changeEmailModalData = e => {
        const [name, value] = changeHelper(e);
        this.setState(state => {
            const emailModal = { ...state.emailModal };
            emailModal.data[name] = value;
            return { emailModal };
        });
    };

    sendEmail = () => {
        if (this.isPreview) {
            NotificationManager.error('Nie możesz wysłać wiadomości w podglądzie');
            return;
        }
        const { data } = this.state.emailModal;
        const { id } = this.state.ad;
        const API = API_EMARKET_SEND_MAIL(id);
        axios
            .post(API, data)
            .then(() => {
                NotificationManager.success('Pomyślnie wysłano wiadomość');
                this.setState({
                    emailModal: {
                        data: {
                            email: '',
                            text: '',
                        },
                        errors: {},
                        show: false,
                    },
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się wysłać wiadomości');
            });
    };

    changeEmailModalShow = bool => {
        this.setState(state => {
            const emailModal = { ...state.emailModal };
            emailModal.show = bool;
            return { emailModal };
        });
    };

    showEmailModal = () => this.changeEmailModalShow(true);

    hideEmailModal = () => this.changeEmailModalShow(false);

    // eslint-disable-next-line consistent-return
    toggleFavorite = () => {
        const { token } = this.props;
        if (!token) {
            NotificationManager.error('Musisz być zalogowanym by dodać do ulubionych');
            return null;
        }

        const fd = {
            // eslint-disable-next-line camelcase
            ad_id: this.state.ad.id,
        };

        axios
            .post(API_EMARKET_PANEL_FAV_TOGGLE, fd, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                this.setState(state => {
                    const ad = { ...state.ad };
                    ad.fav = response.data.fav;
                    return { ad };
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się dodać do ulubionych');
            });
    };

    render() {
        const { ad, redirect, emailModal } = this.state;
        let price = '';
        if (ad.fields) {
            const item = ad.fields.find(({ name }) => name === 'cena');
            if (item) price = item.value;
        }
        return (
            <>
                {redirect && <Redirect to={redirect} />}
                <Path
                    items={[
                        { url: '/', label: 'Strona główna' },
                        { url: '/e-targ', label: 'eTarg' },
                        {
                            url: this.isPreview ? '/e-targ' : `/e-targ/${this.props.match.params.slug}`,
                            label: ad.title,
                        },
                    ]}
                />
                <LayoutCard className="e-market-show">
                    <NavigationArrows
                        prev={{
                            link: `/e-targ/${ad.previous_slug}`,
                            label: 'Poprzednie ogłoszenie',
                            disabled: !ad.previous_slug,
                        }}
                        next={{
                            link: `/e-targ/${ad.next_slug}`,
                            label: 'Następne ogłoszenie',
                            disabled: !ad.next_slug,
                        }}
                    />
                    <Row>
                        <Col>
                            <SectionTitle>eTarg</SectionTitle>
                        </Col>
                    </Row>
                    <Row className="gutters-md">
                        <Col xs={12} lg={8} className="description">
                            <Title>{ad.title}</Title>
                            <div className="information">
                                <div>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {ad.location}
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faClock} /> {moment(ad.created_at).format('DD.MM.YYYY')}
                                </div>
                            </div>
                            <h5 className="price">
                                <FontAwesomeIcon icon={faCoins} /> {price} zł
                            </h5>
                            {ad.photos && ad.photos.length !== 0 && (
                                <CarouselWithCounter
                                    photos={ad.photos.map(photo => ({
                                        id: photo.id,
                                        url: photo.photoUrl,
                                    }))}
                                    sliderAlt="todo"
                                />
                            )}
                            {this.isPreview && (
                                <p className="text-muted text-center my-6">Zdjęcia są niedostępne w podglądzie</p>
                            )}
                            <Row className="mt-3">
                                {ad.fields &&
                                    ad.fields.map(item => {
                                        if (item.name === 'cena') return false;
                                        return (
                                            <ItemInfo
                                                key={`${item.name}-${item.value}`}
                                                title={item.name}
                                                value={item.value}
                                            />
                                        );
                                    })}
                            </Row>
                            <p
                                className="text"
                                dangerouslySetInnerHTML={{
                                    __html: ad.description,
                                }}
                            />
                        </Col>
                        <Col xs={12} lg={4}>
                            {ad.name && (
                                <UserCard
                                    userId={ad.user_id}
                                    name={ad.name}
                                    phone={ad.phone}
                                    favorite={ad.fav}
                                    img={ad.avatar || null}
                                    showEmailModal={this.showEmailModal}
                                    isPreview={this.isPreview}
                                    toggleFavorite={this.toggleFavorite}
                                />
                            )}

                            {!this.isPreview && <OtherItems items={ad.ads} />}
                        </Col>
                    </Row>
                </LayoutCard>
                <Modal show={emailModal.show} onHide={this.hideEmailModal} centered size="lg">
                    <Modal.Header>Wysyłanie wiadomości</Modal.Header>
                    <Modal.Body>
                        <LInput
                            name="email"
                            label="Adres e-mail"
                            value={emailModal.data.email}
                            error={emailModal.errors.email}
                            onChange={this.changeEmailModalData}
                        />
                        <LInput
                            name="text"
                            textarea
                            label="Treść wiadomości"
                            value={emailModal.data.text}
                            error={emailModal.errors.text}
                            onChange={this.changeEmailModalData}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" size="sm" onClick={this.hideEmailModal}>
                            Zamknij
                        </Button>
                        <Button variant="primary" size="sm" onClick={this.sendEmail}>
                            Wyślij
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps)(EMarketShow);

/*
* key={this.props.match.params.slug}
                redirect={redirect}
                loading={loading} */
