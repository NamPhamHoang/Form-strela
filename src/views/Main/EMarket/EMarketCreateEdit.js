import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import { faLayerPlus } from '@fortawesome/pro-light-svg-icons';
import { faAngleDown, faAngleLeft, faAngleRight, faTimes } from '@fortawesome/pro-regular-svg-icons';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import CKEditor from 'ckeditor4-react';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, FormCheck } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { NotificationManager } from 'react-notifications';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Input from '../../../components/Input/Input';
import { changeHelper } from '../../../helpers';
import {
    API_EMARKET_CATEGORIES,
    API_EMARKET_PANEL_EDIT,
    API_EMARKET_PANEL_STORE,
    API_EMARKET_PANEL_UPDATE,
} from '../../../api';
import Path from '../../../components/Path/Path';
import LayoutCard from '../../../components/Cards/LayoutCards/LayoutCard';
import BackgroundSquare from '../../../components/BackgroundSquare/BackgroundSquare';
import SectionTitle from '../../../components/Titles/SectionTitle/SectionTitle';
import Title from '../../../components/Titles/Title/Title';
import ValidationError from '../../../components/ValidationError/ValidationError';

class EMarketCreateEdit extends Component {
    state = {
        form: {
            data: {
                category: '',
                subcategory: '',
                subsubcategory: '',
                title: '',
                description: '',
                location: '',
                name: '',
                email: '',
                phone: '',
                accepted: false,
                images: [],
                fields: [],
            },
            errors: {},
        },
        filters: [],
        // filtersLoading: true,
        // dataLoading: true,
        redirect: null,
    };

    id = this.props.match.params.id;

    isEdit = !!this.id;

    actionType = this.isEdit ? 'Edytuj' : 'Dodaj';

    componentDidMount() {
        this.fetchFilters();
        this.fetchData();
    }

    getProperCategory = () => {
        const { category, subsubcategory, subcategory } = this.state.form.data;
        if (subsubcategory) return subsubcategory;
        if (subcategory) return subcategory;
        if (category) return category;
        return null;
    };

    getDataToSubmit = () => {
        const { data } = this.state.form;
        const fd = new FormData();
        fd.append('category_id', this.getProperCategory());
        ['title', 'description', 'location', 'email', 'phone', 'name', 'accepted'].forEach(item =>
            fd.append(item, data[item]),
        );
        let i = 0;
        data.fields.forEach(item => {
            fd.append(`fields[${i}][id]`, item.id || item.category_filter_id);
            fd.append(`fields[${i}][value]`, item.value);
            i += 1;
        });
        i = 0;
        data.images.forEach(item => {
            if (item.id) fd.append(`images[${i}][id]`, item.id);
            if (item.toDelete != null) fd.append(`images[${i}][toDelete]`, item.toDelete ? '1' : '0');
            if (item.order) fd.append(`images[${i}][order]`, item.order);
            if (item.file) fd.append(`images[${i}][file]`, item.file, item.file.name);
            i += 1;
        });
        if (this.isEdit) fd.append('_method', 'PUT');

        return fd;
    };

    getApiToSubmit = () => {
        const { id } = this.props.match.params;
        return this.isEdit ? API_EMARKET_PANEL_UPDATE(id) : API_EMARKET_PANEL_STORE;
    };

    submit = e => {
        e.preventDefault();
        const { form } = this.state;
        const fd = this.getDataToSubmit();
        const API = this.getApiToSubmit();
        axios
            .post(API, fd)
            .then(response => {
                NotificationManager.success(`Pomyślnie ${this.isEdit ? 'edytowano' : 'dodano'} ogłoszenie`);
                this.setState({
                    redirect: `/e-targ/${response.data.ad.slug}`,
                });
            })
            .catch(error => {
                NotificationManager.error(
                    `Nie udało się ${this.isEdit ? 'edytować' : 'dodać'} ogłoszenia. Sprawdź błędy`,
                );
                if (error.response) {
                    const { status } = error.response;
                    if (status === 422) {
                        form.errors = error.response.data.errors;
                        this.setState({ form });
                    } else {
                        // this.setState({
                        //     redirect: `/${status}`,
                        // });
                    }
                }
            });
    };

    fetchFilters = () => {
        axios
            .get(API_EMARKET_CATEGORIES)
            .then(response => {
                this.setState({
                    filters: response.data.categories,
                    // filtersLoading: false,
                });
            })
            .catch(error => {
                this.setState({
                    redirect: `/${error.response.status || '404'}`,
                });
            });
    };

