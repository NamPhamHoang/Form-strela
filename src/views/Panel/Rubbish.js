import React, { Component } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import Location from '../../components/Views/Rubbish/Location/Location';
import Calendar from '../../components/Views/Rubbish/Calendar/Calendar';
import {
    API_GARBAGE_DISPOSALS_INDEX,
    API_GARBAGE_USER_LOCATION_CREATE,
    API_GARBAGE_USER_LOCATION_DESTROY,
    API_GARBAGE_USER_LOCATION_INDEX,
} from '../../api';

class Rubbish extends Component {
    state = {
        locations: [],
        disposals: [],
        newLocations: [],
        newLocation: '',
        disposalsLoading: true,
        modalShow: false,
        lastDate: new Date().toISOString().substr(0, 10),
        location: null,
        loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchUserLocations();
    }

    setLocations = (data, callback = null) => {
        const { userLocations: locations, newLocations } = data;
        const location = locations.length ? locations[0].location.id : '';
        this.setState(
            {
                loading: false,
                location,
                locations,
                newLocations,
            },
            callback,
        );
    };

    fetchUserLocations = () => {
        axios
            .get(API_GARBAGE_USER_LOCATION_INDEX)
            .then(response => {
                this.setLocations(response.data, () => {
                    if (!this.state.locations.length) {
                        NotificationManager.info('Dodaj lokalizację aby wyświetlić kalendarz');
                    }
                });
            })
            .catch(error => {
                NotificationManager.error('Nie udało się pobrać dodanych lokacji');
                if (error.response) {
                    const { status } = error.response;
                    this.setState({
                        redirect: `/${status}`,
                    });
                }
            });
    };

    fetchDisposals = (date = null) => {
        const firstState = {
            disposalsLoading: true,
        };
        if (date) firstState.lastDate = date;
        this.setState(firstState, () => {
            const { location } = this.state;
            if (!location) return;
            const API = API_GARBAGE_DISPOSALS_INDEX(location, date || this.state.lastDate);
            axios
                .get(API)
                .then(response => {
                    this.setState({
                        disposals: response.data,
                        disposalsLoading: false,
                    });
                })
                .catch(() => {
                    NotificationManager.error('Nie udało się pobrać wywozów');
                });
        });
    };

    locationChange = e => {
        const { value } = e.target;
        this.setState(
            {
                location: value,
            },
            this.fetchDisposals,
        );
    };

    addNewLocation = () => {
        // eslint-disable-next-line camelcase
        const fd = { location_id: this.state.newLocation };
        axios
            .post(API_GARBAGE_USER_LOCATION_CREATE, fd)
            .then(response => {
                this.setState(
                    {
                        newLocation: '',
                    },
                    () => {
                        this.setLocations(response.data, () => {
                            if (this.state.disposalsLoading === true) this.fetchDisposals();
                        });
                    },
                );
            })
            .catch(() => {
                NotificationManager.error('Nie udało się dodać lokalizacji');
            });
    };

    changeNewLocation = e => {
        const { value } = e.target;
        this.setState({
            newLocation: value,
        });
    };

    deleteLocation = id => () => {
        const API = API_GARBAGE_USER_LOCATION_DESTROY(id);
        this.setState(
            {
                disposals: [],
                disposalsLoading: true,
            },
            () => {
                axios
                    .delete(API)
                    .then(response => {
                        this.setLocations(response.data, () => {
                            this.fetchDisposals();
                        });
                    })
                    .catch(() => {
                        NotificationManager.error('Nie udało się usunąć lokalizacji');
                    });
            },
        );
    };

    manageModal = show => () => {
        this.setState({
            modalShow: show,
        });
    };

    getDate = date => {
        this.fetchDisposals(date);
    };

    render() {
        const {
            loading,
            redirect,
            locations,
            location,
            disposals,
            disposalsLoading,
            modalShow,
            newLocations,
            newLocation,
        } = this.state;
        return (
            <PanelTemplate className="rubbish" loading={loading} redirect={redirect}>
                <SectionTitle>Odpady</SectionTitle>
                <Location
                    modalShow={modalShow}
                    manageModal={this.manageModal}
                    locations={locations}
                    location={location}
                    locationChange={this.locationChange}
                    deleteLocation={this.deleteLocation}
                    newLocations={newLocations}
                    newLocation={newLocation}
                    addNewLocation={this.addNewLocation}
                    changeNewLocation={this.changeNewLocation}
                />
                <Calendar disposalsLoading={disposalsLoading} disposals={disposals} getDate={this.getDate} />
            </PanelTemplate>
        );
    }
}

export default Rubbish;
