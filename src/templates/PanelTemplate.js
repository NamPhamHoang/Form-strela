import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import PanelHeader from '../components/Panel/PanelHeader';
import { fetchMenuAction, logOutAction } from '../actions';
import Loading from '../components/Loading/Loading';
import { checkIfDataExpired } from '../helpers';

class PanelTemplate extends Component {
    state = {
        visible: false,
        headerVisible: true,
    };

    componentDidMount() {
        const { expiresIn } = this.props;

        if (parseInt(expiresIn, 10) < Date.now()) {
            this.logOut();
        }

        // TODO: add refresh token

        this.fetchMenuData();
        this.setState({
            visible: true,
        });
    }

    logOut = () => {
        const { onLogout, token } = this.props;
        onLogout(token);
    };

    toggleHeader = () => {
        this.setState(prevState => {
            const { headerVisible } = prevState;
            return {
                headerVisible: !headerVisible,
            };
        });
    };

    fetchMenuData = () => {
        const { date } = this.props.menu;
        const { fetchMenu } = this.props;
        checkIfDataExpired(fetchMenu, date, 180);
    };

    render() {
        const { children, redirect, className, loading, title, keywords, description, helmet } = this.props;
        const isIn = this.state.visible && !loading;
        if (redirect) return <Redirect to={redirect} />;
        return (
            <>
                <PanelHeader headerVisible={this.state.headerVisible} toggleHeader={this.toggleHeader} />
                {loading && <Loading className="loading-site main-template-content" />}
                <CSSTransition in={isIn} timeout={300} classNames="page-panel" unmountOnExit>
                    <main className={`panel-content ${className} ${this.state.headerVisible ? '' : 'header-hidden'}`}>
                        <Helmet>
                            <title>{title}</title>
                            <meta name="description" content={description} />
                            <meta name="keywords" content={keywords} />
                            {helmet}
                        </Helmet>
                        {children}
                    </main>
                </CSSTransition>
            </>
        );
    }
}

PanelTemplate.defaultProps = {
    className: '',
    loading: false,
    title: 'Panel użytkownika - Oficjalny Portal Gminy Jarocin',
    description:
        'Strona Gminy Jarocin. Wszystko o Jarocinie. Informacje lokalne i samorządowe, wizytówka miasta, jego historia i zabytki, kultura, oświata i gospodarka.',
    keywords: 'jarocin.pl',
    redirect: null,
};

PanelTemplate.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    redirect: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
};

const mapStateToProps = ({ token, menu, expiresIn }) => ({ token, menu, expiresIn });

export default connect(mapStateToProps, {
    onLogout: logOutAction,
    fetchMenu: fetchMenuAction,
})(PanelTemplate);
