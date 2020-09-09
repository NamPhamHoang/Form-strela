import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';
import IconStrap from '../../IconStrap/IconStrap';
import Weather from './Weather';
import SquareButtons from './SquareButtons';
import WideButtons from './WideButtons';
import Menu from './Menu/Menu';
import Logo from '../../Logo/Logo';
import wideButton1 from '../../../img/wide-button-1.png';
import wideButton2 from '../../../img/wide-button-2.png';
import { MainButton, MainButtonsWrapper } from './MainButtons';
import wideButton3 from '../../../img/wide-button-3.png';
import wideButton4 from '../../../img/wide-button-4.png';

const StyledHeader = styled.header`
    display: grid;
    grid-template-columns: calc(50vw - 555px) 1fr 1fr calc(50vw - 555px);
    display: none;
`;
const GrayDiv = styled.div`
background: #f2f2f2;
display: flex;
flex-direction: column;
justify-content: space-between;
${({ roundLeftBottom }) =>
    roundLeftBottom &&
    css`
        border-bottom-left-radius: 0.5rem;
    `}
${({ roundLeftTop }) =>
    roundLeftTop &&
    css`
        border-top-left-radius: 0.5rem;
    `}
${({ roundRightTop }) =>
    roundRightTop &&
    css`
        border-top-right-radius: 0.5rem;
    `}
${({ roundRightBottom }) =>
    roundRightBottom &&
    css`
        border-bottom-right-radius: 0.5rem;
    `}
${({ height }) =>
    height &&
    css`
        height: ${height};
    `}
`;

const DarkGrayDiv = styled(GrayDiv)`
    background: #919191;
`;

const HeaderRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
`;

const MainHeader = props => {
    if (props.redirect) return <Redirect to={props.redirect} />;
    return (
        <>
            <StyledHeader>
                <Menu
                    visible={props.menu}
                    onTimesClick={props.toggleMenu}
                    searchValue={props.searchValue}
                    search={props.search}
                    handleSearch={props.handleSearch}
                    onSearchChange={props.handleSearchChange}
                    onSearchClick={props.toggleSearch}
                />
                <GrayDiv />
                <GrayDiv roundRightBottom>
                    <Logo />
                    <MainButtonsWrapper left>
                        <MainButton link="/e-urzad" linkImg={wideButton1}>
                            <b>e</b>Urząd
                        </MainButton>
                        <MainButton link="/strefa-mieszkanca" linkImg={wideButton2}>
                            <b>Strefa</b> mieszkańca
                        </MainButton>
                    </MainButtonsWrapper>
                </GrayDiv>
                <HeaderRight>
                    <IconStrap background="secondary" />
                    <div
                        className={`w-100 d-flex mb-4 mt-2 mt-md-4 flex-wrap justify-content-end ${
                            props.search ? 'search-enabled' : ''
                        }`}
                    >
                        <Weather />
                        <SquareButtons
                            searchValue={props.searchValue}
                            search={props.search}
                            handleSearch={props.handleSearch}
                            onSearchChange={props.handleSearchChange}
                            onMenuClick={props.toggleMenu}
                            onSearchClick={props.toggleSearch}
                        />
                    </div>
                    <MainButtonsWrapper right>
                        <MainButton link="/kup-bilet" linkImg={wideButton3}>
                            <b>Kup</b> bilet
                        </MainButton>
                        <MainButton link="/e-targ" linkImg={wideButton4}>
                            <b>e</b>Targ
                        </MainButton>
                    </MainButtonsWrapper>
                </HeaderRight>
                <div>
                    <DarkGrayDiv height="2.26rem" />
                </div>
            </StyledHeader>
            <header className="main-header">
                <Menu
                    visible={props.menu}
                    onTimesClick={props.toggleMenu}
                    searchValue={props.searchValue}
                    search={props.search}
                    handleSearch={props.handleSearch}
                    onSearchChange={props.handleSearchChange}
                    onSearchClick={props.toggleSearch}
                />
                <Container>
                    <Row className="pb-lg-2">
                        <Col md={6}>
                            <Logo withDecoration />
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col xl={12} className="d-none d-md-flex justify-content-end">
                                    <IconStrap background="secondary" />
                                </Col>
                                <Col
                                    xl={12}
                                    className={`d-flex mb-4 mt-2 mt-md-4 flex-wrap justify-content-end ${
                                        props.search ? 'search-enabled' : ''
                                    }`}
                                >
                                    <Weather />
                                    <SquareButtons
                                        searchValue={props.searchValue}
                                        search={props.search}
                                        handleSearch={props.handleSearch}
                                        onSearchChange={props.handleSearchChange}
                                        onMenuClick={props.toggleMenu}
                                        onSearchClick={props.toggleSearch}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <WideButtons />
                </Container>
            </header>
        </>
    );
};

MainHeader.propTypes = {};

export default MainHeader;
