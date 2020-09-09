import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import MainFooter from '../components/Main/Footer/Footer';
import BasketIndicator from '../components/BasketIndicator/BasketIndicator';
import { checkIfDataExpired } from '../helpers';
import { fetchMenuAction } from '../actions';
import MainPage from '../views/Main/MainPage';
import requireGuest from '../middlewares/require_guest';
import Login from '../views/Main/Auth/Login';
import Register from '../views/Main/Auth/Register';
import BuyTicket from '../views/Main/BuyTicket';
import { EventTickets } from '../views/Main/Tickets/Events/EventTickets';
import { Ticket as ParkingTickets } from '../views/Main/Tickets/Parking/Ticket';
import { BuyTicketCheckout } from '../views/Main/Tickets/Events/BuyTicketCheckout';
import { EventThanks } from '../views/Main/Tickets/Events/EventThanks';
import { ParkingThanks } from '../views/Main/Tickets/Parking/ParkingThanks';
import { BuyTicketCheckout as ParkingBuyTicketCheckout } from '../views/Main/Tickets/Parking/BuyTicketCheckout';
import { Ticket } from '../views/Main/Tickets/Events/Ticket';
import { Ticket as BusTicket } from '../views/Main/Tickets/Bus/Ticket';
import { BusBuyTicketCheckout } from '../views/Main/Tickets/Bus/BuyTicketCheckout';
import { BusThanks } from '../views/Main/Tickets/Bus/BusThanks';
import CitizenCard from '../views/Main/CitizenCard';
import CitizenZone from '../views/Main/CitizenZone';
import EventsIndex from '../views/Main/EventsIndex';
import EventsShow from '../views/Main/EventsShow';
import { Search as NewSearch } from '../views/Main/Search/Search';
import CameraLive from '../views/Main/CameraLive';
import AdOrder from '../views/Main/AdOrder';
import OrderFoodIndex from '../views/Main/OrderFoodIndex';
import OrderFoodBasket from '../views/Main/OrderFoodBasket';
import OrderFoodShow from '../views/Main/OrderFoodShow';
import EOffice from '../views/Main/EOffice/EOffice';
import { EOfficeCategory } from '../views/Main/EOffice/EOfficeCategory';
import NewsIndex from '../views/Main/News/NewsIndex';
import NewsShow from '../views/Main/News/NewsShow';
import CompanyShow from '../views/Main/CompanyShow';
import CompanyIndex from '../views/Main/CompanyIndex';
import EMarketIndex from '../views/Main/EMarket/EMarketIndex';
import requireAuth from '../middlewares/require_auth';
import EMarketCreateEdit from '../views/Main/EMarket/EMarketCreateEdit';
import EMarketShow from '../views/Main/EMarket/EMarketShow';
import CommunityCompanyIndex from '../views/Main/CommunityCompanies/CommunityCompanyIndex';
import CommunityCompanyShow from '../views/Main/CommunityCompanies/CommunityCompanyShow';
import InstitutionEstateIndex from '../views/Main/InstitutionEstateIndex';
import InstitutionSchoolIndex from '../views/Main/InstitutionSchoolIndex';
import InstitutionShow from '../views/Main/InstitutionShow';
import InstitutionNewsShow from '../views/Main/InstitutionNewsShow';
import Pharmacy from '../views/Main/Pharmacy';
import AfterPayment from '../views/Main/AfterPayment';
import InvestmentsMap from '../views/Main/InvestmentsMap';
import { AccountActivated } from '../views/Main/AccountActivated';
import Error404 from '../views/Main/Errors/Error404';
import Error403 from '../views/Main/Errors/Error403';
import Error429 from '../views/Main/Errors/Error429';
import Error500 from '../views/Main/Errors/Error500';
import Sites from '../views/Main/Sites';
import { EOfficePost } from '../views/Main/EOffice/EOfficePost';
import { Header } from '../components/Header/Header';
import CommunicatesShow from '../views/Main/News/CommunicatesShow';
import CommunicatesIndex from '../views/Main/News/CommunicatesIndex';
import EcoNewsShow from '../views/Main/News/EconewsShow';
import EcoNewsIndex from '../views/Main/News/EcoNewsIndex';
import { SuggestForm } from '../components/SuggestForm';
import { Contact } from '../views/Main/Contact/Contact';
import PublicConsultationNewsIndex from '../views/Main/News/PublicConsultationNewsIndex';
import PublicConsultationNewsShow from '../views/Main/News/PublicConsultationNewsShow';
import CommunityInstitutions from '../views/Main/CommunityCompanies/CommunityInstitutions';
import CommunityInstitution from '../views/Main/CommunityCompanies/CommunityInstitution';
import { ResetPassword } from '../views/Main/Auth/ResetPassword';
import { FacebookCallback } from '../views/Main/Auth/FacebookCallback';
import { GoogleCallback } from '../views/Main/Auth/GoogleCallback';

class MainTemplate extends Component {
    state = {
        visible: false,
        menu: false,
    };

    componentDidMount() {
        const body = document.querySelector('body');
        const { menu } = this.state;
        if (!menu && body.style.overflowY === 'hidden') body.style.overflowY = 'visible';

        this.fetchMenuData();

        this.setState({
            visible: true,
        });
    }

    fetchMenuData = () => {
        const { date } = this.props.menu;
        const { fetchMenu } = this.props;
        checkIfDataExpired(fetchMenu, date, 180);
    };