    getProperCategoriesFromFetch = categories => {
        const properCategories = {
            category: '',
            subcategory: '',
            subsubcategory: '',
        };
        if (categories.length === 1) {
            properCategories.category = categories[0].id;
        } else if (categories.length === 2) {
            properCategories.subcategory = categories[0].id;
            properCategories.category = categories[1].id;
        } else if (categories.length === 3) {
            properCategories.subsubcategory = categories[0].id;
            properCategories.subcategory = categories[1].id;
            properCategories.category = categories[2].id;
        }

        return properCategories;
    };

    fetchData = () => {
        if (this.isEdit) {
            const API = API_EMARKET_PANEL_EDIT(this.id);
            axios
                .get(API)
                .then(response => {
                    const { ad, categories } = response.data;
                    const properCategories = this.getProperCategoriesFromFetch(categories);
                    this.setState(state => {
                        const form = { ...state.form };
                        form.data = {
                            category: '',
                            subcategory: '',
                            subsubcategory: '',
                            title: ad.title,
                            description: ad.description,
                            location: ad.location,
                            name: ad.name,
                            email: ad.email,
                            phone: ad.phone,
                            accepted: false,
                            images: ad.photos.map(item => {
                                item.toDelete = false;
                                return item;
                            }),
                            fields: ad.fields,
                        };
                        form.data = { ...form.data, ...properCategories };
                        return { form, dataLoading: false };
                    });
                })
                .catch(error => {
                    NotificationManager.error('Nie udało się pobrać ogłoszenia');
                    if (error.response) {
                        this.setState({
                            redirect: `/${error.response.status}`,
                        });
                    }
                });
        } else {
            /* this.setState({
                // dataLoading: false,
            }); */
        }
    };

    changeCategory = id => {
        this.setState(state => {
            const form = { ...state.form };
            form.data.category = id;
            form.data.subcategory = '';
            form.data.subsubcategory = '';
            form.data.fields = form.data.fields.filter(field => ['cena'].includes(field.name));
            return { form };
        });
    };

    changeSubcategory = e => {
        const { value } = e.target;
        this.setState(state => {
            const form = { ...state.form };
            form.data.subcategory = value;
            form.data.subsubcategory = '';
            return { form };
        });
    };

    changeSubsubcategory = e => {
        const { value } = e.target;
        this.setState(state => {
            const form = { ...state.form };
            form.data.subsubcategory = value;
            return { form };
        });
    };

    handleChange = e => {
        const [name, value] = changeHelper(e);
        this.setState(state => {
            const form = { ...state.form };
            form.data[name] = value;
            return {
                form,
            };
        });
    };

    handleFieldsChange = field => {
        this.setState(state => {
            const form = { ...state.form };
            const index = form.data.fields.findIndex(
                item => item.id === field.id || item.category_filter_id === field.id,
            );
            if (index !== -1) {
                form.data.fields[index] = field;
            } else {
                form.data.fields.push(field);
            }
            return { form };
        });
    };

    /*
        togglePromotion = (time) => {
            const form = { ...this.state.form };
            form.data.promotion = form.data.promotion === time ? null : time;
            this.setState({ form });
        };

    */

    getSubcategories = () => {
        const { form, filters } = this.state;
        if (!form.data.category) return null;
        const category = filters.find(filter => filter.id === form.data.category);
        if (!category || !category.children.length) return null;
        return (
            <Input
                label="Podkategoria*"
                name="subcategory"
                onChange={this.changeSubcategory}
                value={form.data.subcategory}
                select
                icon={faAngleDown}
                variant="shadow"
                size="lg"
                floating
            >
                <option disabled />
                {category.children.map(subcategory => (
                    <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                    </option>
                ))}
            </Input>
        );
    };

    getSubsubcategories = () => {
        const { form, filters } = this.state;
        if (!form.data.category || form.data.subcategory) return null;
        const category = filters.find(cat => cat.id === form.data.category);
        if (!category) return null;
        const subcategory = category.children.find(subc => subc.id === form.data.subcategory);
        if (!subcategory || !subcategory.children.length) return null;

        return (
            <Input
                label="Podpodkategoria*"
                name="subsubcategory"
                onChange={this.changeSubsubcategory}
                value={form.data.subsubcategory}
                select
                icon={faAngleDown}
                variant="shadow"
                size="lg"
                floating
            >
                <option disabled />
                {subcategory.children.map(subc => (
                    <option key={subc.id} value={subc.id}>
                        {subc.name}
                    </option>
                ))}
            </Input>
        );
    };

