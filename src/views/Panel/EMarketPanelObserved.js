import React, { Component } from 'react';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import TextAndDate from '../../components/Panel/Filters/TextAndDate';
import Row from 'react-bootstrap/Row';
import ItemCard from '../../components/Views/EMarketIndex/ItemCard/ItemCard';
import axios from 'axios';
import { API_EMARKET_PANEL_FAV_INDEX, API_EMARKET_PANEL_FAV_TOGGLE } from '../../api';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';


class EMarketPanelObserved extends Component {
    state = {
        ads: [],
        loading: false,
        redirect: null,
    };

    componentDidMount() {
        this.fetchData();
    };

    fetchData = (filters = null) => {
        const API = new URL(API_EMARKET_PANEL_FAV_INDEX);
        if (filters) {
            if (filters.text) API.searchParams.append('search', filters.text);
            if (filters.date) API.searchParams.append('date', filters.date);
        }
        axios.get(API.href)
            .then(response => {
                console.log(response.data);
                const { ads } = response.data;
                this.setState({
                    ads: ads.map(item => {
                        item.fav = true;
                        return item;
                    }),
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
            });
    };

    handleSearch = (values) => {
        this.fetchData(values);
    };

    toggleFavorite = (id) => {
        const fd = {
            ad_id: id,
        };
        axios.post(API_EMARKET_PANEL_FAV_TOGGLE, fd)
            .then(response => {
                NotificationManager.success('Pomyślnie usunięto z ulubionych');
                this.setState((state) => {
                    const ads = [...state.ads];
                    const index = ads.findIndex(item => item.id === id);
                    ads.splice(index, 1);
                    return { ads };
                });
            })
            .catch(error => {
                NotificationManager.error('Nie udało się usunąć z ulubionych');
            });
    };

    render() {
        const { ads, loading, redirect } = this.state;
        return (
            <PanelTemplate
                loading={loading}
                redirect={redirect}
                className="e-market-panel-observed e-market-panel"
            >
                <SectionTitle>Obserwowane ogłoszenia</SectionTitle>
                <TextAndDate handleSearch={this.handleSearch}/>
                <Row className="gutters-md e-market-index">
                    {ads.map(item => (
                        <ItemCard
                            key={item.id}
                            {...item}
                            toggleFavorite={this.toggleFavorite}
                        />
                    ))}
                </Row>
            </PanelTemplate>
        );
    }
}

const mapStateToProps = ({ token }) => ({ token });
export default connect(mapStateToProps)(EMarketPanelObserved);
