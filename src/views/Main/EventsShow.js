import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { API_EVENTS_SHOW } from '../../api';
import Event from '../../components/Event/Event';

class EventsShow extends Component {
    state = {
        event: {},
        otherEvents: [],
        loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, redirect } = this.state;
        if (redirect) return;
        const { slug: oldSlug } = prevState.event;
        const { slug } = this.props.match.params;

        if (slug && oldSlug && slug !== oldSlug) {
            this.resetData();
            return;
        }

        if (loading) {
            this.fetchData();
        }
    }

    resetData = () => {
        this.setState({
            event: {},
            otherEvents: [],
            loading: true,
        });
    };

    fetchData = () => {
        const { slug } = this.props.match.params;
        const API = API_EVENTS_SHOW(slug);
        axios
            .get(API)
            .then(response => {
                const { event, otherEvents } = response.data;
                this.setState({
                    event,
                    otherEvents: otherEvents.map(item => {
                        item.to = `/wydarzenia/${item.slug}`;
                        item.date = moment(item.date).format('DD.MM.YYYY');
                        return item;
                    }),
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
            });
    };

    render() {
        const { event, otherEvents, redirect } = this.state;
        const pathItems = [
            { url: '/', label: 'Strona główna' },
            { url: '/wydarzenia', label: 'Wydarzenia' },
            { url: `/wydarzenia/${this.props.match.params.slug}`, label: event.title },
        ];
        return (
            <>
                {redirect && <Redirect to={redirect} />}
                <Event
                    category="Wydarzenia"
                    listTitle="Może cię zainteresować także"
                    pathItems={pathItems}
                    title={event.title}
                    date={event.date}
                    photo={event.img}
                    content={event.contents}
                    otherEvents={otherEvents}
                />
            </>
        );
    }
}

export default EventsShow;

/*
* loading={loading}
                redirect={redirect}
                title={event.meta_title}
                description={event.meta_description}
                keywords={event.meta_keywords}
                key={event.slug}
* */
