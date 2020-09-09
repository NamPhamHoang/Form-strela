import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  &:before{
    width: 1em;
    height: 1em;
    pointer-events: none;
    content: "";
    background-color: ${({checked, theme: {blue}}) => checked ? blue : "#fff"};
    border: 1px solid ${({theme: {blue}}) => blue};
    display: inline-flex;
    border-radius: ${({type}) => (type === "checkbox") ? "0.2em" : "50%"};
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-right: 5px;
  }
`;
const StyledInput = styled.input`
display: none;
`;

export const CheckBox = ({id, children, ...props}) => {
  return (
      <StyledLabel htmlFor={id} {...props}>
        <StyledInput {...props} id={id}/>
        {children}
      </StyledLabel>
  );
};