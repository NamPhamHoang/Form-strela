import React, {useState} from 'react';
import {faCalendar, faSearch} from '@fortawesome/pro-light-svg-icons';
import useConstant from 'use-constant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import styled from 'styled-components';
import {useAsync} from 'react-async-hook';
import Input from '../../Input/Input';

const useTextAndDate = (actionFunction) => {
    const [filters, setFilters] = useState({
        text: '',
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

const StyledWrapper = styled.div`
    &>div{
        margin: auto 1rem auto 0;
    }
`;


const TextAndDate = ({handleSearch, children}) => {
    const {filters, setFilters} = useTextAndDate(handleSearch);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFilters(prevState => ({...prevState, [name]: value}));
    };
    return (
        <StyledWrapper className="panel-filters">
            <Input
                label="Wpisz frazę"
                name="text"
                onChange={handleChange}
                value={filters.text}
                variant="outline-secondary"
                size="lg"
                icon={faSearch}
                floating
            />
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
            {children}
        </StyledWrapper>
    );
};

//
// class TextAndDate extends Component {
//     state = {
//         filters: {
//             text: '',
//             date: '',
//         },
//     };
//
//     handleFiltersChange = (e) => {
//         const [name, value] = changeHelper(e);
//         this.setState((prevState) => {
//             const filters = { ...prevState.filters };
//             filters[name] = value;
//
//             return { filters };
//         });
//     };
//
//     render() {
//         return (
//
//         );
//     }
// }
//
export default TextAndDate;
