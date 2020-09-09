import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LayoutCard from './LayoutCard';
import Title from '../../Titles/Title/Title';

const LayoutCardWithTitles = ({ title, className, children }) => {
    return (
        <LayoutCard className={className}>
            <Row>
                <Col xs={12}>
                    <Title>{title}</Title>
                </Col>
            </Row>
            {children}
        </LayoutCard>
    );
};

LayoutCardWithTitles.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
};

LayoutCardWithTitles.defaultProps = {
    className: '',
};

export default LayoutCardWithTitles;
