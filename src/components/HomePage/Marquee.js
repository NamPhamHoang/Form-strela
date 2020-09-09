import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_GET_MARQUEE } from '../../api';

const Wrapper = styled('div')`
    width: 100%;
    height: auto;
    background-color: ${({ theme: { red } }) => red};
    margin-bottom: 15px;
    padding: 5px 15px;
    border-radius: 10px;
    color: #ffffff;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    marquee: {
        width: 100%;
    }
`;

export const Marquee = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        axios
            .get(API_GET_MARQUEE)
            .then(response => {
                const { content: newContent } = response.data.marquee;
                setContent(newContent);
            })
            .catch(() => {});
    });

    return (
        <>
            {content && (
                <div className="container">
                    <Wrapper>
                        {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
                        <marquee behavior="">{content}</marquee>
                    </Wrapper>
                </div>
            )}
        </>
    );
};
