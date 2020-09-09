import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Path = ({ items }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <nav aria-label="breadcrumb" className="breadcrumb-own">
                        <ol className="breadcrumb">
                            {items.map((item, index) => {
                                const active = index + 1 === items.length;
                                return (
                                    <li
                                        key={item.url}
                                        className={`breadcrumb-item ${active ? 'active' : ''}`}
                                        aria-current={active ? 'page' : null}
                                    >
                                        <Link to={item.url}>{item.label}</Link>
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>
                </Col>
            </Row>
        </Container>
    );
};

Path.propTypes = {
    items: PropTypes.instanceOf(Array).isRequired,
};

export default Path;
