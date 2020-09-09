import styled from 'styled-components';

export const Gallery = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 10px;
    margin: 10px 0;
    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        overflow: hidden;
        & > img {
            width: 100%;
            height: auto;
            cursor: pointer;
            border-radius: 10px;
        }
    }
`;