    getFields = () => {
        const { form, filters } = this.state;
        if (!filters.length) return null;
        const { category, subcategory, subsubcategory } = form.data;
        const categoryItem = category
            ? filters.find(item => item.id === category)
            : {
                  children: [],
                  fields: [],
              };
        let fieldsToMap = [];
        if (subsubcategory) {
            fieldsToMap = categoryItem.children
                .find(item => item.id === parseInt(subcategory, 10))
                .children.find(item => item.id === parseInt(subsubcategory, 10)).fields;
        } else if (subcategory) {
            fieldsToMap = categoryItem.children.find(item => item.id === parseInt(subcategory, 10)).fields;
        } else if (category) {
            fieldsToMap = categoryItem.fields;
        }

        return fieldsToMap.map(item => {
            const attrs = {
                label: item.name,
                name: item.name,
                variant: 'shadow',
                size: 'lg',
                floating: true,
                onChange: e => {
                    const field = {
                        // eslint-disable-next-line camelcase
                        category_filter_id: item.id,
                        id: item.id,
                        name: item.name,
                        value: e.target.value,
                        typeField: item.typeField,
                    };
                    this.handleFieldsChange(field);
                },
                value: (() => {
                    const field = form.data.fields.find(fi => fi.id === item.id || fi.category_filter_id === item.id);
                    return field ? field.value : '';
                })(),
                errors: (() => {
                    let error;
                    if (form.errors.fields) {
                        error =
                            form.errors.fields.find(fi => fi.id === item.id || fi.category_filter_id === item.id) ||
                            undefined;
                    } else {
                        error = undefined;
                    }
                    return error;
                })(),
            };
            if (item.typeField === 1) attrs.type = 'number';
            if (item.typeField === 5) attrs.type = 'date';
            if (item.typeField === 4) {
                attrs.multiple = true;
            }
            if ([2, 4].includes(item.typeField)) {
                attrs.icon = faAngleDown;
                attrs.select = true;
                attrs.children = [
                    <option disabled key={0} />,
                    ...item.values.map(({ value, id }) => (
                        <option value={value} key={id}>
                            {value}
                        </option>
                    )),
                ];
            }
            if (item.typeField === 6) {
                const value = (() => {
                    const field = form.data.fields.find(fi => fi.id === item.id || fi.category_filter_id === item.id);
                    return field ? field.value === 'Tak' : false;
                })();
                const error = (() => {
                    let err;
                    if (form.errors.fields) {
                        err =
                            form.errors.fields.find(fi => fi.id === item.id || fi.category_filter_id === item.id) ||
                            undefined;
                    } else {
                        err = undefined;
                    }
                    return err;
                })();
                const checkbox = {
                    label: item.name,
                    name: item.name,
                    id: item.name,
                    custom: true,
                    type: 'checkbox',
                    className: 'mb-3',
                    onChange: e => {
                        const field = {
                            // eslint-disable-next-line camelcase
                            category_filter_id: item.id,
                            id: item.id,
                            name: item.name,
                            value: e.target.checked ? 'Tak' : 'Nie',
                            typeField: item.typeField,
                        };
                        this.handleFieldsChange(field);
                    },
                    checked: value,
                };
                return (
                    <>
                        <FormCheck key={`${item.id} - ${item.name}`} {...checkbox} />
                        {error && <div className="invalid-feedback d-block">{error[0]}</div>}
                    </>
                );
            }

            return <Input key={`${item.id} - ${item.name}`} {...attrs} />;
        });
    };

    sortImages = images => {
        return images.sort((a, b) => {
            if (a.toDelete) return false;
            return a.order - b.order;
        });
    };

    handleDrop = photos => {
        this.setState(state => {
            const form = { ...state.form };
            const { images } = form.data;
            let lastOrder = 0;
            images.forEach(image => {
                if (image.order > lastOrder) {
                    lastOrder = image.order;
                }
            });
            const newImages = photos.map(file => {
                lastOrder += 1;
                return {
                    photoUrl: URL.createObjectURL(file),
                    id: -1,
                    order: lastOrder,
                    toDelete: false,
                    file,
                };
            });
            form.data.images = this.sortImages([...images, ...newImages]);
            return { form };
        });
    };

