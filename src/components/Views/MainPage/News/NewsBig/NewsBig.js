import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import LoadingGrayCard from '../../../../Loading/LoadingGrayCard/LoadingGrayCard';
import { NewsItem } from '../NewsItem';

const StyledLoadingGrayCard = styled(LoadingGrayCard)`
    height: 350px;
`;

const NewsBig = ({ loading, news, ...props }) => {
    return (
        <div {...props}>
            {loading && <StyledLoadingGrayCard />}
            {!loading && (
                <Carousel>
                    {news.map(item => {
                        const { title, img, slug, published_at: publishedAt } = item;
                        return (
                            <Carousel.Item key={slug}>
                                <NewsItem
                                    link={`/aktualnosci/${slug}`}
                                    img={img}
                                    slug={slug}
                                    title={title}
                                    date={publishedAt.substr(0, 10)}
                                    big
                                />
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            )}
        </div>
    );
};

export default NewsBig;
