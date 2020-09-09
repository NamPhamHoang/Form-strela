import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PrimaryButton } from '../../../components/Buttons/Button';

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    position: relative;
    @media screen and (max-width: 1000px) {
        grid-template-columns: repeat(2, 1fr);
    }
    ${({ opened }) =>
        opened &&
        css`
            padding-top: 300px;
        `}
`;

export const ContactWrapper = styled.div`
    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
    border-radius: 10px;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    width: 100%;
    display: grid;
    grid-template-columns: 25% 1fr;
    grid-gap: 20px;
    padding: 20px;
    margin-bottom: 30px;
    position: relative;
    transition: transform 0.4s linear;
    transform-origin: top left;
    transform: scale(0);
    ${({ opened }) =>
        opened &&
        css`
            transform: scale(1);
        `}
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    text-align: center;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    background-color: #ffffff;
    > span {
        margin-bottom: 10px;
    }
    border-radius: 10px;
    top: 100px;
    transition: top 1s ease-in-out;

    ${({ opened }) =>
        opened &&
        css`
            position: absolute;
            z-index: 10;
            top: 0;
        `}
`;
export const StyledPrimaryButton = styled(PrimaryButton)`
    padding: 0.7rem;
    font-size: 14px;
`;
export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${({ theme: { blue } }) => blue};
`;

export const IconItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-start;
    margin: 10px auto;
    ${StyledFontAwesomeIcon} {
        width: 20px;
        margin-right: 5px;
    }
`;

export const ContactCollapseGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
`;

export const CloseButton = styled.button`
    display: flex;
    border: none;
    background: transparent;
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    padding: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    :before,
    :after {
        content: '';
        width: 100%;
        height: 1px;
        background: #000000;
        transform: rotate(45deg);
    }
    :after {
        transform: translateY(-1px) rotate(-45deg);
    }
`;

export const NameP = styled.p`
    text-align: center;
`;
