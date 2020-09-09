import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewsListItem from '../../News/NewsListItem/NewsListItem';
import AnimationWrapper from './AnimationWrapper';
import { withRouter } from 'react-router-dom';

const NewsList = ({ news, slug }) => {
    return (
        <AnimationWrapper>
            <Row>
                {news.map(item => (
                    <Col xs={12} className="mb-5" key={item.slug}>
                        <NewsListItem
                            title={item.title}
                            date={item.date}
                            img={item.photoUrl}
                            alt={`Zdjęcie aktualności dla artykułu ${item.slug}`}
                            to={`/instytucje/${slug}/aktualnosci/${item.slug}`}
                        />
                    </Col>
                ))}
            </Row>
        </AnimationWrapper>
    );
};

export default withRouter(NewsList);