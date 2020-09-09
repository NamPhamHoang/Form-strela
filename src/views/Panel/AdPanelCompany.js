import React, { Component } from 'react';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import Table from 'react-bootstrap/Table';
import SelectAndDate from '../../components/Panel/Filters/SelectAndDate';
import axios from 'axios';
import { API_AD_COMPANY_INDEX } from '../../api';

/*
* TODO: Data filtrująca, autoryzacja
* */


class AdPanelCompany extends Component {
    state = {
        ads: [],
        loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchData();
    };

    fetchData = (filters = null) => {
        const API = new URL(API_AD_COMPANY_INDEX);
        if (filters) {
            if (filters.select) API.searchParams.append('status', filters.select);
            if (filters.date) API.searchParams.append('date', filters.date);
        }
        axios.get(API.href)
            .then(response => {
                this.setState({
                    ads: response.data.data,
                    loading: false,
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

    render() {
        const { ads, loading, redirect } = this.state;
        return (
            <PanelTemplate
                loading={loading}
                redirect={redirect}
                company
                className="ad-panel-company"
            >
                <SectionTitle>Miejsca reklamowe</SectionTitle>
                <SelectAndDate
                    handleSearch={this.handleSearch}
                    selectLabel="Status reklamy"
                >
                    <option>Wyświetlana</option>
                    <option>Niewyświetlana</option>
                    <option>Ukryta</option>
                </SelectAndDate>
                <Table responsive size="sm" className="table-simple">
                    <thead>
                    <tr>
                        <th>Data od</th>
                        <th>Termin do</th>
                        <th>Moduł</th>
                        <th>Kwota</th>
                        <th>Status</th>
                        <th>Projekt graficzny</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ads.map(({ id, type_name, date_from, date_to, price, status, project }) => (
                        <tr key={id}>
                            <td>{date_from}</td>
                            <td>{date_to}</td>
                            <td>{type_name}</td>
                            <td>{price} zł</td>
                            <td>{status}</td>
                            <td>{project ? 'Zamawiam projekt graficzny' : 'Mam projekt graficzny'}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </PanelTemplate>
        );
    }
}

export default AdPanelCompany;