import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import LayoutCard from '../Cards/LayoutCards/LayoutCard';
import SectionTitle from '../Titles/SectionTitle/SectionTitle';
import Title from '../Titles/Title/Title';
import SmallDate from '../SmallDate/SmallDate';
import NewsItem from './NewsItem';
import Path from '../Path/Path';
import ButtonFacebookShare from '../Buttons/ButtonSocial/ButtonFacebookShare';
import MyLightBox from '../LightBox/LightBox';
import { Gallery } from '../Gallery/Gallery';

const StyledCol = styled(Col)`
    background-color: ${({ theme: { lightergray } }) => lightergray};
    border-radius: 20px;
`;

const StyledRow = styled(Row)`
    margin: 0 10px 0 -15px;
`;

const News = ({
    className,
    pathItems,
    category,
    title,
    date,
    listTitle,
    children,
    content,
    photo,
    otherNews,
    alt,
    gallery,
    meta_title,
    meta_description,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    return (
        <>
            <Helmet>
                <title>{`Oficjalny Portal Gminy Jarocin - ${meta_title}`}</title>
                <meta name="description" content={meta_description} />

                <meta property="og:title" content={`Oficjalny Portal Gminy Jarocin - ${meta_title}`} />
                <meta property="og:description" content={meta_description} />
                <meta property="og:image" content={photo} />
                <meta property="og:url" content={window.location} />
            </Helmet>

            <Path items={pathItems} />
            <LayoutCard className={`card-news ${className}`}>
                <StyledRow>
                    <Col xs={12} lg={8} className="content">
                        <SectionTitle>{category}</SectionTitle>
                        <Title>{title}</Title>
                        <div className="social-and-date">
                            <SmallDate date={moment(date).format('DD.MM.YYYY')} />
                            <ButtonFacebookShare />
                        </div>
                        <div className="photo">
                            <img src={photo} alt={alt} />
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                        {!!gallery.length && (
                            <>
                                <h5>GALERIA ZDJĘĆ</h5>
                                <Gallery>
                                    {gallery.map(({ imageLink, id }, index) => (
                                        <div className="galleryImageDiv" key={id}>
                                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                                            <img
                                                src={imageLink}
                                                alt=""
                                                onClick={() => {
                                                    setStartIndex(index);
                                                    setIsOpen(true);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </Gallery>
                            </>
                        )}
                    </Col>
                    <StyledCol xs={12} lg={4} className="list">
                        <SectionTitle>{listTitle}</SectionTitle>
                        <div className="news-list">
                            {otherNews.map(article => (
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
                    </StyledCol>
                </StyledRow>
                {children}
                {isOpen && !!gallery.length && (
                    <MyLightBox
                        images={gallery.map(({ imageLink }) => imageLink)}
                        startIndex={startIndex}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </LayoutCard>
        </>
    );
};

News.defaultProps = {
    className: '',
};

export default News;
