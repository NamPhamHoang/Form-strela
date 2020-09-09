import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Header from './Header';
import Collapses from './Collapses';
import Shortcuts from '../../Shortcuts';
import WideButtons from '../WideButtons';
import IconStrap from '../../../IconStrap/IconStrap';
import ButtonSearch from '../../../Buttons/ButtonSearch/ButtonSearch';

class Menu extends Component {
    render() {
        return (
            <CSSTransition in={this.props.visible} classNames="menu" timeout={300} unmountOnExit>
                <div className="menu">
                    <Container>
                        <Header onTimesClick={this.props.onTimesClick} />
                        <Row>
                            <Col xl={12} className="d-flex d-md-none">
                                <IconStrap background="primary" />
                            </Col>
                        </Row>
                        <WideButtons className="menu-wide-buttons" />
                        <div className={`d-md-none ${this.props.search ? 'search-enabled' : ''}`}>
                            <div className="square-buttons">
                                <ButtonSearch
                                    search={this.props.search}
                                    searchValue={this.props.searchValue}
                                    onSearchChange={this.props.onSearchChange}
                                    onSearchClick={this.props.onSearchClick}
                                    handleSearch={this.props.handleSearch}
                                />
                            </div>
                        </div>
                        <Collapses />
                        <Shortcuts variation="secondary" className="mt-6" />
                    </Container>
                </div>
            </CSSTransition>
        );
    }
}

export default Menu;
