import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Logo from '../../Logo/Logo';
import IconStrap from '../../IconStrap/IconStrap';
import SquareButtons from './SquareButtons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AppendableHeader = props => {
    return (
        <CSSTransition
            in={props.in}
            classNames="apph"
            timeout={300}
        >
            <div className="appendable-header">
                <Container>
                    <Row>
                        <Col className="main-element">
                            <div className="appendable-logo">
                                <Logo/>
                            </div>
                            <div className={`appendable-square ${props.search ? 'search-enabled' : ''}`}>
                                <SquareButtons
                                    searchValue={props.searchValue}
                                    search={props.search}
                                    handleSearch={props.handleSearch}
                                    onSearchChange={props.handleSearchChange}
                                    onMenuClick={props.toggleMenu}
                                    onSearchClick={props.toggleSearch}
                                />
                            </div>
                            <div className="appendable-icon">
                                <IconStrap background="secondary"/>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </div>
        </CSSTransition>

    );
};

export default AppendableHeader;