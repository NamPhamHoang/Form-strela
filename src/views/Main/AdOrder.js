import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import moment from 'moment';
import { connect } from 'react-redux';
import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';
import FormCheck from 'react-bootstrap/FormCheck';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LayoutCardWithTitleAndPath from '../../templates/LayoutCardWithTitleAndPath';
import Input from '../../components/Input/Input';
import img from '../../img/image3.png';
import BackgroundSquare from '../../components/BackgroundSquare/BackgroundSquare';
import { API_AD_CHECK_FROM, API_AD_CHECK_TO, API_AD_COUNT, API_AD_PAYMENT, API_AD_TYPE_INDEX } from '../../api';
import { logOutAction } from '../../actions';

class AdOrder extends Component {
    state = {
        project: null,
        types: [],
        // eslint-disable-next-line camelcase
        type_id: '',
        from: '',
        // eslint-disable-next-line camelcase
        min_from: '',
        // eslint-disable-next-line camelcase
        max_to: '',
        email: '',
        to: '',
        price: null,
        redirect: null,
        // loading: true,
    };

    componentDidMount() {
        this.fetchTypes();
    }

    fetchTypes = () => {
        axios
            .get(API_AD_TYPE_INDEX)
            .then(response => {
                this.setState({
                    types: response.data.data,
                    // loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
            });
    };

    changeProject = bool => {
        const days = bool ? 5 : 3;
        const min = moment().add(days, 'days');
        this.setState({
            project: bool,
            // eslint-disable-next-line camelcase
            min_from: min.format('YYYY-MM-DD'),
            from: '',
            to: '',
            // eslint-disable-next-line camelcase
            max_to: null,
            price: null,
        });
    };

    changeType = e => {
        // eslint-disable-next-line camelcase
        const type_id = e.target.value;
        this.setState({
            // eslint-disable-next-line camelcase
            type_id,
            from: '',
            to: '',
            price: null,
            // eslint-disable-next-line camelcase
            max_to: null,
        });
    };

    changeFrom = e => {
        // eslint-disable-next-line camelcase
        const date_from = e.target.value;
        // eslint-disable-next-line camelcase
        const { type_id } = this.state;
        const fd = {
            // eslint-disable-next-line camelcase
            date_from,
            // eslint-disable-next-line camelcase
            type_id,
        };
        axios
            .post(API_AD_CHECK_FROM, fd)
            .then(response => {
                if (response.data.can) {
                    this.setState({
                        // eslint-disable-next-line camelcase
                        from: date_from,
                        // eslint-disable-next-line camelcase
                        max_to: null,
                        price: null,
                        to: '',
                    });
                } else {
                    NotificationManager.info('Wybrano najwcześniejszą możliwą datę');
                    this.setState({
                        // eslint-disable-next-line camelcase
                        min_from: response.data.date_from,
                        from: response.data.date_from,
                        to: '',
                        // eslint-disable-next-line camelcase
                        max_to: null,
                        price: null,
                    });
                }
            })
            .catch(() => {
                NotificationManager.error('Nie udało się sprawdzić daty');
            });
    };

    changeTo = e => {
        // eslint-disable-next-line camelcase
        const date_to = e.target.value;
        // eslint-disable-next-line camelcase
        const { type_id, from: date_from } = this.state;
        const fd = {
            // eslint-disable-next-line camelcase
            date_from,
            // eslint-disable-next-line camelcase
            type_id,
            // eslint-disable-next-line camelcase
            date_to,
        };
        axios
            .post(API_AD_CHECK_TO, fd)
            .then(response => {
                if (response.data.can) {
                    const newFd = { ...fd, project: this.state.project };
                    axios
                        .post(API_AD_COUNT, newFd)
                        .then(({ data }) => {
                            this.setState({
                                // eslint-disable-next-line camelcase
                                to: date_to,
                                // eslint-disable-next-line camelcase
                                max_to: null,
                                price: data,
                            });
                        })
                        .catch(() => {
                            NotificationManager.error('Nie udało się obliczyć ceny');
                        });
                    this.setState({
                        // eslint-disable-next-line camelcase
                        to: date_to,
                        // eslint-disable-next-line camelcase
                        max_to: null,
                    });
                } else {
                    NotificationManager.info('Wybrano najwcześniejszą możliwą datę');
                    this.setState({
                        to: response.data.date_to,
                        // eslint-disable-next-line camelcase
                        max_to: response.data.date_to,
                    });
                }
            })
            .catch(() => {
                NotificationManager.error('Nie udało się sprawdzić daty');
            });
    };

    submitOrder = e => {
        e.preventDefault();
        // eslint-disable-next-line camelcase
        const { type_id, from, to, project, email } = this.state;
        const { token } = this.props;
        const fd = {
            // eslint-disable-next-line camelcase
            type_id,
            project,
            email,
            // eslint-disable-next-line camelcase
            date_from: from,
            // eslint-disable-next-line camelcase
            date_to: to,
        };
        const config = {};
        if (token) {
            config.headers = {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        axios
            .post(API_AD_PAYMENT, fd, config)
            .then(response => {
                if (response.data.status) {
                    NotificationManager.success('Zamówienie złożone');
                } else {
                    NotificationManager.error('Błąd w trakcie składania zamówienia');
                }
                // window.location = response.data.url;
            })
            .catch(error => {
                NotificationManager.error('Nie udało się wysłać zamówienia. Sprawdź błędy');
                if (error.response) {
                    if (error.response.status === 422) {
                        if (error.response.data.errors.email) {
                            NotificationManager.error('Zaloguj się i zamów ponownie');
                            this.props.logout();
                            this.setState({
                                redirect: '/logowanie',
                            });
                        }
                    }
                }
            });
    };

    render() {
        // eslint-disable-next-line camelcase
        const { redirect, project, type_id, email, min_from, max_to, from, to, price, types } = this.state;
        return (
            <>
                <Helmet>
                    <title>Zamów reklamę - Oficjalny Portal Gminy Jarocin</title>
                    <meta
                        name="description"
                        content="Zamów reklamę w serwisie jarocin.pl - dotrzyj do tysięcy mieszkańców Gminy!"
                    />
                </Helmet>
                {redirect && <Redirect to={redirect} />}
                <LayoutCardWithTitleAndPath
                    category="Dla przedsiębiorców"
                    title="Miejsca reklamowe - zamów reklamę"
                    pathItems={[
                        { url: '/', label: 'Strona główna' },
                        { url: '/zamow-reklame', label: 'Zamów reklamę' },
                    ]}
                    className="ad-order"
                >
                    <BackgroundSquare variant="light-gray" />
                    <Row>
                        <Col lg={5} className="ad-form">
                            <Form onSubmit={this.submitOrder}>
                                {!this.props.token && (
                                    <div className="form-group">
                                        <Input
                                            label="Podaj email"
                                            onChange={e => this.setState({ email: e.target.value })}
                                            value={email}
                                            name="email"
                                            variant="shadow"
                                            size="lg"
                                            floating
                                        />
                                    </div>
                                )}
                                <div className="form-group">
                                    <FormCheck
                                        className="mb-3"
                                        custom
                                        type="radio"
                                        name="project"
                                        id="project-false"
                                        label="Mam projekt graficzny"
                                        onChange={() => this.changeProject(false)}
                                        checked={project === false}
                                    />
                                    <FormCheck
                                        className="mb-3"
                                        custom
                                        type="radio"
                                        name="project"
                                        id="project-true"
                                        label="Zamawiam projekt graficzny"
                                        onChange={() => this.changeProject(true)}
                                        checked={project === true}
                                    />
                                </div>
                                <Input
                                    label="Wybierz moduł reklamy"
                                    name="select"
                                    onChange={this.changeType}
                                    // eslint-disable-next-line camelcase
                                    value={type_id}
                                    select
                                    disabled={project === null}
                                    icon={faAngleDown}
                                    variant="shadow"
                                    size="lg"
                                    floating
                                >
                                    <option disabled />
                                    {types.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Input>
                                <Row className="gutters-sm">
                                    <Col xl={6}>
                                        <Input
                                            type="date"
                                            label="Od"
                                            name="from"
                                            // eslint-disable-next-line camelcase
                                            min={min_from}
                                            onChange={this.changeFrom}
                                            value={from}
                                            icon={faCalendarAlt}
                                            variant="shadow"
                                            // eslint-disable-next-line camelcase
                                            disabled={!type_id}
                                            size="lg"
                                            floating
                                        />
                                    </Col>
                                    <Col xl={6}>
                                        <Input
                                            type="date"
                                            label="Do"
                                            name="to"
                                            onChange={this.changeTo}
                                            value={to}
                                            min={from}
                                            // eslint-disable-next-line camelcase
                                            max={max_to}
                                            icon={faCalendarAlt}
                                            variant="shadow"
                                            disabled={!from}
                                            size="lg"
                                            floating
                                        />
                                    </Col>
                                </Row>
                                <h5 className={`price ${price ? 'active' : ''}`}>
                                    Koszt: <span>{price} zł</span>
                                </h5>
                                <Button type="submit" disabled={!price}>
                                    Zamawiam
                                </Button>
                            </Form>
                        </Col>
                        <Col lg={7} className="ad-examples">
                            <div className="img">
                                <img src={img} alt="Zobrazowanie miejsc reklamowych" className="img-fluid" />
                            </div>
                            <div className="button">
                                <Button>Zobacz miejsca reklamowe</Button>
                            </div>
                        </Col>
                    </Row>
                </LayoutCardWithTitleAndPath>
            </>
        );
    }
}

const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps, {
    logout: logOutAction,
})(AdOrder);

/*  title="todo"
                keywords="todo"
                description="todo"
                redirect={redirect}
                loading={loading} */