    deletePhoto = index => {
        this.setState(state => {
            const form = { ...state.form };
            if (form.data.images[index].file) {
                form.data.images.splice(index, 1);
            } else {
                form.data.images[index].toDelete = true;
                form.data.images = this.sortImages(form.data.images);
            }
            return { form };
        });
    };

    changePhotoOrderHigher = index => {
        const nextIndex = index - 1;
        if (nextIndex < 0) return;
        this.setState(state => {
            const form = { ...state.form };
            const item = form.data.images[index];
            const nextItem = form.data.images[nextIndex];
            const nextItemOrder = item.order;
            item.order = nextItem.order;
            nextItem.order = nextItemOrder;
            form.data.images[index] = item;
            form.data.images[nextIndex] = nextItem;
            form.data.images = this.sortImages(form.data.images);
            return { form };
        });
    };

    changePhotoOrderLower = index => {
        const prevIndex = index + 1;
        this.setState(state => {
            const form = { ...state.form };
            if (prevIndex >= form.data.images.length) return {};
            const item = form.data.images[index];
            const prevItem = form.data.images[prevIndex];
            const prevItemOrder = item.order;
            item.order = prevItem.order;
            prevItem.order = prevItemOrder;
            form.data.images[index] = item;
            form.data.images[prevIndex] = prevItem;
            form.data.images = this.sortImages(form.data.images);
            return { form };
        });
    };

    generatePreviewLink = () => {
        const { data } = this.state.form;
        let fd = {
            title: data.title,
            description: data.description,
            location: data.location,
            email: data.email,
            phone: data.phone,
            name: data.name,
            fields: data.fields,
        };
        fd = JSON.stringify(fd);
        const url = new URL(`${window.location.origin}/e-targ/podglad`);
        url.searchParams.set('data', fd);
        return url.href;
    };

