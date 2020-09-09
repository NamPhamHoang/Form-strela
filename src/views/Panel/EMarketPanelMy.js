import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import { Button, Modal } from 'react-bootstrap';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import TextAndDate from '../../components/Panel/Filters/TextAndDate';
import ItemCardManage from '../../components/Views/EMarketIndex/ItemCard/ItemCardManage';
import {
    API_EMARKET_PANEL_DELETE,
    API_EMARKET_PANEL_EXTEND,
    API_EMARKET_PANEL_INDEX,
    API_EMARKET_PANEL_RENEW,
} from '../../api';
import { PrimaryButton } from '../../components/Buttons/Button';

class EMarketPanelMy extends Component {
    state = {
        ads: [],
        modal: {
            id: null,
            display: false,
            name: '',
        },
        redirect: null,
        loading: false,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = (filters = null) => {
        const API = new URL(API_EMARKET_PANEL_INDEX);
        if (filters) {
            if (filters.text) API.searchParams.append('search', filters.text);
            if (filters.date) API.searchParams.append('date', filters.date);
        }
        axios.get(API.href).then(response => {
            const { ads } = response.data;
            this.setState({
                ads,
            });
        });
        // .catch(error => {
        //     console.log(error, error.response);
        // });
    };

    handleSearch = values => {
        this.fetchData(values);
    };

    handleAttempt = id => {
        const API = API_EMARKET_PANEL_RENEW(id);
        axios
            .post(API)
            .then(response => {
                NotificationManager.success('Pomyślnie ponowiono ogłoszenie');
                const { ad } = response.data;
                this.setState(state => {
                    const ads = [...state.ads];
                    const index = ads.findIndex(item => item.id === id);
                    ads[index] = ad;
                    return { ads };
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się ponowić ogłoszenia');
            });
    };

    handleExtension = id => {
        const API = API_EMARKET_PANEL_EXTEND(id);
        axios
            .post(API)
            .then(response => {
                NotificationManager.success('Pomyślnie przedłużono ogłoszenie');
                const { ad } = response.data;
                this.setState(state => {
                    const ads = [...state.ads];
                    const index = ads.findIndex(item => item.id === id);
                    ads[index] = ad;
                    return { ads };
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się przedłużyć ogłoszenia');
            });
    };

    handleDelete = () => {
        const { id } = this.state.modal;
        const API = API_EMARKET_PANEL_DELETE(id);
        axios
            .delete(API)
            .then(() => {
                this.setState(state => {
                    const ads = [...state.ads];
                    const index = ads.findIndex(item => item.id === id);
                    ads.splice(index, 1);
                    const modal = {
                        id: null,
                        display: false,
                        name: '',
                    };
                    return { ads, modal };
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się usunąć ogłoszenia');
            });
    };

    handleEdit = id => {
        this.setState({
            redirect: `/e-targ/${id}/edytuj`,
        });
    };

    displayDeleteModal = (id, name) => {
        this.setState({
            modal: {
                display: true,
                id,
                name,
            },
        });
    };

    hideDeleteModal = () => {
        this.setState({
            modal: {
                display: false,
                id: null,
            },
        });
    };

    render() {
        const { ads, redirect, loading } = this.state;
        return (
            <PanelTemplate loading={loading} redirect={redirect} className="e-market-panel-observed e-market-panel">
                <SectionTitle>Mój eTarg</SectionTitle>
                <TextAndDate handleSearch={this.handleSearch}>
                    <PrimaryButton to="/e-targ/dodaj">Dodaj ogłoszenie</PrimaryButton>
                </TextAndDate>
                <Row className="gutters-md e-market-index">
                    {ads.map(item => (
                        <ItemCardManage
                            key={item.id}
                            id={item.id}
                            src={item.thumbnailUrl}
                            price={item.price}
                            promotion={item.promotion}
                            title={item.title}
                            city={item.location}
                            slug={item.slug}
                            extend={item.extend}
                            display={item.display}
                            handleAttempt={this.handleAttempt}
                            handleExtension={this.handleExtension}
                            handleEdit={this.handleEdit}
                            displayDeleteModal={this.displayDeleteModal}
                            date={moment(item.created_at).format('DD.MM.YYYY')}
                            toExpire={item.display_to}
                            toggleFavorite={this.toggleFavorite}
                        />
                    ))}
                </Row>
                <Modal show={this.state.modal.display} onHide={this.hideDeleteModal}>
                    <Modal.Header>Usuwanie ogłoszenia</Modal.Header>
                    <Modal.Body>Czy na pewno chcesz usunąć ogłoszenie {this.state.modal.name}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" size="sm" onClick={this.hideDeleteModal}>
                            Zamknij
                        </Button>
                        <Button variant="danger" size="sm" onClick={this.handleDelete}>
                            Usuń
                        </Button>
                    </Modal.Footer>
                </Modal>
            </PanelTemplate>
        );
    }
}

export default EMarketPanelMy;
