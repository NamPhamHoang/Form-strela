import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import NewsSmall from './NewsSmall/NewsSmall';
import NewsBig from './NewsBig/NewsBig';
import { NewEvents } from './Events/Events';
import { API_NEWS_SLIDER_INDEX } from '../../../../api';
import { GrayWrapper } from '../../../Wrappers/Wrappers';
import LoadingGrayCard from '../../../Loading/LoadingGrayCard/LoadingGrayCard';
import { PrimaryButton, RedButton } from '../../../Buttons/Button';

const Grid = styled(Container)`
    display: grid;
    grid-template-columns: 1fr;
    padding-top: 25px;
    padding-bottom: 25px;
    grid-gap: 20px;
    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;
const StyledNewsBig = styled(NewsBig)`
    height: 350px;
    @media screen and (min-width: 768px) {
        grid-column: 1/3;
    }
`;
const StyledLoadingGrayCard = styled(LoadingGrayCard)`
    grid-column: 1/4;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
    margin: auto;
    @media screen and (min-width: 768px) {
        grid-row: 3;
        grid-column: 1/4;
        margin: auto 0;
        justify-content: center;
    }
`;
const StyledPrimaryRedButton = styled(RedButton)`
    margin: auto;
    @media screen and (min-width: 768px) {
        grid-row: 3;
        grid-column: 1/4;
        margin: auto 0;
        justify-content: center;
    }
`;

const StyledRedButton = styled(RedButton)`
    margin: 0 auto;
    @media screen and (min-width: 768px) {
        grid-column: 1/4;
    }
`;

export const News = () => {
    const [sliderNews, setSliderNews] = useState([]);
    const [restNews, setRestNews] = useState([]);
    const [communicates, setCommunicates] = useState([]);
    const [sliderLoading, setSliderLoading] = useState(true);

    useEffect(() => {
        axios
            .get(API_NEWS_SLIDER_INDEX)
            .then(response => {
                const { news, communicates: newCommunicates } = response.data;
                setSliderLoading(false);
                setSliderNews(
                    news.filter((item, index) => {
                        return index < 3;
                    }),
                );
                setRestNews(
                    news.filter((item, index) => {
                        return index >= 3;
                    }),
                );
                setCommunicates(newCommunicates);
            })
            .catch(() => {});
    }, []);

    return (
        <>
            <Grid>
                <StyledNewsBig news={sliderNews} loading={sliderLoading} />
                <NewEvents />
            </Grid>
            <GrayWrapper>
                <Grid>
                    {sliderLoading && <StyledLoadingGrayCard />}
                    {restNews.map(item => (
                        <NewsSmall variant="dark" news={item} loading={sliderLoading} />
                    ))}
                    <StyledPrimaryButton to="/aktualnosci">Wszystkie aktualności</StyledPrimaryButton>
                </Grid>
            </GrayWrapper>
            <Grid>
                <StyledRedButton inactive>Komunikaty</StyledRedButton>
                {communicates.map(item => (
                    <NewsSmall variant="dark" red news={item} loading={sliderLoading} />
                ))}
                <StyledPrimaryRedButton to="/komunikaty">Wszystkie komunikaty</StyledPrimaryRedButton>
            </Grid>
        </>
    );
};
