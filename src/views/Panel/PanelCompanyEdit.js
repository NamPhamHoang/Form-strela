import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { faClock, faHandPaper, faTimes } from '@fortawesome/pro-light-svg-icons';
import Dropzone from 'react-dropzone';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { FormCheck } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import DragAndDropList from '../../components/DragAndDropList/DragAndDropList';
import {
    API_COMPANY_EDIT,
    API_COMPANY_PHOTO_DELETE,
    API_COMPANY_PHOTO_REORDER,
    API_COMPANY_PHOTO_STORE,
    API_COMPANY_UPDATE,
} from '../../api';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import PanelTemplate from '../../templates/PanelTemplate';
import { changeHelper, getData, nominatimURL, setData } from '../../helpers';
import Input from '../../components/Input/Input';
import { changeActiveCompanyAction } from '../../actions';

/*
 * Todo: Informacje w Menu Restauracji
 * TODO: Collapse i overflow w Bazie firm
 * TODO: Pobieranie z GUSU
 * */

const LInput = props => {
    return <Input {...props} variant="shadow" size="lg" floating />;
};

const ButtonWideImage = props => {
    const className = `${props.className} ${props.active ? 'active' : ''} btn-wide-icon`;
    return (
        <Button className={className} onClick={props.onClick} href={props.href} variant={null}>
            <img src={props.icon} className="icon" alt={props.alt} />
            <span className="text">{props.children}</span>
        </Button>
    );
};

const TimeLabelInput = props => {
    return (
        <Col xs={12} md={6}>
            <LInput {...props} icon={faClock} variant="shadow" size="lg" floating groupClass="time-input" />
        </Col>
    );
};

const TimeInput = props => {
    const { day, ...other } = props;
    return <TimeLabelInput label={`${day} - godziny otwarcia`} {...other} />;
};

