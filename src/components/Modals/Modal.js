import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { faInfo } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${({ theme: { red } }) => red};
`;

const StyledLink = styled(Link)`
    color: #ffffff;
    background-color: ${({ primary, theme: { blue, darkgray } }) => (primary ? blue : darkgray)};
    padding: ${({ primary }) => (primary ? '10px 50px' : '10px 30px')};
    border-radius: 100px;
    font-size: ${({
        primary,
        theme: {
            font: {
                size: { m, s },
            },
        },
    }) => (primary ? m : s)};
    font-weight: 600;
`;

const StyledP = styled.p`
    margin-top: 40px;
`;

const CloseButton = styled.button`
    border: none;
    position: absolute;
    right: 10px;
    top: 10px;
    display: block;
    background: transparent;
    color: ${({ theme: { darkgray } }) => darkgray};
`;

const ModalContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
`;

const StyledModal = styled.div`
    border-radius: 30px;
    border: 10px solid ${({ theme: { blue } }) => blue};
    padding: 30px;
    background-color: #ffffff;
    position: relative;
    width: 800px;
    max-width: 95%;
    max-height: 90%;
    overflow: scroll;
    transform: scale(0);
    transition: transform 0.5s ease-in-out;
    ${({ opened }) =>
        opened &&
        css`
            transform: scale(1);
        `}
`;

const StyledBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    opacity: 0;
    justify-content: center;
    transition: opacity 0.2s ease-in-out, z-index 0.2s ease-in-out;
    z-index: -1;
    ${({ opened }) =>
        opened &&
        css`
            z-index: 100000;
            opacity: 1;
        `}
`;

export const Modal = ({ children, opened, closeModal, ...props }) => {
    const [showBackground, setShowBackground] = useState(false);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        if (opened) {
            setShowBackground(true);
            setTimeout(() => {
                setShowModal(true);
            }, 100);
        } else {
            setShowModal(false);
            setTimeout(() => {
                setShowBackground(false);
            }, 400);
        }
    }, [opened]);
    return (
        <StyledBackground opened={showBackground}>
            <StyledModal opened={showModal} {...props}>
                <CloseButton type="button" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} className="icon" size="2x" />
                </CloseButton>
                {children}
            </StyledModal>
        </StyledBackground>
    );
};

export const BlockFunctionModal = ({ opened, closeModal }) => {
    return (
        <Modal opened={opened} closeModal={closeModal}>
            <ModalContent>
                <StyledFontAwesomeIcon icon={faInfo} className="icon" size="3x" />
                <h4>Wybrana przez Ciebie funkcja będzie niebawem dostępna!</h4>
                <p>
                    Zaloguj się, aby dowiedzieć się o tym jako pierwszy/a <br />i od razu z niej skorzystać!
                </p>
                <StyledLink to="/logowanie" primary>
                    Logowanie
                </StyledLink>
                <StyledP>Nie posiadasz jeszcze konta w serwisie jarocin.pl? Możesz szybko założyć tutaj:</StyledP>
                <StyledLink to="/rejestracja">Rejestracja</StyledLink>
            </ModalContent>
        </Modal>
    );
};
