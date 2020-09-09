import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

class AfterPayment extends Component {
    state = {
        redirect: null,
        timeout: setTimeout(() => {
            this.setState({
                redirect: '/',
            });
        }, 3000),
    };

    componentWillUnmount() {
        clearTimeout(this.state.timeout);
    }

    render() {
        // todo: seo
        const { redirect } = this.state;
        return (
            <>
                {redirect && <Redirect to={redirect} />}
                <Loading className="mt-5" />
                <p className="text-center font-weight-light text-muted">
                    Dziękujemy za dokonanie zamówienia. Za chwile zostaniesz przekierowany na stronę główną.
                </p>
            </>
        );
    }
}

export default AfterPayment;
/*
redirect={redirect}
                title={'todo'}
                description={'todo'}
                keywords={'todo'}
* */
