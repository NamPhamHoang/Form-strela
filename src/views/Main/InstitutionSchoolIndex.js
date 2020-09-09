import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { Helmet } from 'react-helmet';
import LayoutCardWithTitleAndPath from '../../templates/LayoutCardWithTitleAndPath';
import { API_SCHOOLS } from '../../api';
import Collapse from '../../components/Collapse/Collapse';
import Card from '../../components/Cards/Card';

const SchoolCard = ({ name, slug }) => {
    return (
        <Col xs={12} sm={6} md={4} xl={3} className="mb-3">
            <Card className="school-card">
                <div className="title-container">
                    <h5>{name}</h5>
                </div>
                <Link to={`/instytucje/${slug}`} className="btn btn-primary btn-sm">
                    <strong>Dowiedz się</strong> więcej
                </Link>
            </Card>
        </Col>
    );
};

const InstitutionSchoolIndex = () => {
    const [opened, setOpened] = useState(false);
    const [institutions, setInstitutions] = useState([]);

    useEffect(() => {
        axios
            .get(API_SCHOOLS)
            .then(response => {
                setInstitutions(response.data.data);
            })
            .catch(() => {});
    }, []);

    return (
        <>
            <Helmet>
                <title>Szkoły Przedszkola Żłobki - Oficjalny Portal Gminy Jarocin</title>
                <meta
                    name="description"
                    content="Szkoły Przedszkola Żłobki - informacje, dane kontaktowe, aktualności"
                />
            </Helmet>
            <LayoutCardWithTitleAndPath
                pathItems={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/szkoly-przedszkola-zlobki', label: 'Szkoły podstawowe, przedszkola, żłobki' },
                ]}
                className="institution-school-index"
                category="Gmina"
                title="Szkoły podstawowe, przedszkola, żłobki"
            >
                <Accordion className="collapse-styles">
                    <Collapse
                        renderChild
                        title="Szkoły podstawowe"
                        id="Szkoły podstawowe"
                        opened={opened}
                        setOpened={setOpened}
                    >
                        <Row className="justify-content-center">
                            {institutions
                                .filter(item => item.type_id === 1)
                                .map(item => (
                                    <SchoolCard key={item.id} name={item.name} slug={item.slug} />
                                ))}
                        </Row>
                    </Collapse>
                    <Collapse renderChild title="Przedszkola" id="Przedszkola" opened={opened} setOpened={setOpened}>
                        <Row className="justify-content-center">
                            {institutions
                                .filter(item => item.type_id === 2)
                                .map(item => (
                                    <SchoolCard key={item.id} name={item.name} slug={item.slug} />
                                ))}
                        </Row>
                    </Collapse>
                    <Collapse renderChild title="Żłobki" id="Żłobki" opened={opened} setOpened={setOpened}>
                        <Row className="justify-content-center">
                            {institutions
                                .filter(item => item.type_id === 3)
                                .map(item => (
                                    <SchoolCard key={item.id} name={item.name} slug={item.slug} />
                                ))}
                        </Row>
                    </Collapse>
                </Accordion>
            </LayoutCardWithTitleAndPath>
        </>
    );
};

export default InstitutionSchoolIndex;

/*
* redirect={redirect}
                loading={loading}
                title="todo"
                description="todo"
                keywords="todo"
*
* */