class PanelCompanyEdit extends Component {
    state = {
        form: {
            data: {},
            errors: {},
            logo: null,
        },
        photos: {
            items: [],
            columns: {
                'col-1': {
                    id: 'col-1',
                    title: 'Zdjęcia',
                    ids: [],
                },
            },
            columnOrder: ['col-1'],
        },
        logoUrl: null,
        categories: [],
        redirect: null,
        loading: true,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const { id } = this.props.panelCompany;
        if (!id) {
            this.setState({
                redirect: '/panel/firma/firmy',
            });
        } else {
            const API = API_COMPANY_EDIT(id);
            axios
                .get(API)
                .then(response => {
                    this.setState(state => {
                        const form = { ...state.form };
                        const photos = { ...state.photos };
                        const { company, photos: responsePhotos, ...rest } = response.data;
                        form.errors = {};
                        form.data = getData(company);
                        const ids = responsePhotos.map((item, index) => index);
                        photos.items = responsePhotos;
                        photos.columns['col-1'].ids = ids;
                        this.props.changeActiveCompany(
                            this.props.panelCompany.id,
                            form.data.name,
                            form.data.category_id,
                        );
                        return {
                            form,
                            company,
                            photos,
                            ...rest,
                            loading: false,
                        };
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
        }
    };

    changePhotoOrder = result => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const column = this.state.photos.columns[source.droppableId];
        const newIds = [...column.ids];

        const index = this.state.photos.items.findIndex(item => item.id === draggableId);
        newIds.splice(source.index, 1);
        newIds.splice(destination.index, 0, index);

        const newColumn = {
            ...column,
            ids: newIds,
        };

        this.setState(state => {
            const newPhotos = {
                ...state.photos,
                columns: {
                    ...state.photos.columns,
                    [newColumn.id]: newColumn,
                },
            };
            return {
                photos: newPhotos,
            };
        });

        const orders = newIds.map((item, orderIndex) => ({
            id: this.state.photos.items[item].id,
            order: orderIndex + 1,
        }));

        const API = API_COMPANY_PHOTO_REORDER(this.props.panelCompany.id);

        axios
            .post(API, { orders })
            .then(() => {
                NotificationManager.success('Pomyślnie zmieniono kolejność zdjęć');
            })
            .catch(() => {
                NotificationManager.error('Nie udało się zmienić kolejności zdjęć');
            });
    };

    submitForm = async e => {
        e.preventDefault();
        const data = { ...this.state.form.data };
        const fd = setData(data);
        const nominatimAPI = nominatimURL(data.city, data.postal, data.street, data.number);
        await axios.get(nominatimAPI).then(response => {
            const { data: newData } = response;
            if (newData.length > 0) {
                fd.append('lat', newData[0].lat);
                fd.append('long', newData[0].lon);
            }
        });
        if (this.state.form.logo) fd.append('logo', this.state.form.logo);
        const API = API_COMPANY_UPDATE(this.props.panelCompany.id);
        axios
            .post(API, fd)
            .then(() => {
                this.fetchData();
                NotificationManager.success('Pomyślnie zaktualizowano dane');
                this.setState(state => {
                    const form = { ...state.form };
                    form.errors = {};
                    return { form };
                });
            })
            .catch(error => {
                if (error.response.status === 422) {
                    this.setState(state => {
                        console.log(error.response.data.errors);
                        const form = { ...state.form };
                        form.errors = error.response.data.errors;
                        NotificationManager.error('Nie udało się edytować danych');
                        return { form };
                    });
                } else {
                    this.setState({
                        redirect: `/${error.response.status || 404}`,
                    });
                }
            });
    };

    handleAdd = files => {
        const API = API_COMPANY_PHOTO_STORE(this.props.panelCompany.id);
        const fd = new FormData();
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            fd.append('photos[]', file, file.name);
        }
        axios
            .post(API, fd)
            .then(response => {
                NotificationManager.success('Pomyślnie dodano zdjęcie');
                this.setState(state => {
                    const photos = { ...state.photos };
                    const photosData = photos.items.concat(response.data.photos);
                    photos.items = photosData;
                    const ids = photos.items.map((item, index) => index);
                    photos.columns['col-1'].ids = ids;
                    return {
                        photos,
                    };
                });
            })
            .catch(error => {
                const err = error.response.data.errors;
                const keys = Object.keys(err);
                const message = err[keys[0]];

                NotificationManager.error(message);
            });
    };

    handleDrop = photos => {
        this.setState(state => {
            const form = { ...state.form };
            // eslint-disable-next-line prefer-destructuring
            form.logo = photos.map(file => {
                file.url = URL.createObjectURL(file);
                return file;
            })[0];
            return { form };
        });
    };

    handleDelete = id => {
        const API = API_COMPANY_PHOTO_DELETE(this.props.panelCompany.id, id);
        axios
            .delete(API, {})
            .then(() => {
                this.setState(state => {
                    const photos = { ...state.photos };
                    const index = photos.items.findIndex(item => item.id === id);
                    photos.items.splice(index, 1);
                    photos.columns['col-1'].ids = photos.items.map((item, photoIndex) => photoIndex);
                    return {
                        photos,
                    };
                });
            })
            .catch(error => console.log(error.response));
    };

    handleCategoryChange = category => {
        this.setState(prevState => {
            const form = { ...prevState.form };
            // eslint-disable-next-line camelcase
            form.data.category_id = category;
            return { form };
        });
    };

    handleDataChange = e => {
        const [name, value] = changeHelper(e);
        this.setState(prevState => {
            const form = { ...prevState.form };

            if (
                [
                    'mondayFrom',
                    'mondayTo',
                    'tuesdayFrom',
                    'tuesdayTo',
                    'wednesdayFrom',
                    'wednesdayTo',
                    'thursdayFrom',
                    'thursdayTo',
                    'fridayFrom',
                    'fridayTo',
                    'saturdayFrom',
                    'saturdayTo',
                    'sundayFrom',
                    'sundayTo',
                ].includes(name)
            ) {
                form.data[name] = `${value}:00`;
            } else {
                form.data[name] = value;
            }

            return { form };
        });
    };

    generatePreviewLink = () => {
        const { form, logoUrl, photos } = this.state;
        const { data } = form;
        let fd = {
            // eslint-disable-next-line camelcase
            category_id: data.category_id,
            name: data.name,
            nip: data.nip,
            email: data.email,
            street: data.street,
            number: data.number,
            postal: data.postal,
            city: data.city,
            website: data.website,
            phone: data.phone,
            description: data.description,
            lat: data.lat,
            long: data.long,
        };
        if (form.logo) {
            fd.logo = URL.createObjectURL(form.logo);
        } else if (logoUrl) {
            fd.logo = logoUrl;
        }
        fd.photos = photos.items.map(item => ({
            id: item.id,
            url: item.photoUrl,
        }));
        if (data.opening_hours) {
            fd.openingHours = {
                monday: data.monday,
                tuesday: data.tuesday,
                wednesday: data.wednesday,
                thursday: data.thursday,
                friday: data.friday,
                saturday: data.saturday,
                sunday: data.sunday,
            };
        }
        fd = JSON.stringify(fd);
        const url = new URL(`${window.location.origin}/baza-firm/firma/podglad`);
        url.searchParams.set('data', fd);
        return url.href;
    };

    render() {
        const { form, loading, redirect, categories, photos, logoUrl } = this.state;
        return (
            <PanelTemplate loading={loading} redirect={redirect} company className="my-company has-list">
                <SectionTitle>Moja firma</SectionTitle>
                <Form onSubmit={this.submitForm}>
                    <div className="categories-container">
                        {categories.map(({ icon, value, text }) => (
                            <div key={value}>
                                <ButtonWideImage
                                    icon={icon}
                                    active={form.data.category_id === value}
                                    onClick={() => this.handleCategoryChange(value)}
                                >
                                    {text}
                                </ButtonWideImage>
                            </div>
                        ))}
                    </div>
                    <Row className="form-group-spacing-md mt-4">
                        <Col xs={12} xl={9}>
                            <LInput
                                label="Nazwa firmy*"
                                name="name"
                                value={form.data.name}
                                error={form.errors.name}
                                onChange={this.handleDataChange}
                            />
                            <LInput
                                label="Numer telefonu*"
                                name="phone"
                                value={form.data.phone}
                                error={form.errors.phone}
                                onChange={this.handleDataChange}
                            />
                            <LInput
                                label="Adres e-mail*"
                                name="email"
                                value={form.data.email}
                                error={form.errors.email}
                                onChange={this.handleDataChange}
                            />
                            <LInput
                                label="Strona internetowa*"
                                name="website"
                                value={form.data.website}
                                error={form.errors.website}
                                onChange={this.handleDataChange}
                            />
                            <Row>
                                <Col xs={12} md={6}>
                                    <LInput
                                        label="Ulica*"
                                        name="street"
                                        value={form.data.street}
                                        error={form.errors.street}
                                        onChange={this.handleDataChange}
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <LInput
                                        label="Numer*"
                                        name="number"
                                        value={form.data.number}
                                        error={form.errors.number}
                                        onChange={this.handleDataChange}
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <LInput
                                        label="Kod pocztowy*"
                                        name="postal"
                                        value={form.data.postal}
                                        error={form.errors.postal}
                                        onChange={this.handleDataChange}
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <LInput
                                        label="Miejscowość*"
                                        name="city"
                                        value={form.data.city}
                                        error={form.errors.city}
                                        onChange={this.handleDataChange}
                                    />
                                </Col>
                            </Row>
                            <div>
                                <Dropzone onDrop={this.handleAdd}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section className="dropzone-container">
                                            <div {...getRootProps({ className: `dropzone` })}>
                                                <input {...getInputProps()} />
                                                <p className="label">
                                                    Możesz dodać maksymalnie 8 zdjęć. <br />
                                                    Przeciągnij zdjęcia lub kliknij i wybierz je z dysku.
                                                </p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>
                            <div>
                                <DragAndDropList
                                    data={photos}
                                    onChangeOrder={this.changePhotoOrder}
                                    onDelete={this.handleDelete}
                                    listItem={(item, onDelete) => {
                                        return (
                                            <>
                                                <img
                                                    src={item.photoUrl}
                                                    alt="drag-and-drop"
                                                    className="img-fluid"
                                                    style={{ maxHeight: 240 }}
                                                />
                                                <div>
                                                    <Button variant="danger" onClick={() => onDelete(item.id)}>
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </Button>
                                                    <Button title="Złap by zmienić kolejność">
                                                        <FontAwesomeIcon icon={faHandPaper} />
                                                    </Button>
                                                </div>
                                            </>
                                        );
                                    }}
                                    containerClass="photos-list"
                                />
                            </div>
                            <LInput
                                textarea
                                rows={8}
                                label="Krótki opis"
                                name="description"
                                value={form.data.description}
                                error={form.errors.description}
                                onChange={this.handleDataChange}
                            />
                            <div>
                                <Dropzone onDrop={this.handleDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section className="dropzone-container">
                                            <div
                                                {...getRootProps({
                                                    className: `dropzone ${
                                                        form.logo || logoUrl ? 'flex-row' : 'flex-column'
                                                    }`,
                                                })}
                                            >
                                                <input {...getInputProps()} />
                                                <p className="small-label">Logo</p>
                                                {!(form.logo || logoUrl) && (
                                                    <>
                                                        <p className="label">
                                                            Wybierz logo <br />
                                                            Przeciągnij zdjęcie lub kliknij i wybierz je z dysku.
                                                        </p>
                                                    </>
                                                )}
                                                {(form.logo || logoUrl) && (
                                                    <>
                                                        <img
                                                            src={form.logo ? form.logo.url : null || logoUrl}
                                                            alt="Logo"
                                                            className="image"
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>
                            <FormCheck
                                custom
                                className="mb-4"
                                type="checkbox"
                                name="opening_hours"
                                id="opening_hours"
                                label="Godziny otwarcia"
                                onChange={this.handleDataChange}
                                checked={form.data.opening_hours}
                            />
                            <Row>
                                <TimeInput
                                    readOnly={!form.data.opening_hours}
                                    day="Poniedziałek"
                                    name="monday"
                                    value={form.data.monday}
                                    error={form.errors.monday}
                                    onChange={this.handleDataChange}
                                />
                                <TimeInput
                                    readOnly={!form.data.opening_hours}
                                    day="Wtorek"
                                    name="tuesday"
                                    value={form.data.tuesday}
                                    error={form.errors.tuesday}
                                    onChange={this.handleDataChange}
                                />
                                <TimeInput
                                    readOnly={!form.data.opening_hours}
                                    day="Środa"
                                    name="wednesday"
                                    value={form.data.wednesday}
                                    error={form.errors.wednesday}
                                    onChange={this.handleDataChange}
                                />
                                <TimeInput
                                    readOnly={!form.data.opening_hours}
                                    day="Czwartek"
                                    name="thursday"
                                    value={form.data.thursday}
                                    error={form.errors.thursday}
                                    onChange={this.handleDataChange}
                                />
                                <TimeInput
                                    readOnly={!form.data.opening_hours}
                                    day="Piątek"
                                    name="friday"
                                    value={form.data.friday}
                                    error={form.errors.friday}
                                    onChange={this.handleDataChange}
                                />
                                <TimeInput
                                    readOnly={!form.data.opening_hours}
                                    day="Sobota"
                                    name="saturday"
                                    value={form.data.saturday}
                                    error={form.errors.saturday}
                                    onChange={this.handleDataChange}
                                />
                                <TimeInput
                                    readOnly={!form.data.opening_hours}
                                    day="Niedziela"
                                    name="sunday"
                                    value={form.data.sunday}
                                    error={form.errors.sunday}
                                    onChange={this.handleDataChange}
                                />
                            </Row>

                            {form.data.category_id === 4 && (
                                <>
                                    <p>Godziny dostawy</p>
                                    <Row>
                                        <TimeLabelInput
                                            label="Poniedziałek od"
                                            name="mondayFrom"
                                            value={form.data.mondayFrom}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />
                                        <TimeLabelInput
                                            label="Poniedziałek do"
                                            name="mondayTo"
                                            value={form.data.mondayTo}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />

                                        <TimeLabelInput
                                            label="Wtorek od"
                                            name="tuesdayFrom"
                                            value={form.data.tuesdayFrom}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />
                                        <TimeLabelInput
                                            label="Wtorek do"
                                            name="tuesdayTo"
                                            value={form.data.tuesdayTo}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />

                                        <TimeLabelInput
                                            label="Środa od"
                                            name="wednesdayFrom"
                                            value={form.data.wednesdayFrom}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />
                                        <TimeLabelInput
                                            label="Środa do"
                                            name="wednesdayTo"
                                            value={form.data.wednesdayTo}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />

                                        <TimeLabelInput
                                            label="Czwartek od"
                                            name="thursdayFrom"
                                            value={form.data.thursdayFrom}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />
                                        <TimeLabelInput
                                            label="Czwartek do"
                                            name="thursdayTo"
                                            value={form.data.thursdayTo}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />

                                        <TimeLabelInput
                                            label="Piątek od"
                                            name="fridayFrom"
                                            value={form.data.fridayFrom}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />
                                        <TimeLabelInput
                                            label="Piątek do"
                                            name="fridayTo"
                                            value={form.data.fridayTo}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />

                                        <TimeLabelInput
                                            label="Sobota od"
                                            name="saturdayFrom"
                                            value={form.data.saturdayFrom}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />
                                        <TimeLabelInput
                                            label="Sobota do"
                                            name="saturdayTo"
                                            value={form.data.saturdayTo}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />

                                        <TimeLabelInput
                                            label="Niedziela od"
                                            name="sundayFrom"
                                            value={form.data.sundayFrom}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />
                                        <TimeLabelInput
                                            label="Niedziela do"
                                            name="sundayTo"
                                            value={form.data.sundayTo}
                                            onChange={this.handleDataChange}
                                            type="time"
                                        />
                                    </Row>{' '}
                                </>
                            )}
                            <div className="buttons">
                                <a
                                    className="btn btn-gray"
                                    href={this.generatePreviewLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Zobacz ogłoszenie
                                </a>
                                <Button type="submit" size="sm">
                                    Zapisz dane
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </PanelTemplate>
        );
    }
}

const mapStateToProps = ({ panelCompany }) => ({ panelCompany });

export default connect(mapStateToProps, {
    changeActiveCompany: changeActiveCompanyAction,
})(PanelCompanyEdit);
