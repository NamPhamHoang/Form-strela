import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/pro-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import { Swipeable } from 'react-swipeable';
import axios from 'axios';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import LayoutCardWithTitleAndPath from '../../templates/LayoutCardWithTitleAndPath';
import BackgroundSquare from '../../components/BackgroundSquare/BackgroundSquare';
import { API_EVENTS_INDEX } from '../../api';

class EventsIndex extends Component {
    state = {
        events: [],
        offset: 0,
        // loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios
            .get(API_EVENTS_INDEX)
            .then(response => {
                const { events } = response.data;
                const offset = events.length === 1 ? -1 : response.data.offset - 1;
                this.setState({
                    // loading: false,
                    events,
                    offset,
                });
            })
            .catch(error => {
                this.setState({
                    // loading: false,
                    redirect: `/${error.response.status || 404}`,
                });
            });
    };

    slideUp = () => {
        const { offset } = this.state;
        if (offset === -1) return;
        this.setState({
            offset: offset - 1,
        });
    };

    slideDown = () => {
        const { offset, events } = this.state;
        if (offset === events.length - 2) return;
        this.setState({
            offset: offset + 1,
        });
    };

    render() {
        const { redirect } = this.state;
        return (
            <>
                <Helmet>
                    <title>Wydarzenia - Oficjalny Portal Gminy Jarocin</title>
                    <meta
                        name="description"
                        content="Bądź na bieżąco z wydarzeniami w Gminie Jarocin! Kup bilet bezpośrednio w serwisie jarocin.pl"
                    />
                </Helmet>
                {redirect && <Redirect to={redirect} />}
                <LayoutCardWithTitleAndPath
                    category="Dla mieszkańców"
                    title="Wydarzenia"
                    pathItems={[
                        { url: '/', label: 'Strona główna' },
                        { url: `/wydarzenia`, label: 'Wydarzenia' },
                    ]}
                    className="events-page"
                >
                    <BackgroundSquare variant="light-gray" />
                    <Swipeable onSwipedLeft={this.slideDown} onSwipedRight={this.slideUp} trackMouse>
                        <div className="event-container">
                            <div className="time-line">
                                <button
                                    type="button"
                                    className={`up ${this.state.offset === -1 ? 'disabled' : ''}`}
                                    onClick={this.slideUp}
                                >
                                    <FontAwesomeIcon icon={faAngleUp} />
                                </button>
                                <button
                                    type="button"
                                    className={`down ${
                                        this.state.offset === this.state.events.length - 2 ? 'disabled' : ''
                                    }`}
                                    onClick={this.slideDown}
                                >
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </button>
                            </div>
                            {this.state.events.map((event, index) => {
                                const place = index + 1 - this.state.offset + 1;
                                if (place < 1 || place > 5) {
                                    return <></>;
                                }
                                let click;
                                if (place === 2) {
                                    click = this.slideUp;
                                } else if (place === 4) {
                                    click = this.slideDown;
                                }
                                const date = moment(event.date);
                                return (
                                    <div
                                        className={`event-item event-item-position-${place}`}
                                        key={event.slug}
                                        onClick={click}
                                        onKeyPress={() => {}}
                                        tabIndex="0"
                                        role="button"
                                    >
                                        <div className="date">{date.format('DD.MM.YYYY')}</div>
                                        {/*
                                        <div className="date">
                                            {date.format('DD.MM.YYYY')}<br className="d-none d-md-inline-block"/>
                                            <span className="d-md-none">&nbsp;</span>{date.format('HH:mm')}
                                        </div>
                                        */}
                                        <div className="dot" />
                                        <div className="description">
                                            <div className="content">
                                                <h5>{event.title}</h5>
                                                <p>{event.sneak_peek}</p>
                                            </div>
                                            <div className="photo">
                                                <img
                                                    src={event.img}
                                                    alt={`Zdjęcie wydarzenia ${event.slug}`}
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="link">
                                                <Link to={`/wydarzenia/${event.slug}`} className="btn btn-primary">
                                                    <strong>Dowiedz się</strong> więcej
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Swipeable>
                </LayoutCardWithTitleAndPath>
            </>
        );
    }
}

export default EventsIndex;

/*
loading={loading}
                redirect={redirect}
                title="Wydarzenia"
                description="todo opis"
                keywords="todo keywords"
* */
