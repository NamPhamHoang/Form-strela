import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Site from '../../components/Site/Site';
import { API_SITES_SHOW } from '../../api';

class Sites extends Component {
    state = {
        site: {},
        redirect: null,
        loading: true,
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, redirect } = this.state;
        if (redirect) return;
        const { slug: oldSlug } = prevState.site;
        const { slug } = this.props.match.params;

        if (slug && oldSlug && slug !== oldSlug) {
            this.resetData();
            return;
        }

        if (loading) {
            this.fetchData();
        }
    }

    resetData = () => {
        this.setState({
            site: {},
            loading: true,
        });
    };

    fetchData = () => {
        const { slug } = this.props.match.params;
        const API = API_SITES_SHOW(slug);

        axios
            .get(API)
            .then(response => {
                const { site } = response.data;
                site.category = site.type;
                this.setState({
                    site,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    redirect: `/${error.response.status || 404}`,
                });
            });
    };

    render() {
        const { site, redirect } = this.state;
        return (
            <>
                {redirect && <Redirect to={redirect} />}
                <Site site={site} />
            </>
        );
    }
}

export default withRouter(Sites);

/*
redirect={redirect}
                loading={loading}
                key={this.props.match.params.slug}
                title={site.meta_title}
                description={site.meta_description}
                keywords={site.meta_keywords}
* */
