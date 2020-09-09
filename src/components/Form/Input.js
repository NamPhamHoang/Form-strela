import React from 'react';
import styled from 'styled-components'

const StyledInput = styled.input`
border-radius: 5px;
border: 1px solid ${({theme:{blue}, borderColor})=>borderColor || blue};
${({width})=> width && `width:${width}`}
`;

export const Input = ({...props}) => {
    return (
        <StyledInput {...props}/>
    );
};