import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-regular-svg-icons';
import styled from 'styled-components';
import ButtonSquare from '../../Buttons/ButtonSquare/ButtonSquare';
import bipLogo from '../../../img/bip-logo.png';
import ButtonSearch from '../../Buttons/ButtonSearch/ButtonSearch';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: #ffffff;
`;
const Wrapper = styled.div`
    display: flex;
    min-width: 180px;
`;
const MenuBtnTxt = styled.div`
    font-size: 10px;
`;

const SquareButtons = props => {
    return (
        <Wrapper className="square-buttons">
            <ButtonSearch
                search={props.search}
                searchValue={props.searchValue}
                onSearchChange={props.onSearchChange}
                onSearchClick={props.onSearchClick}
                handleSearch={props.handleSearch}
            />
            <ButtonSquare red href="http://bip2.wokiss.pl/jarocin/" variant="secondary" className="ml-1 btn--bip">
                <img src={bipLogo} alt="bip-logo" className="img-fluid" />
            </ButtonSquare>
            <ButtonSquare className="ml-1 d-block" onClick={props.onMenuClick} blue>
                <MenuBtnTxt>MENU</MenuBtnTxt>
                <StyledFontAwesomeIcon icon={faBars} size="lg" />
            </ButtonSquare>
        </Wrapper>
    );
};

export default SquareButtons;
