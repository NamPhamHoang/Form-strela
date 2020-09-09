import React, { Component } from 'react';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import Input from '../../../Input/Input';
import ConsultantCard from '../../../Cards/ConsultantCard/ConsultantCard';
import { API_EOFFICE_FIND_CONTACT } from '../../../../api';

const LSelect = props => {
    const { children, ...rest } = props;
    return (
        <Input {...rest} select icon={faAngleDown} variant="shadow" size="lg" floating>
            <option disabled />
            {children}
        </Input>
    );
};

class Contact extends Component {
    state = {
        form: {
            data: {
                category: '',
                subcategory: '',
                subsubcategory: '',
            },
        },
        categories: [],
    };

    componentDidMount() {
        axios
            .get(API_EOFFICE_FIND_CONTACT)
            .then(response => {
                this.setState({
                    categories: response.data,
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się pobrać osób kontaktowych');
            });
    }

    handleCategoryChange = (e, level) => {
        const { value } = e.target;
        this.setState(state => {
            const form = { ...state.form };
            if (level === 1) {
                form.data.category = value;
                form.data.subcategory = '';
                form.data.subsubcategory = '';
            } else if (level === 2) {
                form.data.subcategory = value;
                form.data.subsubcategory = '';
            } else if (level === 3) {
                form.data.subsubcategory = value;
            }
            return { form };
        });
    };

    renderCategory = () => {
        const { form, categories } = this.state;
        return (
            <LSelect
                label="Kategoria"
                name="category"
                value={form.data.category}
                onChange={e => this.handleCategoryChange(e, 1)}
            >
                {categories.map(({ id, name }) => (
                    <option key={id} value={id}>
                        {name}
                    </option>
                ))}
            </LSelect>
        );
    };

    renderSubcategory = () => {
        const { form, categories } = this.state;
        const category = categories.find(item => parseInt(item.id, 10) === parseInt(form.data.category, 10));
        if (category && !category.contact) {
            return (
                <LSelect
                    label="Podkategoria"
                    name="subcategory"
                    value={form.data.subcategory}
                    onChange={e => this.handleCategoryChange(e, 2)}
                >
                    {category.children.map(({ id, name }) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    ))}
                </LSelect>
            );
        }
        return null;
    };

    renderSubsubcategory = () => {
        const { form, categories } = this.state;
        const category = categories.find(item => parseInt(item.id, 10) === parseInt(form.data.category, 10));
        if (category) {
            const subcategory = category.children.find(
                item => parseInt(item.id, 10) === parseInt(form.data.subcategory, 10),
            );
            if (subcategory && !subcategory.contact) {
                return (
                    <LSelect
                        label="Podpodkategoria"
                        name="subsubcategory"
                        value={form.data.subsubcategory}
                        onChange={e => this.handleCategoryChange(e, 3)}
                    >
                        {subcategory.children.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </LSelect>
                );
            }
        }
        return null;
    };

    renderConsultantCard = () => {
        const { form, categories } = this.state;
        const category = categories.find(item => parseInt(item.id, 10) === parseInt(form.data.category, 10));
        let contact = null;
        if (category) {
            if (category.contact) {
                // eslint-disable-next-line prefer-destructuring
                contact = category.contact;
            } else {
                const subcategory = category.children.find(
                    item => parseInt(item.id, 10) === parseInt(form.data.subcategory, 10),
                );
                if (subcategory) {
                    if (subcategory.contact) {
                        // eslint-disable-next-line prefer-destructuring
                        contact = subcategory.contact;
                    } else {
                        const subsubcategory = subcategory.children.find(
                            item => parseInt(item.id, 10) === parseInt(form.data.subsubcategory, 10),
                        );
                        if (subsubcategory) {
                            // eslint-disable-next-line prefer-destructuring
                            contact = subsubcategory.contact;
                        }
                    }
                }
            }
        }
        if (contact) {
            return (
                <ConsultantCard
                    key={`${form.data.category}-${form.data.subcategory}-${form.data.subsubcategory}`}
                    img={contact.photoUrl}
                    name={`${contact.first_name} ${contact.last_name}`}
                    position={contact.position}
                    phone={contact.phone}
                    email={contact.email}
                />
            );
        }

        return null;
    };

    render() {
        return (
            <Row className="page-container e-office-contact">
                <Col lg={8}>
                    <Form>
                        {this.renderCategory()}
                        {this.renderSubcategory()}
                        {this.renderSubsubcategory()}
                        {this.renderConsultantCard()}
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default Contact;
