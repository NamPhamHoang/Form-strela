import React, { Component } from 'react';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import Table from 'react-bootstrap/Table';
import { API_COMPANY_INDEX } from '../../api';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/pro-regular-svg-icons';
import { connect } from 'react-redux';
import { changeActiveCompanyAction } from '../../actions';
import { NotificationManager } from 'react-notifications';
import PanelCompanyCreate from '../../components/Views/PanelCompanyIndex/PanelCompanyCreate/PanelCompanyCreate';
import TrueFalseIcon from '../../components/TrueFalseIcon/TrueFalseIcon';


class PanelCompanyIndex extends Component {
    state = {
        companies: [],
        loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios.get(API_COMPANY_INDEX)
            .then(response => {
                this.setState({
                    companies: response.data,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
            });
    };

    changeActiveCompany = (id, name, categoryId) => () => {
        this.props.changeActiveCompany(id, name, categoryId);
        NotificationManager.success('Pomyślnie zmieniono aktywną firmę');
    };

    pushNewCompany = (company) => {
        this.setState((state) => {
            const { companies } = state;
            companies.push(company);
            return { companies };
        });
    };

    render() {
        const { companies, loading, redirect } = this.state;
        return (
            <PanelTemplate
                className="panel-company-index"
                loading={loading}
                redirect={redirect}
                company
            >
                <SectionTitle>Moje firmy</SectionTitle>
                <PanelCompanyCreate pushNewCompany={this.pushNewCompany}/>
                <Table responsive size="sm" className="table-simple">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nazwa</th>
                        <th>Kategoria</th>
                        <th>Widoczna</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {companies.map(({ id, name, category, public: publicVisible }) => {
                        if (!category) {
                            category = {
                                name: 'brak',
                                id: null,
                            };
                        }
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{category.name}</td>
                                <td>{<TrueFalseIcon condition={publicVisible}/>}</td>
                                <td>
                                    <div className="action-buttons">
                                        <Button
                                            variant={this.props.panelCompany.id === id ? 'secondary' : 'orange'}
                                            size="sm"
                                            onClick={this.changeActiveCompany(id, name, category.id)}
                                        >
                                            <FontAwesomeIcon icon={faAngleLeft}/> Wybierz
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </PanelTemplate>
        );
    }
}

const mapStateToProps = ({ panelCompany }) => ({ panelCompany });

export default connect(mapStateToProps, {
    changeActiveCompany: changeActiveCompanyAction,
})(PanelCompanyIndex);