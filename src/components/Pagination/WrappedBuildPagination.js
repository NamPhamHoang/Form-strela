import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BuildPagination from './BuildPagination';

const WrappedBuildPagination = ({ className, style, ...rest }) => {
    return (
        <Row className={`justify-content-center mt-5 ${className}`} style={style}>
            <Col xs="auto">
                <BuildPagination
                    {...rest}
                />
            </Col>
        </Row>
    );
};

WrappedBuildPagination.defaultProps = {
    className: '',
    style: {},
};

export default WrappedBuildPagination;