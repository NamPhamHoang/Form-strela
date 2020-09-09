import styled from "styled-components";
import {PrimaryButton} from "../Buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Step = styled.div`
    width: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const Steps = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    transform: translateX(${({currentStep}) => `-${(currentStep - 1) * 100}`}%);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

export const StyledMain = styled.main`
    display: flex;
    align-items: center;
    flex-direction: column;
`;
export const StyledPrimaryButton = styled(PrimaryButton)`
    margin-top: 30px;
`;
export const StyledSpan = styled.span`
    margin: 0 10px;
`;
export const StyledTicketOptionWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${({items}) => items}, 1fr);
    grid-column-gap: 20px;
    width: 100%;
`;
export const StyledTicketOption = styled.label`
    background-color: ${({active, theme}) => (active ? theme.blue : '#ffffff')};
    color: ${({active, theme}) => (!active ? theme.blue : '#ffffff')};
    border: 1px solid ${({theme}) => theme.blue};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 15px;

    & > input {
        display: none;
    }
    & > span {
        color: ${({active}) => (!active ? '#000000' : '#ffffff')};
    }
`;

export const StyledTicketPrice = styled.p`
    font-size: 2rem;
    ${({active}) => (active && 'color: #ffffff')};
`;
export const StyledForm = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
`;

export const StyledTableRow = styled.div`
    width: 90%;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 7px 7px 20px -9px rgba(0,0,0,0.75);
    display: grid;
    grid-template-columns: 80% 15% 5%;
    padding: 10px 20px;
    margin: 0 0 30px;
    color: #000000;
    p{
    margin: 0;
    }
`;

export const StyledTableHeader = styled(StyledTableRow)`
    background-color: ${({theme}) => theme.blue};
    box-shadow: none;
    color: #ffffff;
`;

export const StyledTableRowPrice = styled.span`
    color: ${({theme}) => theme.blue};
`;
export const StyledSumPriceWrapper = styled.div`
width: 90%;
display: flex;
align-items: center;
justify-content: flex-end;
`;
export const StyledSumPrice = styled.span`
color: ${({theme}) => theme.blue};
font-size: 1.6rem;
font-weight: 500;
margin-right: 30px;
`;

export const FontAwesomeIconSpinner = styled(FontAwesomeIcon)`
animation: rotate .8s infinite;
font-size: 2rem;
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;