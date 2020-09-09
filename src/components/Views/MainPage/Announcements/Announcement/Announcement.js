import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoadingGrayCard from '../../../../Loading/LoadingGrayCard/LoadingGrayCard';
import { getImage } from '../../../../../helpers';
import { PrimaryButton, RedButton } from '../../../../Buttons/Button';

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 15px 0;
    width: 100%;
    height: 100%;
    position: relative;
    ul {
        width: 100%;
    }
    > * {
        z-index: 1;
    }
`;

const StyledPrimaryButton = styled(PrimaryButton)`
    font-size: 1.1rem;
`;
const StyledRedButton = styled(RedButton)`
    font-size: 1.1rem;
`;

const Announcement = ({
    children,
    loading,
    altPrefix,
    variant,
    hasAddress,
    pathCore,
    title,
    button,
    items,
    blue,
    red,
}) => {
    return (
        <div className={`announcement announcement-${variant} ${loading ? 'px-0' : ''}`}>
            {loading && <LoadingGrayCard />}
            {!loading && (
                <StyledWrapper>
                    {blue ? (
                        <StyledPrimaryButton inactive>{title}</StyledPrimaryButton>
                    ) : (
                        <StyledRedButton inactive>{title}</StyledRedButton>
                    )}
                    <ul className="list-unstyled">
                        {items.map(item => (
                            <li key={item.slug}>
                                <Link to={`/${pathCore}/${item.slug}`} className="link-clear">
                                    <div className="image">
                                        <img
                                            src={getImage(item.photoUrl || item.logo)}
                                            alt={`${altPrefix} - ${item.slug}`}
                                        />
                                    </div>
                                    <div className="content">
                                        <h6>{item.title}</h6>
                                        {hasAddress && (
                                            <address>
                                                <b>{item.name}</b>
                                                <br />
                                                {item.street} {item.number}, {item.city}, {item.postal}, Tel.:
                                                {item.phone}
                                            </address>
                                        )}
                                    </div>
                                    {item.fields &&
                                        item.fields
                                            .filter(({ name }) => {
                                                return name === 'cena';
                                            })
                                            .map(({ value }) => <div key={value}>{value} zł</div>)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {red ? (
                        <RedButton to={button.to}>{button.title}</RedButton>
                    ) : (
                        <PrimaryButton to={button.to}>{button.title}</PrimaryButton>
                    )}
                    {children}
                </StyledWrapper>
            )}
        </div>
    );
};

export default Announcement;
