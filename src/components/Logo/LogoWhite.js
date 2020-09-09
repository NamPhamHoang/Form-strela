import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../img/logowhite.png';
import decoration from '../../img/header/gora.png';

const StyledLink = styled(Link)`
    display: block;
    position: relative;
`;
const DecorationImg = styled.img`
    position: absolute;
    bottom: -40px;
    right: -50px;
    z-index: 0;
    width: 100%;
`;
const StyledLogoImg = styled.img`
    z-index: 1;
    position: relative;
    width: 300px;
`;

const LogoWhite = ({ withDecoration }) => {
    return (
        <StyledLink to="/" style={{ display: 'block' }}>
            {withDecoration && <DecorationImg src={decoration} alt="decoration" />}
            <StyledLogoImg src={logo} alt="jarocin-logo" className="img-fluid mt-4" />
        </StyledLink>
    );
};

export default LogoWhite;
