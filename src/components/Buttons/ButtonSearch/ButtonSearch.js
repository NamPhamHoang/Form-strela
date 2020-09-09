import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { faSearch, faTimes } from '@fortawesome/pro-regular-svg-icons';
import Form from 'react-bootstrap/Form';

const ButtonSearch = props => {
    let searchIcon;
    let searchButtonAction;
    if (props.search) {
        if (props.searchValue !== '') {
            searchIcon = faSearch;
            searchButtonAction = props.handleSearch;
        } else {
            searchIcon = faTimes;
            searchButtonAction = props.onSearchClick;
        }
    } else {
        searchIcon = faSearch;
        searchButtonAction = props.onSearchClick;
    }
    return <>
        <CSSTransition
            in={props.search}
            classNames="search-bar"
            timeout={300}
            unmountOnExit
        >
            <div className="search-bar">
                <Form onSubmit={props.search !== '' ? props.handleSearch : (e) => e.preventDefault()}>
                    <Form.Group controlId="formBasicEmail" className="floating-label">
                        <Form.Label className={`${props.searchValue ? 'active' : ''}`}>Wpisz poszukiwaną
                            frazę</Form.Label>
                        <Form.Control type="text" onChange={props.onSearchChange} value={props.searchValue}/>
                    </Form.Group>
                </Form>
            </div>
        </CSSTransition>
        <Button
            className="btn-square search-button"
            onClick={searchButtonAction}
            variant="secondary"
        >
            <FontAwesomeIcon icon={searchIcon} size="lg"/>
        </Button>
    </>;
};

export default ButtonSearch;