    render() {
        const { loadingPage } = this.props;
        const isIn = (this.state.visible && !loadingPage) || loadingPage;
        return (
            <>
                <Header />
                <CSSTransition in={isIn} timeout={300} classNames="page" unmountOnExit>
                    <div className="main-template-content">
                        <Switch>
                            <Route path="/" exact component={MainPage} />
                            <Route path="/logowanie" exact component={requireGuest(Login)} />
                            <Route path="/logowanie/fb/:token" exact component={requireGuest(FacebookCallback)} />
                            <Route path="/logowanie/google/:token" exact component={requireGuest(GoogleCallback)} />
                            <Route path="/rejestracja" exact component={requireGuest(Register)} />

                            <Route path="/kontakt" exact component={Contact} />
                            <Route path="/kup-bilet" exact component={BuyTicket} />
                            <Route path="/kup-bilet/wydarzenia" exact component={EventTickets} />
                            <Route path="/kup-bilet/parkowanie" exact component={ParkingTickets} />
                            <Route path="/kup-bilet/wydarzenia/podsumowanie" exact component={BuyTicketCheckout} />
                            <Route path="/kup-bilet/wydarzenia/podziekowanie" exact component={EventThanks} />
                            <Route path="/kup-bilet/parkowanie/podziekowanie" exact component={ParkingThanks} />
                            <Route
                                path="/kup-bilet/parkowanie/podsumowanie"
                                exact
                                component={ParkingBuyTicketCheckout}
                            />
                            <Route path="/kup-bilet/wydarzenia/:slug" exact component={Ticket} />
                            <Route path="/kup-bilet/autobus" exact component={BusTicket} />
                            <Route path="/kup-bilet/autobus/podsumowanie" exact component={BusBuyTicketCheckout} />
                            <Route path="/kup-bilet/autobus/podziekowanie" exact component={BusThanks} />
                            <Route path="/karta-mieszkanca" component={CitizenCard} />
                            <Route path="/strefa-mieszkanca" component={CitizenZone} />
                            <Route path="/wydarzenia" exact component={EventsIndex} />
                            <Route path="/wydarzenia/:slug" exact component={EventsShow} />
                            <Route path="/wyniki-wyszukiwania/:categoryName" component={NewSearch} />
                            <Route path="/kamery-live" component={CameraLive} />
                            <Route path="/zamow-reklame" component={AdOrder} />
                            <Route path="/zamow-jedzenie" exact component={OrderFoodIndex} />
                            <Route path="/zamow-jedzenie/koszyk" exact component={OrderFoodBasket} />
                            <Route path="/zamow-jedzenie/:slug" exact component={OrderFoodShow} />
                            <Route path="/e-urzad" exact component={EOffice} />
                            <Route path="/e-urzad/:slug" exact component={EOfficeCategory} />
                            <Route path="/e-urzad/:slug/:postSlug" exact component={EOfficePost} />

                            <Route path="/aktualnosci" exact component={NewsIndex} />
                            <Route path="/aktualnosci/:slug" exact component={NewsShow} />
                            <Route path="/komunikaty" exact component={CommunicatesIndex} />
                            <Route path="/komunikaty/:slug" exact component={CommunicatesShow} />
                            <Route path="/eko-news" exact component={EcoNewsIndex} />
                            <Route path="/eko-news/:slug" exact component={EcoNewsShow} />
                            <Route path="/konsultacje-spoleczne" exact component={PublicConsultationNewsIndex} />
                            <Route path="/konsultacje-spoleczne/:slug" exact component={PublicConsultationNewsShow} />

                            <Route path="/baza-firm/firma/podglad" exact component={CompanyShow} />
                            <Route path="/baza-firm/firma/:slug" exact component={CompanyShow} />
                            <Route path="/baza-firm/:categorySlug?" exact component={CompanyIndex} />
                            <Route path="/e-targ" exact component={EMarketIndex} />
                            <Route path="/e-targ/dodaj" exact component={requireAuth(EMarketCreateEdit, 'user')} />
                            <Route path="/e-targ/:id/edytuj" exact component={requireAuth(EMarketCreateEdit, 'user')} />
                            <Route path="/e-targ/podglad" exact component={EMarketShow} />
                            <Route path="/e-targ/:slug" exact component={EMarketShow} />

                            <Route path="/spolki-gminne" exact component={CommunityCompanyIndex} />
                            <Route path="/spolki-gminne/:slug" exact component={CommunityCompanyShow} />

                            <Route path="/instytucje-gminne" exact component={CommunityInstitutions} />
                            <Route path="/instytucje-gminne/:slug" exact component={CommunityInstitution} />

                            <Route path="/osiedla-i-solectwa" exact component={InstitutionEstateIndex} />
                            <Route path="/szkoly-przedszkola-zlobki" exact component={InstitutionSchoolIndex} />
                            <Route path="/instytucje/:slug" exact component={InstitutionShow} />
                            <Route path="/instytucje/:slug/aktualnosci" exact component={InstitutionShow} />
                            <Route path="/instytucje/:slug/aktualnosci/:newsSlug" component={InstitutionNewsShow} />
                            <Route path="/apteki" exact component={Pharmacy} />
                            <Route path="/po-platnosci" exact component={AfterPayment} />
                            <Route path="/mapa-inwestycji" exact component={InvestmentsMap} />
                            <Route path="/konto-aktywowane" exact component={AccountActivated} />
                            <Route path="/404" exact component={Error404} />
                            <Route path="/403" exact component={Error403} />
                            <Route path="/429" exact component={Error429} />
                            <Route path="/500" exact component={Error500} />
                            <Route path="/reset-hasla" exact component={ResetPassword} />
                            <Route path="/:slug" exact component={Sites} />
                            <Route path="/*" component={Error404} />
                        </Switch>
                    </div>
                </CSSTransition>

                <BasketIndicator />
                <MainFooter />
                <SuggestForm />
            </>
        );
    }
}

const mapStateToProps = ({ menu, loadingPage }) => ({ menu, loadingPage });

export default connect(mapStateToProps, {
    fetchMenu: fetchMenuAction,
})(MainTemplate);
