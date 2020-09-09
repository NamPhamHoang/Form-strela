import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import route from '../../../routes';
import Description from './Description';
import NewsList from './NewsList';

const LButton = ({ href, label, active }) => {
    const className = `btn btn-block  btn-sm btn-${active ? 'primary' : 'outline-primary'}`;
    return (
        <Link
            to={href}
            className={className}
        >
            {label}
        </Link>
    );
};

const ManageContent = props => {
    const infoActive = props.match.path === '/instytucje/:slug';
    return (
        <>
            <Row className="gutters-sm mb-3 manage-content">
                <Col md={6}>
                    <LButton
                        href={route('institution.show', [props.match.params.slug])}
                        label="Informacje"
                        active={infoActive}
                    />
                </Col>
                <Col md={6}>
                    <LButton
                        href={route('institution.show.news.index', [props.match.params.slug])}
                        label="Aktualności"
                        active={!infoActive}
                    />
                </Col>
            </Row>
            {infoActive && <Description description={props.description}/>}
            {!infoActive && <NewsList news={props.news} slug={props.match.params.slug}/>}
        </>

    );
};

export default withRouter(ManageContent);