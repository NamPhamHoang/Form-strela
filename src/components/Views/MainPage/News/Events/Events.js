import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/pro-light-svg-icons';
import LoadingGrayCard from '../../../../Loading/LoadingGrayCard/LoadingGrayCard';
import { PrimaryButton } from '../../../../Buttons/Button';
import { API_EVENTS_INDEX_MAIN_PAGE } from '../../../../../api';
import { GrayWrapper } from '../../../../Wrappers/Wrappers';

const Wrapper = styled(GrayWrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    padding: 5px;
`;
const EventWrapper = styled.div`
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
    height: 140px;
    margin: 10px 0;
    background-color: #ffffff;
    @media screen and (min-width: 768px) {
        margin: 0 auto;
    }
`;
const ImageWrapper = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 150px;
    border-radius: 1rem;
    overflow: hidden;
    flex-shrink: 0;
    img {
        max-width: unset;
        height: 100%;
    }
`;

const StyledPrimaryButton = styled(PrimaryButton)`
    padding: 8px 25px;
    border-radius: 100000px;
    display: block;
`;
const StyledClock = styled(FontAwesomeIcon)`
    color: ${({ theme: { blue } }) => blue};
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 5px 10px;
    font-size: ${({
        theme: {
            font: {
                size: { xxxs },
            },
        },
    }) => xxxs};
`;
const Description = styled.p`
    font-size: ${({
        theme: {
            font: {
                size: { xxxs },
            },
        },
    }) => xxxs};
    font-weight: 300;
`;
const Date = styled.span`
    font-size: ${({
        theme: {
            font: {
                size: { xxs },
            },
        },
    }) => xxs};
    display: block;
`;
const BottomContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;
const StyledLink = styled(Link)`
    color: #000000;
`;

const Event = ({ date, title, slug, img, description, url, time, place }) => {
    return (
        <EventWrapper>
            <ImageWrapper to={`/wydarzenia/${slug}`}>
                <img src={img} alt="" />
            </ImageWrapper>
            <ContentWrapper>
                <p>
                    <Date>{date}</Date>
                    <StyledLink to={`/wydarzenia/${slug}`}>{title}</StyledLink>
                </p>
                <Description>{description}</Description>
                {!!place && <p>{place}</p>}
                <BottomContent>
                    {!!time && (
                        <span>
                            <StyledClock icon={faClock} /> {time}
                        </span>
                    )}
                    {!!url && (
                        <StyledPrimaryButton href={url} size="xs">
                            Kup bilet
                        </StyledPrimaryButton>
                    )}
                </BottomContent>
            </ContentWrapper>
        </EventWrapper>
    );
};

export const NewEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        axios
            .get(API_EVENTS_INDEX_MAIN_PAGE)
            .then(({ data: { events: newEvents } }) => {
                setLoading(false);
                setEvents([...newEvents]);
            })
            .catch(() => {});
    }, []);
    return (
        <Wrapper>
            <PrimaryButton to="/wydarzenia">Wszystkie wydarzenia</PrimaryButton>
            {!!loading && <LoadingGrayCard />}
            {!loading && events.map(event => <Event {...event} />)}
        </Wrapper>
    );
};
