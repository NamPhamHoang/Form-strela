import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import route from '../../../routes';
import LayoutCardWithTitleAndPath from '../../../templates/LayoutCardWithTitleAndPath';
import CompanyCard from '../../../components/Views/CommunityCompanyIndex/CompanyCard/CompanyCard';
import { API_COMMUNITY_COMPANIES_INDEX } from '../../../api';

class CommunityCompanyIndex extends Component {
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
            .get(API_COMMUNITY_COMPANIES_INDEX)
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
                    <title>Spółki gminne - Oficjalny Portal Gminy Jarocin</title>
                    <meta
                        name="description"
                        content="Spółki gminne - JLA, JTBS, JAR, PEWiK, Jarocin Sport, ZGO, ZUK, Energia Jarocin"
                    />
                </Helmet>
                {redirect && <Redirect to={redirect} />}
                <LayoutCardWithTitleAndPath
                    pathItems={[
                        { url: '/', label: 'Strona główna' },
                        { url: route('communityCompanies.index'), label: 'Spółki gminne' },
                    ]}
                    title="Spółki gminne"
                >
                    <Row style={{ justifyContent: 'center' }}>
                        {companies.map(company => (
                            <CompanyCard key={company.slug} image={company.logo} slug={company.slug} />
                        ))}
                    </Row>
                </LayoutCardWithTitleAndPath>
            </>
        );
    }
}

export default CommunityCompanyIndex;
