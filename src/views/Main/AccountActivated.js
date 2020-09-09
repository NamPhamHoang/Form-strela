import React from 'react';
import styled from 'styled-components';
import LayoutCardWithTitleAndPath from '../../templates/LayoutCardWithTitleAndPath';
import { PrimaryButton } from '../../components/Buttons/Button';

const StyledMain = styled.main`
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    margin: 50px auto;
    & > h2 {
        color: ${({ theme: { blue } }) => blue};
    }
`;

export const AccountActivated = () => {
    return (
        <>
            <LayoutCardWithTitleAndPath
                pathItems={[
                    {
                        url: '/',
                        label: 'Strona główna',
                    },
                    {
                        url: '/konto-aktywowane',
                        label: 'Aktywacja konta',
                    },
                ]}
                category=""
                title=""
                className="news-index"
            >
                <StyledMain>
                    <h2>Twoje konto jest aktywne - zaloguj się!</h2>
                    <PrimaryButton to="/logowanie">Zaloguj się</PrimaryButton>
                </StyledMain>
            </LayoutCardWithTitleAndPath>
        </>
    );
};

/* title="Jarocin.pl"
            description="Jarocin.pl"
            keywords="Jarocin.pl"
            redirect={null}
            loading={false} */
