import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
/* import { faCalendar } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; */
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Path from '../../../components/Path/Path';
import LayoutCard from '../../../components/Cards/LayoutCards/LayoutCard';
import Title from '../../../components/Titles/Title/Title';
// eslint-disable-next-line import/named
import { gate } from '../../../api';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    grid-gap: 20px;
    margin-top: 20px;
    @media screen and (max-width: 991px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 575px) {
        grid-template-columns: 1fr;
    }
`;

const Item = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme: { lightergray } }) => lightergray};
    border-radius: 10px;
    padding: 15px 0 20px;
    & > img {
        height: 110px;
        max-width: 80%;
        margin-bottom: 20px;
    }
    & > span {
        text-transform: uppercase;
        text-align: center;
    }
    color: #000000;
    transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    &:hover {
        text-decoration: none;
        transform: scale(0.9);
        color: #ffffff;
        background-color: #3dbbed;
        & > * {
            color: #ffffff;
        }
    }
`;

const TopWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const EOffice = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`${gate}/e-office/categories`).then(({ data: { categories: newCategories } }) => {
            setCategories(newCategories);
        });
    }, []);
    return (
        <>
            <Helmet>
                <title>eUrząd - Oficjalny Portal Gminy Jarocin</title>
                <meta
                    name="description"
                    content="eUrząd - załat swprawy urzędowe szybko i sprawnie online! Znajdź w łatwy sposób wszystkie potrzebne informacje."
                />
            </Helmet>
            <Path
                items={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/e-urzad', label: 'eUrząd' },
                ]}
            />
            <LayoutCard>
                <TopWrapper>
                    <div>
                        <Title className="color-blue">eUrząd</Title>
                    </div>
                    {/* <button type="button" onClick={() => {}} className="btn btn-primary">
                        <FontAwesomeIcon icon={faCalendar} /> Kalendarz
                    </button> */}
                </TopWrapper>

                <Grid>
                    {categories.map(({ slug, icon, name }) => (
                        <Item to={`/e-urzad/${slug}`}>
                            <img src={icon} alt="" />
                            <span>{name}</span>
                        </Item>
                    ))}
                </Grid>
            </LayoutCard>
        </>
    );
};

export default EOffice;
