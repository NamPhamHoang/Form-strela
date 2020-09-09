import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import route from '../../routes';
import LayoutCardWithTitleAndPath from '../../templates/LayoutCardWithTitleAndPath';
import EstateCard from '../../components/Views/EstateIndex/EstateCard/EstateCard';
import { API_ESTATES } from '../../api';

class InstitutionEstateIndex extends Component {
    state = {
        estates: [],
        redirect: null,
        // loading: true,
    };

    componentDidMount() {
        axios
            .get(API_ESTATES)
            .then(response => {
                this.setState({
                    estates: response.data.data,
                    // loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
            });
    }

    render() {
        const { estates, redirect } = this.state;
        return (
            <>
                <Helmet>
                    <title>Osiedla i sołectwa - Oficjalny Portal Gminy Jarocin</title>
                    <meta name="description" content="Osiedla i sołectwa - informacje, dane kontaktowe, aktualności" />
                </Helmet>
                {redirect && <Redirect to={redirect} />}
                <LayoutCardWithTitleAndPath
                    pathItems={[
                        { url: '/', label: 'Strona główna' },
                        { url: route('institutionEstate.index'), label: 'Osiedla i sołectwa' },
                    ]}
                    category="Gmina"
                    title="Osiedla i sołectwa"
                >
                    <Row className="justify-content-center">
                        {estates.map(estate => (
                            <EstateCard estate={estate} key={estate.slug} />
                        ))}
                    </Row>
                </LayoutCardWithTitleAndPath>
            </>
        );
    }
}

export default InstitutionEstateIndex;

/*
* redirect={redirect}
                loading={loading}
                title="todo"
                description="todo"
                keywords="todo"
* */
