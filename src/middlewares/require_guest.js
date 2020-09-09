import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default function(ComposedComponent) {
    class NotAuthentication extends Component {
        PropTypes = {
            router: PropTypes.object,
        };

        state = {
            redirect: null,
        };

        checkIfAuthenticated = props => {
            const { authenticated } = props;
            if (authenticated) {
                this.setState({
                    redirect: '/panel',
                });
            }
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
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: !!state.token,
            token: state.token,
        };
    }

    return connect(mapStateToProps)(NotAuthentication);
}
