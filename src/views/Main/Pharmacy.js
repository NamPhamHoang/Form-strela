import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Site from '../../components/Site/Site';
import PharmacyCard from '../../components/Views/Pharmacy/PharmacyCard/PharmacyCard';
import Collapse from '../../components/Collapse/Collapse';
import { API_PHARMACIES, API_SITES_SHOW } from '../../api';

class Pharmacy extends Component {
    state = {
        site: {},
        pharmacies: [],
        // loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchData().then(() => {});
    }

    fetchData = async () => {
        const API = API_SITES_SHOW('apteki');

        try {
            const sites = await axios.get(API);
            const pharmacies = await axios.get(API_PHARMACIES);
            sites.data.site.category = 'Gmina';
            this.setState({
                site: sites.data.site,
                pharmacies: pharmacies.data.pharmacies,
                // loading: false,
            });
        } catch (error) {
            this.setState({
                redirect: `/${error.response.status || 404}`,
            });
        }
    };

    render() {
        const { site, redirect } = this.state;
        return (
            <>
                <Helmet>
                    <title>Apteki - Oficjalny Portal Gminy Jarocin</title>
                    <meta name="description" content="Apteki - informacje, dane kontaktowe, apteki dyżurujące" />
                </Helmet>
                {redirect && <Redirect to={redirect} />}
                <Site site={site}>
                    <Collapse title="Wykaz aptek" renderChild>
                        <Row style={{ justifyContent: 'center' }} className="gutters-md">
                            {this.state.pharmacies.map(pharmacy => (
                                <PharmacyCard pharmacy={pharmacy} key={pharmacy.id} />
                            ))}
                        </Row>
                    </Collapse>
                </Site>
            </>
        );
    }
}

export default Pharmacy;

/*
* loading={loading}
                redirect={redirect}
                title={site.meta_title}
                description={site.meta_description}
                keywords={site.meta_keywords}
* */
