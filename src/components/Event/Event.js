import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import Path from '../Path/Path';
import LayoutCard from '../Cards/LayoutCards/LayoutCard';
import SectionTitle from '../Titles/SectionTitle/SectionTitle';
import Title from '../Titles/Title/Title';
import SmallDate from '../SmallDate/SmallDate';
import ButtonFacebookShare from '../Buttons/ButtonSocial/ButtonFacebookShare';
import ButtonTwitterShare from '../Buttons/ButtonSocial/ButtonTwitterShare';
import NewsItem from '../News/NewsItem';

const Event = ({
    className,
    pathItems,
    category,
    title,
    date,
    listTitle,
    children,
    content,
    photo,
    otherEvents,
    alt,
}) => {
    return (
        <>
            <Path items={pathItems} />
            <LayoutCard className={`card-news ${className}`}>
                <Row>
                    <Col xs={12} lg={8} className="content">
                        <SectionTitle>{category}</SectionTitle>
                        <Title>{title}</Title>
                        <div className="social-and-date">
                            <SmallDate date={moment(date).format('DD.MM.YYYY')} />
                            <ButtonFacebookShare />
                            <ButtonTwitterShare />
                        </div>
                        <div className="photo">
                            <img src={photo} alt={alt} />
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </Col>
                    <Col xs={12} lg={4} className="list">
                        <SectionTitle>{listTitle}</SectionTitle>
                        <div className="news-list">
                            {otherEvents.map(article => (
                                <NewsItem
                                    key={article.slug}
                                    date={article.date}
                                    title={article.title}
                                    img={article.img}
                                    to={article.to}
                                    alt={article.alt}
                                />
                            ))}
                        </div>
                    </Col>
                </Row>
                {children}
            </LayoutCard>
        </>
    );
};

Event.defaultProps = {
    className: '',
};
export default Event;
