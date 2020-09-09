import React from 'react';
import {faAngleDown} from '@fortawesome/pro-regular-svg-icons';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormCheck from 'react-bootstrap/FormCheck';
import Input from '../../../Input/Input';

const LSelect = ({label, disabled, name, value, children, onChange, multiple}) => (
    <Input
        label={label}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        select
        icon={faAngleDown}
        variant="outline-primary"
        size="lg"
        floating
        multiple={multiple}
    >
        <option disabled/>
        {children}
    </Input>
);

const LInput = ({label, name, value, onChange, type = 'text'}) => (
    <Input
        type={type}
        label={label}
        name={name}
        onChange={onChange}
        value={value}
        variant="outline-primary"
        size="lg"
        floating
    />
);


const Filters = ({search, push, type, state, priceFrom, priceTo, filters, onChange, buildQuery, getQuery}) => {
    const categoryQuery = getQuery('kategoria') || '';
    const subcategoryQuery = getQuery('podkategoria') || '';
    const subsubcategoryQuery = getQuery('podpodkategoria') || '';
    const categoryItem = categoryQuery ? filters.find(item => item.id === parseInt(categoryQuery, 10)) : {
        children: [],
        filters: [],
    };
    const subcategoryItem = subcategoryQuery ? categoryItem.children.find(item => item.id === parseInt(subcategoryQuery, 10)) : {
        children: [],
        filters: [],
    };
    const subsubcategoryItem = subsubcategoryQuery ? subcategoryItem.children.find(item => item.id === parseInt(subsubcategoryQuery, 10)) : {
        children: [],
        filters: [],
    };
    let fil = [];
    if (subsubcategoryQuery) fil = subsubcategoryItem.filters;
    else if (subcategoryQuery) fil = subcategoryItem.filters;
    else if (categoryQuery) fil = categoryItem.filters;

    const setFilters = (item) => {
        console.log(item);
        const query = JSON.parse(getQuery('filtry')) || [];
        const index = query.findIndex(it => it.id === item.id);
        if (index !== -1) {
            query[index] = item;
        } else {
            query.push(item);
        }
        console.log(query);
        const newQuery = buildQuery('filtry', JSON.stringify(query));
        push(newQuery);
    };

    const getFilters = (id) => {
        const query = JSON.parse(getQuery('filtry')) || [];
        const item = query.find(item => item.id === id) || {value: null};
        return item.value;
    };


    return (
        <Row className="filters gutters-sm">
            <Col className="selects">
                <LSelect
                    label="Kategoria"
                    name="category"
                    value={categoryQuery}
                    onChange={(e) => {
                        const params = new URLSearchParams(search);
                        params.set('kategoria', e.target.value);
                        params.delete('podkategoria');
                        params.delete('podpodkategoria');
                        params.delete('strona');
                        params.delete('filtry');

                        push(`?${params.toString()}`);
                    }}
                >
                    {filters.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </LSelect>
            </Col>
            <Col className="selects">
                <LSelect
                    label="Podkategoria"
                    name="subcategory"
                    value={subcategoryQuery}
                    disabled={!categoryQuery}
                    onChange={(e) => {
                        const params = new URLSearchParams(search);
                        params.set('podkategoria', e.target.value);
                        params.delete('podpodkategoria');
                        params.delete('strona');
                        params.delete('filtry');

                        push(`?${params.toString()}`);
                    }}
                >
                    {categoryItem.children.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </LSelect>
            </Col>
            {
                // eslint-disable-next-line consistent-return,array-callback-return
                fil.map((item, index) => {
                const attrs = {
                    label: item.nameFilter,
                    name: item.nameFilter,
                };
                if ([1, 5].includes(item.typeField) && !item.parent_id) {
                    const value = getFilters(item.id) || ['', ''];
                    const second = fil[index + 1];
                    return (
                        <Col className="selects mb-3" key={item.id}>
                            <div className="price-inputs">
                                <LInput
                                    {...attrs}
                                    value={value[0]}
                                    type={item.typeField === 1 ? 'number' : 'date'}
                                    onChange={(e) => {
                                        setFilters({
                                            id: item.id,
                                            typeField: item.typeField,
                                            value: [e.target.value, value[1]],
                                        });
                                    }}
                                />
                                <LInput
                                    label={second.nameFilter}
                                    name={second.nameFilter}
                                    type={item.typeField === 1 ? 'number' : 'date'}
                                    value={value[1]}
                                    onChange={(e) => {
                                        setFilters({
                                            id: item.id,
                                            typeField: item.typeField,
                                            value: [value[0], e.target.value],
                                        });
                                    }}
                                />
                            </div>
                        </Col>
                    );
                }
                if ([2, 4].includes(item.typeField)) {
                    let value;
                    if (item.typeField !== 4) {
                        value = (getFilters(item.id) || [''])[0];
                    } else {
                        value = (getFilters(item.id) || ['']);
                    }
                    return (
                        <Col className="selects" key={item.id}>
                            <LSelect
                                {...attrs}
                                value={value}
                                onChange={(e) => {
                                    setFilters({
                                        id: item.id,
                                        typeField: item.typeField,
                                        value: item.typeField !== 4 ? [e.target.value] : [...e.target.options].filter(o => o.selected).map(o => o.value),
                                    });
                                }}
                                multiple={item.typeField === 4}
                            >
                                {item.values.map(value => (
                                    <option value={value.value} key={value.id}>{value.value}</option>
                                ))}
                            </LSelect>
                        </Col>
                    );
                }
                if (item.typeField === 3) {
                    const value = (getFilters(item.id) || [''])[0];
                    return (
                        <Col className="selects" key={item.id}>
                            <LInput
                                {...attrs}
                                value={value}
                                onChange={(e) => {
                                    setFilters({
                                        id: item.id,
                                        typeField: item.typeField,
                                        value: [e.target.value],
                                    });
                                }}
                            />
                        </Col>
                    );
                }
                if (item.typeField === 6) {
                    const value = (getFilters(item.id) || ['Nie'])[0] === 'Tak';
                    return (
                        <Col className="selects d-flex align-items-center mb-3" key={item.id}>
                            <FormCheck
                                {...attrs}
                                custom
                                type="checkbox"
                                name={`checkbox-${item.id}`}
                                id={`checkbox-${item.id}`}
                                onChange={(e) => {
                                    setFilters({
                                        id: item.id,
                                        typeField: item.typeField,
                                        value: [e.target.checked ? 'Tak' : 'Nie'],
                                    });
                                }}
                                checked={value}
                            />
                        </Col>
                    );
                }
            })}
            <Col className="photo-only">
                <FormCheck
                    className="mb-3"
                    custom
                    type="checkbox"
                    name="photo_only"
                    id="photo_only"
                    label="Tylko ze zdjęciem"
                    onChange={() => {
                        let hasImage = getQuery('tylko-zdjecie') || '0';
                        hasImage = hasImage === '0' ? '1' : '0';
                        push(buildQuery('tylko-zdjecie', hasImage));
                    }}
                    checked={getQuery('tylko-zdjecie') === '1'}
                />
            </Col>
        </Row>
    );
};

export default Filters;