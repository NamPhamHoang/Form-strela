import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { CSSTransition } from 'react-transition-group';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';
import Dropzone from 'react-dropzone';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { API_REPORT_PROBLEM_CATEGORIES_INDEX, API_REPORT_PROBLEM_INDEX, API_REPORT_PROBLEM_STORE } from '../../api';
import { changeHelper } from '../../helpers';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import TextAndDate from '../../components/Panel/Filters/TextAndDate';
import Input from '../../components/Input/Input';
import ValidationError from '../../components/ValidationError/ValidationError';

const LSelect = props => {
    const { children, ...rest } = props;
    return (
        <Input {...rest} select icon={faAngleDown} variant="shadow" size="lg" floating>
            <option disabled />
            {children}
        </Input>
    );
};

const LInput = props => <Input {...props} variant="shadow" size="lg" floating />;

class ReportProblem extends Component {
    state = {
        categories: [],
        form: {
            data: {
                category: '',
                subcategory: '',
                subsubcategory: '',
                content: '',
            },
            errors: {},
            photos: [],
        },
        problems: [],
        formVisible: false,
        problemsLoading: false,
        categoriesLoading: false,
        redirect: null,
    };

    componentDidMount() {
        this.fetchProblems();
        this.fetchCategories();
    }

    fetchCategories = () => {
        const API = API_REPORT_PROBLEM_CATEGORIES_INDEX;
        axios
            .get(API)
            .then(response => {
                this.setState({
                    categories: response.data.categories,
                    categoriesLoading: false,
                });
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        redirect: `/${error.response.status || 404}`,
                    });
                } else {
                    this.setState({
                        redirect: '/404',
                    });
                }
            });
    };

    fetchProblems = (filters = null) => {
        const API = new URL(API_REPORT_PROBLEM_INDEX);
        if (filters) {
            if (filters.text) API.searchParams.append('search', filters.text);
            if (filters.date) API.searchParams.append('date', filters.date);
        }
        axios
            .get(API.href)
            .then(response => {
                this.setState({
                    problems: response.data.reports,
                    problemsLoading: false,
                });
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        redirect: `/${error.response.status || 404}`,
                    });
                } else {
                    this.setState({
                        redirect: '/404',
                    });
                }
            });
    };

    handleSearch = values => {
        this.fetchProblems(values);
    };

    handleDrop = photos => {
        this.setState(state => {
            const form = { ...state.form };
            form.photos = photos.map(file => {
                file.url = URL.createObjectURL(file);
                return file;
            });
            return {
                form,
            };
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        let form = { ...this.state.form };
        const fd = new FormData();
        fd.append('content', form.data.content);
        if (form.data.subsubcategory) {
            fd.append('category_id', form.data.subsubcategory);
            fd.append('level', '3');
        } else if (form.data.subcategory) {
            fd.append('category_id', form.data.subcategory);
            fd.append('level', '2');
        } else if (form.data.category) {
            fd.append('category_id', form.data.category);
            fd.append('level', '1');
        }
        form.photos.forEach(item => fd.append('photos[]', item, item.name));
        axios
            .post(API_REPORT_PROBLEM_STORE, fd)
            .then(response => {
                NotificationManager.success('Pomyślnie wysłano zgłoszenie');
                this.setState(state => {
                    form = {
                        data: {
                            category: '',
                            subcategory: '',
                            subsubcategory: '',
                            content: '',
                        },
                        errors: {},
                        photos: [],
                    };
                    const problems = [...state.problems];
                    problems.push(response.data);
                    return {
                        problems,
                        form,
                        formVisible: false,
                    };
                });
            })
            .catch(error => {
                NotificationManager.error('Nie udało wysłać zgłoszenia');
                if (error.response) {
                    const { status } = error.response;
                    if (status === 422) {
                        form.errors = error.response.data.errors;
                        this.setState({ form });
                    } else {
                        this.setState({
                            redirect: `/${status}`,
                        });
                    }
                }
            });
    };

    handleChange = e => {
        const [name, value] = changeHelper(e);
        this.setState(prevState => {
            const form = { ...prevState.form };
            form.data[name] = value;

            return { form };
        });
    };

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

    showForm = () => {
        this.setState({
            formVisible: true,
        });
    };

    renderCategory = () => {
        const { form, categories } = this.state;
        return (
            <Col md={7}>
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
            </Col>
        );
    };

    renderSubcategory = () => {
        const { form, categories } = this.state;
        const category = categories.find(item => parseInt(item.id, 10) === parseInt(form.data.category, 10));
        if (category && category.children.length) {
            return (
                <Col md={7}>
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
                </Col>
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
            if (subcategory && subcategory.children.length) {
                return (
                    <Col md={7}>
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
                    </Col>
                );
            }
        }
        return null;
    };

    render() {
        const { form, redirect, problemsLoading, categoriesLoading, formVisible, problems } = this.state;
        const photosUploaded = form.photos.length !== 0;
        return (
            <PanelTemplate
                className="report-problem"
                redirect={redirect}
                loading={problemsLoading || categoriesLoading}
            >
                <SectionTitle>Zgłoś problem</SectionTitle>
                <CSSTransition in={formVisible} classNames="alert" timeout={300} unmountOnExit>
                    <Row>
                        <Col xs={12} md={11} lg={8} xl={7}>
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col xs={12}>
                                        <ValidationError error={form.errors.user} />
                                    </Col>
                                    {this.renderCategory()}
                                    {this.renderSubcategory()}
                                    {this.renderSubsubcategory()}
                                    <Col xs={12}>
                                        <ValidationError error={form.errors.category_id} />
                                    </Col>
                                    <Col md={12}>
                                        <LInput
                                            rows={10}
                                            textarea
                                            label="Treść problemu"
                                            name="content"
                                            value={form.data.content}
                                            error={form.errors.content}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                    <Col md={11}>
                                        <Dropzone onDrop={this.handleDrop}>
                                            {({ getRootProps, getInputProps }) => (
                                                <section className="dropzone-container">
                                                    <div
                                                        {...getRootProps({
                                                            className: `dropzone ${
                                                                photosUploaded ? 'flex-row' : 'flex-column'
                                                            }`,
                                                        })}
                                                    >
                                                        <input {...getInputProps()} />
                                                        {!photosUploaded && (
                                                            <>
                                                                <p className="label">
                                                                    Możesz dodać maksymalnie 8 zdjęć. <br />
                                                                    Przeciągnij zdjęcia lub kliknij i wybierz je z
                                                                    dysku.
                                                                </p>
                                                            </>
                                                        )}
                                                        {photosUploaded &&
                                                            form.photos.map(photo => (
                                                                <img
                                                                    src={photo.url}
                                                                    alt={`Zdjęcie użytkownika ${photo.name}`}
                                                                    className="image"
                                                                    key={photo.url}
                                                                />
                                                            ))}
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone>
                                    </Col>
                                    <Col xs={12}>
                                        <ValidationError error={form.errors.photos} />
                                    </Col>
                                    <Col xs={12}>
                                        <Button type="submit" className="btn btn-primary new-problem">
                                            <strong>Wyślij</strong> problem
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </CSSTransition>
                <CSSTransition in={!formVisible} classNames="alert" timeout={300} unmountOnExit>
                    <Button onClick={this.showForm} className="btn btn-primary new-problem">
                        <strong>Zgłoś</strong> nowy problem
                    </Button>
                </CSSTransition>
                <TextAndDate handleSearch={this.handleSearch} />
                <Table responsive size="sm" className="table-simple">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Numer zgłoszenia</th>
                            <th>Kategoria</th>
                            <th>Podkategoria</th>
                            <th>Podkategoria</th>
                            <th>Odpowiedź</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map(problem => (
                            <tr key={problem.id}>
                                <td>{moment(problem.created_at).format('DD.MM.YY')}</td>
                                <td>{problem.id}</td>
                                <td>{problem.category_name}</td>
                                <td>{problem.subcategory_name}</td>
                                <td>{problem.subsubcategory_name}</td>
                                <td>{problem.answer_content}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </PanelTemplate>
        );
    }
}

export default ReportProblem;
