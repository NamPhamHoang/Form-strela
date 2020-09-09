import React from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';

const StyledContainer = styled(Container)`
    margin-bottom: 50px;
`;
const LayoutCard = ({ className, children, ...props }) => {
    return (
        <StyledContainer {...props}>
            <div className={`card card-layout ${className}`}>{children}</div>
        </StyledContainer>
    );
};

export default LayoutCard;
