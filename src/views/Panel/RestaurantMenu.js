import React, { Component } from 'react';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { faCamera, faPlus } from '@fortawesome/pro-solid-svg-icons';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { connect, useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { PrimaryButton } from '../../components/Buttons/Button';
import Input from '../../components/Input/Input';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import {
    API_COMPANY_RESTAURANT_MENU_CATEGORY_DELETE,
    API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_DELETE,
    API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_PHOTO_UPDATE,
    API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_STORE,
    API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_VARIANT_DELETE,
    API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_VARIANT_STORE,
    API_COMPANY_RESTAURANT_MENU_CATEGORY_STORE,
    API_COMPANY_RESTAURANT_MENU_EDIT,
    gate,
} from '../../api';
import InformationModal from '../../components/Modals/InformationModal/InformationModal';

const LInput = props => {
    return <Input {...props} variant="shadow" size="lg" floating />;
};

const StyledPrimaryButton = styled(PrimaryButton)`
    margin: auto auto auto 1rem;
`;
const StyledSaveDishButton = styled(StyledPrimaryButton)`
    margin-left: calc(15% - 16px);
`;

const DeleteButton = props => {
    return (
        <Button className="delete-button" variant="link" {...props}>
            <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
    );
};

const AddButton = ({ className, ...rest }) => {
    return (
        <div>
            <Button className={`add-button ${className}`} {...rest}>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
        </div>
    );
};

const MenuItem = ({ restaurantId, categoryId, item, changeItemImage, deleteItem, addVariant, deleteVariant }) => {
    const token = useSelector(state => state.token);
    return (
        <div>
            <Form
                onSubmit={values => {
                    axios
                        .put(`${gate}/auth/restaurant/${restaurantId}/menu/item/${item.id}`, values, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then(() => {
                            NotificationManager.success('Zapisano danie');
                        })
                        .catch(() => {
                            NotificationManager.error('BŁĄD');
                        });
                }}
                initialValues={item}
                mutators={{
                    // potentially other mutators could be merged here
                    ...arrayMutators,
                }}
                render={({ handleSubmit }) => (
                    <form className="item" onSubmit={handleSubmit}>
                        <Field
                            name="name"
                            type="text"
                            render={({ input, meta }) => (
                                <LInput
                                    label="Nazwa dania"
                                    {...input}
                                    id={`item-name-${item.id}`}
                                    error={!!meta.error && !!meta.touched && [meta.error]}
                                    groupClass="item-name"
                                />
                            )}
                        />
                        <Field
                            name="description"
                            render={({ input, meta }) => (
                                <LInput
                                    label="Krótki opis"
                                    {...input}
                                    id={`item-description-${item.id}`}
                                    error={!!meta.error && !!meta.touched && [meta.error]}
                                    groupClass="item-description"
                                />
                            )}
                        />

                        <div className="item-photo">
                            <label
                                className={`btn btn-primary ${item.photoUrl ? 'active' : ''}`}
                                htmlFor={`item-photo-${item.id}`}
                                title="Dodaj zdjęcie potrawy"
                                style={{
                                    backgroundImage: item.photoUrl ? `url(${item.photoUrl})` : null,
                                }}
                            >
                                <FontAwesomeIcon icon={faCamera} />
                                <input
                                    type="file"
                                    onChange={e => changeItemImage(categoryId, item.id, e.target.files[0])}
                                    name={`${item.id}[photo]`}
                                    id={`item-photo-${item.id}`}
                                />
                            </label>
                        </div>
                        <DeleteButton title="Usuń danie" onClick={() => deleteItem(categoryId, item.id)} />

                        <div className="variants">
                            <FieldArray name="variants">
                                {({ fields }) => (
                                    <>
                                        <div>
                                            {fields.map((name, index) => (
                                                <>
                                                    <Field
                                                        name={`${name}.price`}
                                                        type="number"
                                                        step="0.01"
                                                        render={({ input, meta }) => (
                                                            <LInput
                                                                label="Cena"
                                                                {...input}
                                                                id={`variant-price-${item.id}-${index}`}
                                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                                                groupClass="variant-price"
                                                            />
                                                        )}
                                                    />

                                                    <Field
                                                        name={`${name}.name`}
                                                        type="text"
                                                        render={({ input, meta }) => (
                                                            <LInput
                                                                label="Nazwa wariantu"
                                                                {...input}
                                                                id={`variant-name-${item.id}-${index}`}
                                                                disabled={item.variants.length < 2}
                                                                error={!!meta.error && !!meta.touched && [meta.error]}
                                                                groupClass="variant-name"
                                                            />
                                                        )}
                                                    />
                                                    <DeleteButton
                                                        disabled={item.variants.length < 2}
                                                        title="Usuń wariant"
                                                        onClick={() => {
                                                            deleteVariant(categoryId, item.id, item.variants[index].id);
                                                            fields.remove(index);
                                                        }}
                                                    />
                                                </>
                                            ))}
                                        </div>
                                        <div>
                                            <Button
                                                className="add-button add-variant"
                                                title="Dodaj wariant"
                                                onClick={() => {
                                                    addVariant(categoryId, item.id).then(newVariant => {
                                                        if (newVariant) {
                                                            fields.push(newVariant);
                                                        }
                                                    });
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                            <StyledSaveDishButton>Zapisz danie</StyledSaveDishButton>
                                        </div>
                                    </>
                                )}
                            </FieldArray>
                        </div>
                    </form>
                )}
            />
        </div>
    );
};

const Category = ({ restaurantId, category, deleteCategory, addItem, ...props }) => {
    const token = useSelector(state => state.token);
    return (
        <div className="category" key={category.id}>
            <Form
                onSubmit={values => {
                    axios
                        .put(`${gate}/auth/restaurant/${restaurantId}/menu/category/${category.id}`, values, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then(() => {
                            NotificationManager.success('Zapisano kategorię');
                        })
                        .catch(() => {
                            NotificationManager.error('BŁĄD');
                        });
                }}
                initialValues={{
                    name: category.name,
                }}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <header>
                            <Field
                                name="name"
                                type="text"
                                render={({ input, meta }) => (
                                    <LInput
                                        label="Nazwa kategorii"
                                        {...input}
                                        id={`category-name-${category.id}`}
                                        error={!!meta.error && !!meta.touched && [meta.error]}
                                        groupClass="category-name"
                                    />
                                )}
                            />
                            <StyledPrimaryButton>Zapisz kategorię</StyledPrimaryButton>
                            <DeleteButton title="Usuń kategorię" onClick={() => deleteCategory(category.id)} />
                        </header>
                    </form>
                )}
            />

            <main>
                {category.items.map(item => {
                    return <MenuItem categoryId={category.id} item={item} restaurantId={restaurantId} {...props} />;
                })}
                <AddButton title="Dodaj danie" onClick={() => addItem(category.id)} />
            </main>
        </div>
    );
};

class RestaurantMenu extends Component {
    state = {
        form: {
            data: {
                categories: [],
            },
            errors: {},
        },
        loading: true,
        redirect: null,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const API = API_COMPANY_RESTAURANT_MENU_EDIT(this.props.panelCompany.id);
        axios
            .get(API)
            .then(response => {
                let { data } = response.data;
                this.setState(state => {
                    const form = { ...state.form };
                    if (Object.keys(data).length === 0) {
                        data = {};
                        NotificationManager.info('Sprawdź Informacje, by dowiedzieć się jak poprawnie dodać menu');
                    }
                    form.data.categories = data;
                    return {
                        form,
                        loading: false,
                    };
                });
            })
            .catch(() => {
                this.setState({
                    redirect: `/panel/firma/firmy`,
                });
            });
    };

    // region Category

    deleteCategory = id => {
        const API = API_COMPANY_RESTAURANT_MENU_CATEGORY_DELETE(this.props.panelCompany.id, id);
        axios
            .delete(API)
            .then(() => {
                this.setState(state => {
                    const form = { ...state.form };
                    form.data.categories = form.data.categories.filter(itemF => {
                        return id !== itemF.id;
                    });

                    return { form };
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się usunąć kategorii');
            });
    };

    addCategory = () => {
        const API = API_COMPANY_RESTAURANT_MENU_CATEGORY_STORE(this.props.panelCompany.id);
        axios
            .post(API)
            .then(response => {
                this.setState(state => {
                    const form = { ...state.form };
                    const { id } = response.data;
                    form.data.categories.push({
                        id,
                        name: '',
                        items: [],
                    });
                    return { form };
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się dodać kategorii');
            });
    };

    // endregion

    // region Item

    changeItemImage = (categoryId, itemId, image) => {
        const API = API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_PHOTO_UPDATE(
            this.props.panelCompany.id,
            categoryId,
            itemId,
        );
        const fd = new FormData();
        fd.append('photo', image);
        axios
            .post(API, fd)
            .then(response => {
                this.setState(state => {
                    const form = { ...state.form };
                    const category = form.data.categories.filter(itemF => {
                        return categoryId === itemF.id;
                    })[0];
                    const item = category.items.filter(itemF => {
                        return itemF.id === itemId;
                    });
                    item.photoUrl = response.data.photoUrl;
                    return { form };
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się zaktualizować zdjęcia');
            });
    };

    deleteItem = (categoryId, itemId) => {
        const API = API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_DELETE(this.props.panelCompany.id, categoryId, itemId);
        axios
            .delete(API)
            .then(() => {
                this.setState(state => {
                    const form = { ...state.form };
                    const category = form.data.categories.filter(itemF => {
                        return categoryId === itemF.id;
                    })[0];
                    category.items = category.items.filter(itemF => {
                        return itemF.id !== itemId;
                    });
                    return { form };
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się usunąć dania');
            });
    };

    addItem = categoryIndex => {
        const API = API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_STORE(this.props.panelCompany.id, categoryIndex);
        axios
            .post(API)
            .then(response => {
                this.setState(state => {
                    const form = { ...state.form };
                    const { itemId, variantId } = response.data;

                    const category = form.data.categories.filter(itemF => {
                        return categoryIndex === itemF.id;
                    })[0];
                    category.items.push({
                        id: itemId,
                        name: '',
                        description: '',
                        variants: [
                            {
                                id: variantId,
                                name: '',
                                price: '',
                            },
                        ],
                    });
                    return { form };
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się dodać dania');
            });
    };

    // endregion

    deleteVariant = (categoryId, itemid, variantId) => {
        const API = API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_VARIANT_DELETE(
            this.props.panelCompany.id,
            categoryId,
            itemid,
            variantId,
        );
        axios
            .delete(API)
            .then(() => {
                this.setState(state => {
                    const form = { ...state.form };
                    const category = form.data.categories.filter(itemF => {
                        return categoryId === itemF.id;
                    })[0];
                    const item = category.items.filter(itemF => {
                        return itemF.id === itemid;
                    })[0];
                    item.variants = item.variants.filter(itemF => {
                        return itemF.id !== variantId;
                    });
                    return { form };
                });
            })
            .catch(() => {
                NotificationManager.error('Nie udało się usunąć wariantu');
            });
    };

    addVariant = async (categoryId, itemid) => {
        const API = API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_VARIANT_STORE(
            this.props.panelCompany.id,
            categoryId,
            itemid,
        );
        try {
            const response = await axios.post(API);
            const { id } = response.data;
            return {
                id,
                price: '',
                name: '',
            };
        } catch (e) {
            NotificationManager.error('Nie udało się dodać wariantu');
            return null;
        }
    };

    render() {
        const { loading, form, redirect } = this.state;
        const { categories } = form.data;
        return (
            <PanelTemplate company className="restaurant-menu" loading={loading} redirect={redirect}>
                <SectionTitle>Restauracja - Menu</SectionTitle>
                <Row>
                    <Col xs={12} xl={10}>
                        <InformationModal>Informacje o wypełnianiu menu</InformationModal>
                        {categories.map(category => {
                            return (
                                <Category
                                    category={category}
                                    addItem={this.addItem}
                                    deleteCategory={this.deleteCategory}
                                    deleteVariant={this.deleteVariant}
                                    addVariant={this.addVariant}
                                    deleteItem={this.deleteItem}
                                    changeItemImage={this.changeItemImage}
                                    restaurantId={this.props.panelCompany.id}
                                />
                            );
                        })}
                        <div className="category">
                            <AddButton title="Dodaj kategorię" onClick={this.addCategory} />
                        </div>
                    </Col>
                </Row>
            </PanelTemplate>
        );
    }
}

const mapStateToProps = ({ role, panelCompany }) => ({ role, panelCompany });

export default connect(mapStateToProps)(RestaurantMenu);
