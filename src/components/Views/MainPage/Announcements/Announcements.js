import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faShoppingCart } from '@fortawesome/pro-regular-svg-icons';
import axios from 'axios';
import styled from 'styled-components';
import Announcement from './Announcement/Announcement';
import { API_COMPANIES_MAIN_PAGE, API_EMARKET_MAIN_PAGE } from '../../../../api';
import { GrayWrapper } from '../../../Wrappers/Wrappers';

const StyledContainer = styled(Container)`
    display: grid;
    grid-gap: 30px;
    padding-top: 30px;
    padding-bottom: 30px;
    @media screen and (min-width: 991px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 10px;
    height: 100%;
    font-size: 300px;
    z-index: 0;
    color: ${({ theme: { lightergray } }) => lightergray};
`;
const Announcements = () => {
    const [companies, setCompanies] = useState([]);
    const [companiesLoading, setCompaniesLoading] = useState(true);
    const [ads, setAds] = useState([]);
    const [adsLoading, setAdsLoading] = useState(true);
    useEffect(() => {
        setCompaniesLoading(true);
        setAdsLoading(true);
        axios.get(API_COMPANIES_MAIN_PAGE).then(response => {
            const { data } = response.data;
            setCompanies(data);
            setCompaniesLoading(false);
        });
        // .catch(error => {console.log(error);});

        axios.get(API_EMARKET_MAIN_PAGE).then(response => {
            const { ads: newAds } = response.data;
            setAds(newAds);
            setAdsLoading(false);
        });
        // .catch(error => {console.log(error);});
    }, []);
    return (
        <GrayWrapper>
            <StyledContainer>
                <Announcement
                    pathCore="baza-firm/firma"
                    title="Baza przedsiębiorców"
                    button={{
                        title: 'Wszystkie firmy',
                        icon: faBuilding,
                        to: '/baza-firm',
                    }}
                    items={companies}
                    loading={companiesLoading}
                    variant="light"
                    hasAddress
                    red
                >
                    <StyledFontAwesomeIcon icon={faBuilding} />
                </Announcement>

                <Announcement
                    pathCore="e-targ"
                    title="Ogłoszenia eTarg"
                    button={{
                        title: 'Wszystkie ogłoszenia',
                        icon: faShoppingCart,
                        to: '/e-targ',
                    }}
                    buttonIcon={faShoppingCart}
                    items={ads.map(ad => {
                        ad.photoUrl = ad.thumbnailUrl;
                        return ad;
                    })}
                    loading={adsLoading}
                    variant="light"
                    blue
                >
                    <StyledFontAwesomeIcon icon={faShoppingCart} />
                </Announcement>
            </StyledContainer>
        </GrayWrapper>
    );
};

export default Announcements;
