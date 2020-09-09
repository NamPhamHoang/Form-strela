import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import route from '../../../routes';
import LayoutCardWithInfoTitlesAndSlider from '../../../components/Cards/LayoutCards/LayoutCardWithInfoTitlesAndSlider';
import { API_COMMUNITY_COMPANIES_SHOW } from '../../../api';

class CommunityCompanyShow extends Component {
    state = {
        company: {},
        photos: [],
        loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchCompany();
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, redirect } = this.state;
        if (redirect) return;
        const { slug: oldSlug } = prevState.company;
        const { slug } = this.props.match.params;

        if (slug && oldSlug && slug !== oldSlug) {
            this.resetData();
            return;
        }

        if (loading) {
            this.fetchCompany();
        }
    }

    resetData = () => {
        this.setState({
            loading: true,
            company: {},
            photos: [],
        });
    };

    fetchCompany = () => {
        const { slug } = this.props.match.params;
        const API = API_COMMUNITY_COMPANIES_SHOW(slug);

        axios
            .get(API)
            .then(response => {
                const { photos, ...company } = response.data.data;
                this.setState({
                    photos,
                    company,
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
        const { company, photos, redirect } = this.state;
        const pathItems = [
            { url: '/', label: 'Strona główna' },
            { url: route('communityCompanies.index'), label: 'Spółki gminne' },
            { url: route('communityCompanies.show', [company.slug]), label: company.name },
        ];
        const address = (
            <>
                {company.postal} {company.city}
                <br />
                {company.street} {company.number}
            </>
        );
        return (
            <>
                {redirect && <Redirect to={redirect} />}
                <LayoutCardWithInfoTitlesAndSlider
                    pathItems={pathItems}
                    category="Spółki gminne"
                    item={company}
                    photos={photos}
                    sliderAlt="todo"
                    color={company.color}
                    address={address}
                >
                    {/* eslint-disable-next-line react/no-danger */}
                    <div dangerouslySetInnerHTML={{ __html: company.description }} />
                </LayoutCardWithInfoTitlesAndSlider>
            </>
        );
    }
}

export default CommunityCompanyShow;

/*
*
* loading={loading}
                redirect={redirect}
                title={company.seo_title}
                description={company.seo_description}
                keywords={company.seo_keywords}
* */
