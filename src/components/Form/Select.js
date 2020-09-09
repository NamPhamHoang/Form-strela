import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';

const StylesFontAwesomeIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 0.8rem;
    pointer-events: none;
    color: ${({ theme, invert }) => (invert ? '#ffffff' : theme.blue)};
    font-size: 1rem;
`;

const StylesFontAwesomeIconLeft = styled(StylesFontAwesomeIcon)`
    right: unset;
    left: 0.8rem;
`;

const StylesWrapper = styled.div`
    position: relative;
    width: ${({ width }) => width || 'auto'};
    font-size: ${({ fontSize }) => fontSize || '1rem'};
    display: flex;
    align-items: center;
`;

const StyledSelect = styled.select`
    padding: ${({ textAlign,iconLeft }) => (textAlign === 'left' ? (iconLeft ?'0.3rem 2.5rem' :'0.3rem 1rem' ): '0.3rem')};
    border: 1px solid ${({ theme }) => theme.blue};
    color: ${({ theme, invert }) => (invert ? '#ffffff' : theme.blue)};
    -webkit-appearance: none;
    -moz-appearance: none;
    text-align-last: ${({ textAlign }) => textAlign};
    width: 100%;
    background: ${({ theme, invert }) => (invert ? theme.blue : 'transparent')};
    border-radius: 0.6rem;
`;

export const Select = ({ name, children, icon, iconLeft, textAlign, invert, ...props }) => {
    return (
        <StylesWrapper {...props}>
            {iconLeft && <StylesFontAwesomeIconLeft icon={iconLeft} invert={invert} fixedWidth />}
            <StyledSelect {...props} iconLeft={!!iconLeft} name={name} invert={invert} textAlign={textAlign}>
                {children}
            </StyledSelect>
            <StylesFontAwesomeIcon icon={icon} fixedWidth invert={invert} />
        </StylesWrapper>
    );
};
Select.defaultProps = {
    icon: faAngleDown,
    textAlign: 'center',
    iconLeft: null,
};
