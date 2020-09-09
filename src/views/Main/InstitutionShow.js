import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import LayoutCardWithInfoTitlesAndSlider from '../../components/Cards/LayoutCards/LayoutCardWithInfoTitlesAndSlider';
import ManageContent from '../../components/Views/InstitutionShow/ManageContent';
import { API_INSTITUTION_SHOW } from '../../api';
import { getInstitutionPathName } from '../../helpers';

class InstitutionShow extends Component {
    state = {
        institution: {},
        photos: [],
        loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchInstitution();
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, redirect } = this.state;
        if (redirect) return;
        const { slug: oldSlug } = prevState.institution;
        const { slug } = this.props.match.params;

        if (slug && oldSlug && slug !== oldSlug) {
            this.resetData();
            return;
        }

        if (loading) {
            this.fetchInstitution();
        }
    }

    resetData = () => {
        this.setState({
            loading: true,
            institution: {},
            photos: [],
        });
    };

    fetchInstitution = () => {
        const { slug } = this.props.match.params;
        const API = API_INSTITUTION_SHOW(slug);

        axios
            .get(API)
            .then(response => {
                const { photos, ...institution } = response.data.data;
                this.setState({
                    photos,
                    institution,
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
        const { institution, photos, redirect } = this.state;

        const pathItems = [
            { url: '/', label: 'Strona główna' },
            getInstitutionPathName(institution.typeName),
            { url: `/instytucje/${institution.slug}`, label: institution.name },
        ];

        const address = (
            <>
                {institution.postal} {institution.city}
                <br />
                ul. {institution.address}
            </>
        );

        const actAttributes = {};
        if (institution.typeName === 'Osiedla i sołectwa') {
            actAttributes.file = institution.actUrl;
            actAttributes.fileLabel = 'Statut';
        }

        return (
            <>
                {redirect && <Redirect to={redirect} />}
                <LayoutCardWithInfoTitlesAndSlider
                    pathItems={pathItems}
                    category={institution.typeName}
                    item={institution}
                    photos={photos}
                    sliderAlt="test"
                    address={address}
                    {...actAttributes}
                >
                    <ManageContent description={institution.description} news={institution.news} />
                </LayoutCardWithInfoTitlesAndSlider>
            </>
        );
    }
}

export default InstitutionShow;
/*
* loading={loading}
                redirect={redirect}
                title={institution.seo_title}
                description={institution.seo_description}
                keywords={institution.seo_keywords}
                key={this.props.match.params.slug} */
