import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import LayoutCardWithInfoTitlesAndSlider from '../../../components/Cards/LayoutCards/LayoutCardWithInfoTitlesAndSlider';
import { API_COMMUNITY_COMPANIES_SHOW } from '../../../api';

class CommunityInstitution extends Component {
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
        return (
            <>
                {redirect && <Redirect to={redirect} />}
                <LayoutCardWithInfoTitlesAndSlider
                    pathItems={[
                        { url: '/', label: 'Strona główna' },
                        { url: '/instytucje-gminne', label: 'Instytucje gminne' },
                        { url: `/instytucje-gminne/${company.slug}`, label: company.name },
                    ]}
                    category="Instytucje gminne"
                    item={company}
                    photos={photos}
                    sliderAlt="todo"
                    color={company.color}
                    address={
                        <>
                            {company.postal} {company.city}
                            <br />
                            {company.street} {company.number}
                        </>
                    }
                >
                    {/* eslint-disable-next-line react/no-danger */}
                    <div dangerouslySetInnerHTML={{ __html: company.description }} />
                </LayoutCardWithInfoTitlesAndSlider>
            </>
        );
    }
}

export default CommunityInstitution;

/*
*
* loading={loading}
                redirect={redirect}
                title={company.seo_title}
                description={company.seo_description}
                keywords={company.seo_keywords}
* */
