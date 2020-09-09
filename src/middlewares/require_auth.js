import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';

export default function(ComposedComponent) {
    class Authentication extends Component {
        state = {
            redirect: null,
        };

        PropTypes = {
            router: PropTypes.object,
        };

        checkIfAuthenticated = props => {
            const { authenticated, hasChangedData } = props;
            if (!authenticated) {
                this.setState({
                    redirect: '/logowanie',
                });
            }
            if (1 === 0 && !hasChangedData && props.history.location.pathname !== '/panel/uzupelnij-dane') {
                this.setState({
                    redirect: '/panel/uzupelnij-dane',
                });
            }

            // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        };

        UNSAFE_componentWillMount() {
            this.checkIfAuthenticated(this.props);
        }

        UNSAFE_componentWillUpdate(nextProps) {
            this.checkIfAuthenticated(nextProps);
        }

        render() {
            const redirect = this.state.redirect ? <Redirect to={this.state.redirect} /> : null;
            if (redirect) return redirect;

            return (
                <>
                    <ComposedComponent {...this.props} />
                </>
            );
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: !!state.token,
            hasChangedData: state.hasChangedData,
        };
    }

    return withRouter(connect(mapStateToProps)(Authentication));
}
