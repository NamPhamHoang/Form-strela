import React from 'react';
import styled from 'styled-components';
import LayoutCardWithTitleAndPath from '../../../templates/LayoutCardWithTitleAndPath';

const StyledMain = styled.main`
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    margin: 50px auto;
    & > h2 {
        color: ${({ theme: { blue } }) => blue};
    }
`;

export const Thanks = ({ path, category, title }) => {
    return (
        <>
            <LayoutCardWithTitleAndPath pathItems={path} category={category} title={title} className="news-index">
                <StyledMain>
                    <h2>Dziękujemy za zakup!</h2>
                    <p>Bilety zostały wysłane na Twój adres e-mail!</p>
                    <p>
                        Jeśli posiadasz konto w serwisie jarocin.pl jest on dostępne również w Twoim panelu klienta oraz
                        w aplikacji mobilnej jarocin.pl
                    </p>
                </StyledMain>
            </LayoutCardWithTitleAndPath>
        </>
    );
};
/*
* title={title}
            description={title}
            keywords={title}
            redirect={null}
            loading={false}
            *
* */
