import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LayoutCardWithTitleAndPath from '../../../templates/LayoutCardWithTitleAndPath';
import CompanyCard from '../../../components/Views/CommunityCompanyIndex/CompanyCard/CompanyCard';
import { API_COMMUNITY_COMPANIES_INDEX } from '../../../api';

class CommunityInstitutions extends Component {
    state = {
        companies: [],
        // loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchCompanies();
    }

    fetchCompanies = () => {
        axios
            .get(API_COMMUNITY_COMPANIES_INDEX, {
                params: {
                    category: 2,
                },
            })
            .then(response => {
                this.setState({
                    companies: response.data.data,
                    // loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
            });
    };

    render() {
        const { redirect, companies } = this.state;
        return (
            <>
                <Helmet>
                    <title>Instytucje gminne - Oficjalny Portal Gminy Jarocin</title>
                    <meta
                        name="description"
                        content="Instytucje gminne - zapraszamy do zapoznania się z najważniejszymi informacjami i danymi kontaktowymi."
                    />
                </Helmet>
                {redirect && <Redirect to={redirect} />}
                <LayoutCardWithTitleAndPath
                    pathItems={[
                        { url: '/', label: 'Strona główna' },
                        { url: '/instytucje-gminne', label: 'Instytucje gminne' },
                    ]}
                    title="Instytucje gminne"
                >
                    <Row style={{ justifyContent: 'center' }}>
                        {companies.map(company => (
                            <CompanyCard
                                key={company.slug}
                                image={company.logo}
                                slug={company.slug}
                                link="instytucje-gminne"
                            />
                        ))}
                    </Row>
                </LayoutCardWithTitleAndPath>
            </>
        );
    }
}

export default CommunityInstitutions;
