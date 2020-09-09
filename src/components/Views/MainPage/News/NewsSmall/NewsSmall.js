import React from 'react';
import LoadingGrayCard from '../../../../Loading/LoadingGrayCard/LoadingGrayCard';
import { NewsItem } from '../NewsItem';

const NewsSmall = ({ loading, news: { title, img, slug, published_at: publishedAt }, red }) => {
    return (
        <>
            {loading && <LoadingGrayCard />}
            {!loading && (
                <NewsItem
                    link={`/aktualnosci/${slug}`}
                    slug={slug}
                    img={img}
                    title={title}
                    date={publishedAt.substr(0, 10)}
                    red={red}
                />
            )}
        </>
    );
};

export default NewsSmall;
