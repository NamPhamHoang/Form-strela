import React, {useState} from 'react';
import {faCalendar} from '@fortawesome/pro-light-svg-icons';
import useConstant from 'use-constant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {useAsync} from 'react-async-hook';
import {faAngleDown} from '@fortawesome/pro-solid-svg-icons';
import Input from '../../Input/Input';

const useSelectAndDate = (actionFunction) => {
    const [filters, setFilters] = useState({
        select: '',
        date: '',
    });

    const debouncedAction = useConstant(() =>
        AwesomeDebouncePromise(actionFunction, 800),
    );

    const action = useAsync(
        async text => {
            if (text.length === 0) {
                return [];
            }
            return debouncedAction(text);
        },
        [filters],
    );

    return {
        filters,
        setFilters,
        action,
    };
};


const SelectAndDate = ({handleSearch, selectLabel, children}) => {
    const {filters, setFilters} = useSelectAndDate(handleSearch);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFilters(prevState => ({...prevState, [name]: value}));
    };
    return (
        <div className="panel-filters">
            <Input
                select
                label={selectLabel}
                name="select"
                onChange={handleChange}
                value={filters.select}
                variant="outline-secondary"
                size="lg"
                icon={faAngleDown}
                floating
            >
                <option disabled/>
                {children}
            </Input>
            <Input
                label="Data"
                type="date"
                name="date"
                onChange={handleChange}
                value={filters.date}
                variant="outline-secondary"
                size="lg"
                icon={faCalendar}
                floating
            />
        </div>
    );
};

export default SelectAndDate;
