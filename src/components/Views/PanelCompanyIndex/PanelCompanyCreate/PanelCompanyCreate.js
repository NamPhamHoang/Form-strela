import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { CSSTransition } from 'react-transition-group';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Input from '../../../Input/Input';
import { API_COMPANY_STORE } from '../../../../api';
import { NotificationManager } from 'react-notifications';
import Row from 'react-bootstrap/Row';

class PanelCompanyCreate extends Component {
    state = {
        formVisible: false,
        form: {
            data: {
                name: '',
            },
            errors: {},
        },
    };

    showForm = () => {
        this.setState({
            formVisible: true,
        });
    };

    submit = (e) => {
        e.preventDefault();
        const fd = this.state.form.data;
        axios.post(API_COMPANY_STORE, fd)
            .then(response => {
                NotificationManager.success('Pomyślnie dodano firmę');
                this.props.pushNewCompany(response.data);
                this.setState({
                    formVisible: false,
                });
            })
            .catch(error => {
                NotificationManager.error('Nie udało się dodać firmy');
            });
    };

    dataChange = (e) => {
        const { value, name } = e.target;
        this.setState((state) => {
            const form = { ...state.form };
            form.data[name] = value;
            return { form };
        });
    };

    render() {
        const { form, formVisible } = this.state;
        return (
            <div>
                <CSSTransition
                    in={formVisible}
                    classNames="alert"
                    timeout={300}
                    unmountOnExit
                >
                    <Row>
                        <Col xs={12} md={11} lg={8} xl={7}>
                            <Form onSubmit={this.submit}>
                                <Row>
                                    <Col>
                                        <Input
                                            groupClass="mt-2"
                                            label="Nazwa"
                                            name="name"
                                            variant="shadow"
                                            size="lg"
                                            floating
                                            value={form.data.name}
                                            error={form.errors.name}
                                            onChange={this.dataChange}
                                        />
                                    </Col>
                                </Row>
                                <Button type="submit" size="sm" className="mt-3 mb-4 text-white">
                                    Wyślij
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </CSSTransition>
                {!formVisible && (
                    <Button onClick={this.showForm} size="sm" className="mt-3 mb-4 text-white">
                        Dodaj nową firmę
                    </Button>
                )}
            </div>
        );
    }
}

export default PanelCompanyCreate;