    render() {
        const { form, redirect, filters } = this.state;
        const photosUploaded = form.data.images.length !== 0;

        return (
            <>
                <Helmet>
                    <title>eTarg - Dodaj ogłoszenie - Oficjalny Portal Gminy Jarocin</title>
                    <meta name="description" content="eTarg - sprzedaż, wynajem, zamiana - dodaj swoje ogłoszenie!" />
                </Helmet>
                {redirect && <Redirect to={redirect} />}
                <Path
                    items={[
                        { url: '/', label: 'Strona główna' },
                        { url: '/e-targ', label: 'E-targ' },
                        {
                            url: `/e-targ/${this.isEdit ? `edytuj/${this.slug}` : 'dodaj'}`,
                            label: `${this.actionType} ogłoszenie`,
                        },
                    ]}
                />
                <LayoutCard className="e-market-create front-forms">
                    <BackgroundSquare />
                    <BackgroundSquare className="second" />
                    <Row>
                        <Col>
                            <SectionTitle>Dla mieszkańców</SectionTitle>
                            <Title>E-targ</Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span className="blue-title">
                                <FontAwesomeIcon icon={faLayerPlus} /> {this.actionType} ogłoszenie
                            </span>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} lg={9}>
                            <Form onSubmit={this.submit}>
                                <Row className="category-buttons gutters-md mb-4">
                                    {filters.map(filter => {
                                        return (
                                            <Col xs={6} sm={4} md={3} xl={2} key={filter.id}>
                                                <Button
                                                    className={`btn-wide-icon ${
                                                        form.data.category === filter.id ? 'active' : ''
                                                    }`}
                                                    onClick={() => this.changeCategory(filter.id)}
                                                    variant={null}
                                                >
                                                    <img
                                                        src={filter.image}
                                                        alt="test"
                                                        className="img-fluid icon"
                                                        style={{ maxHeight: 25 }}
                                                    />
                                                    <span className="text">{filter.name}</span>
                                                </Button>
                                            </Col>
                                        );
                                    })}
                                </Row>
                                <ValidationError error={form.errors.category_id} />
                                {this.getSubcategories()}
                                {this.getSubsubcategories()}
                                <Input
                                    label="Tytuł*"
                                    name="title"
                                    onChange={this.handleChange}
                                    value={form.data.title}
                                    error={form.errors.title}
                                    variant="shadow"
                                    size="lg"
                                    floating
                                />
                                {this.getFields()}

                                <CKEditor
                                    data={form.data.description}
                                    config={{
                                        language: 'pl',
                                        height: 300,
                                        // eslint-disable-next-line camelcase
                                        resize_enabled: false,
                                        toolbar: [{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline'] }],
                                    }}
                                    onChange={event => {
                                        const data = event.editor.getData();
                                        this.setState(state => {
                                            const newForm = { ...state.form };
                                            newForm.data.description = data;
                                            return {
                                                newForm,
                                            };
                                        });
                                    }}
                                />
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
                                                <>
                                                    <p className="label">
                                                        Możesz dodać maksymalnie 8 zdjęć. <br />
                                                        Przeciągnij zdjęcia lub kliknij i wybierz je z dysku.
                                                    </p>
                                                    <p className="hint">
                                                        Podpowiedź: Dodając zdjęcie możesz trzykrotnie zwiększyć szansę
                                                        swojego ogłoszenia
                                                    </p>
                                                </>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                                <div className="img-manager-container">
                                    {photosUploaded &&
                                        form.data.images.map((photo, index) => {
                                            if (photo.toDelete) return null;
                                            return (
                                                // eslint-disable-next-line react/no-array-index-key
                                                <div className="img-manager" key={`${photo.id} - ${index}`}>
                                                    <div className="img-container">
                                                        <img
                                                            src={photo.photoUrl}
                                                            alt={`Zdjęcie użytkownika ${photo.name}`}
                                                        />
                                                    </div>
                                                    <Button
                                                        className="next-button"
                                                        onClick={() => this.changePhotoOrderHigher(index)}
                                                    >
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </Button>
                                                    <Button
                                                        className="prev-button"
                                                        onClick={() => this.changePhotoOrderLower(index)}
                                                    >
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        className="delete-button"
                                                        onClick={() => this.deletePhoto(index)}
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                </div>

                                <Row>
                                    <Col lg={6}>
                                        <Input
                                            label="Lokalizacja*"
                                            name="location"
                                            onChange={this.handleChange}
                                            value={form.data.location}
                                            error={form.errors.location}
                                            variant="shadow"
                                            size="lg"
                                            floating
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Input
                                            label="Twoje imię*"
                                            name="name"
                                            onChange={this.handleChange}
                                            value={form.data.name}
                                            error={form.errors.name}
                                            variant="shadow"
                                            size="lg"
                                            floating
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Input
                                            label="Adres e-mail*"
                                            name="email"
                                            onChange={this.handleChange}
                                            value={form.data.email}
                                            error={form.errors.email}
                                            variant="shadow"
                                            size="lg"
                                            floating
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Input
                                            label="Numer telefonu*"
                                            name="phone"
                                            onChange={this.handleChange}
                                            value={form.data.phone}
                                            error={form.errors.phone}
                                            variant="shadow"
                                            size="lg"
                                            floating
                                        />
                                    </Col>
                                </Row>
                                <FormCheck
                                    className="mb-3"
                                    custom
                                    type="checkbox"
                                    name="accepted"
                                    id="accepted"
                                    label="Oświadczam, iż zapoznałem się i akceptuję postanowienia regulaminu serwisu internetowego jarocin.pl"
                                    onChange={this.handleChange}
                                    checked={form.data.accepted}
                                    isInvalid={!!form.errors.accepted}
                                />
                                <Row className="justify-content-center">
                                    <Col xl={11}>
                                        <div className="add-without">
                                            <div>
                                                <a
                                                    className="btn btn-gray"
                                                    href={this.generatePreviewLink()}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Zobacz ogłoszenie przed dodaniem
                                                </a>
                                            </div>
                                            <div>
                                                <Button type="submit">{this.actionType} ogłoszenie za darmo</Button>
                                            </div>
                                        </div>
                                        {/* <h6 className="text-center my-4 h5">lub dodaj ogłoszenie Z PROMOWANIEM</h6>
                                        <div className="promotion-type">
                                            <div>
                                                <PromotionButton
                                                    togglePromotion={this.togglePromotion}
                                                    time="7"
                                                    price="12,99"
                                                    active={form.data.promotion === '7'}
                                                />
                                            </div>
                                            <div>
                                                <PromotionButton
                                                    togglePromotion={this.togglePromotion}
                                                    time="14"
                                                    price="16,99"
                                                    active={form.data.promotion === '14'}
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            type="submit"
                                            className="btn-block add-with-promotion"
                                            disabled={form.data.promotion === null}
                                        >
                                            Dodaj ogłoszenie z promowaniem
                                        </Button> */}
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </LayoutCard>
            </>
        );
    }
}

export default EMarketCreateEdit;

/*
 *
 *
 *
 * loading={filtersLoading || dataLoading} redirect={redirect} */
