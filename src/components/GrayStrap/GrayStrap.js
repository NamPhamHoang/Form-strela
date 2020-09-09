import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

const GrayStrap = ({ token, content, to, where, onClick }) => {
    const loggedIn = !!token;
    let button;
    if (loggedIn) {
        button = (
            <Link to={to} onClick={onClick} className="btn btn-primary">
                <strong>Przejdź do</strong> {where}
            </Link>
        );
    } else {
        button = (
            <Link to="/logowanie" onClick={onClick} className="btn btn-primary">
                <strong>Przejdź do</strong> logowania
            </Link>
        );
    }
    return (
        <Row className="gray-strap">
            <Col>
                <div className="gray-strap-main">
                    <p>{content}</p>
                    {button}
                </div>
            </Col>
        </Row>
    );
};

GrayStrap.defaultProps = {
    where: 'panelu',
    onClick: () => {},
};

const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps)(GrayStrap);
