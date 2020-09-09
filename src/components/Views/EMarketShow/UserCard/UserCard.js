import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faEnvelope, faPhone, faStar as starLight } from '@fortawesome/pro-light-svg-icons';
import { faStar as starSolid } from '@fortawesome/pro-solid-svg-icons';
import { RedButton } from '../../../Buttons/Button';

const StyledRedButton = styled(RedButton)`
    display: block;
    width: calc(100% - 2rem);
    text-align: left;
    color: #fff;
    margin: 0.5rem 1rem;
    padding: 0.5rem 0.25rem 0.5rem 1rem;
`;

const StyledFontAwesomeWrapper = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 5px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme: { blue } }) => blue};
`;
const StyledFontAwesomeIconCamera = styled(FontAwesomeIcon)`
    color: #ffffff;
    font-size: 40px;
`;

const FavoriteButton = ({ favorite, disabled = false, toggleFavorite }) => {
    const star = favorite ? starSolid : starLight;
    const text = favorite ? 'Usuń z' : 'Dodaj do';

    return (
        <Button className="favorite" size="sm" disabled={disabled} onClick={toggleFavorite}>
            <FontAwesomeIcon icon={star} className="text-orange" fixedWidth /> {text} obserwowanych
        </Button>
    );
};

const PhoneButton = ({ phone }) => {
    const [visible, setVisible] = useState(false);
    const showButton = (
        <button type="button" className="btn btn-link" onClick={() => setVisible(true)}>
            Pokaż numer
        </button>
    );
    const parsedPhone = visible ? phone : `${phone.substring(0, 3)} ... ...`;
    return (
        <StyledRedButton variant="orange" className="phone" size="sm">
            <FontAwesomeIcon icon={faPhone} fixedWidth /> {parsedPhone} {!visible && showButton}
        </StyledRedButton>
    );
};

const UserCard = ({ name, img, phone, favorite, userId, showEmailModal, isPreview, toggleFavorite }) => {
    return (
        <div className="user-card">
            <header>
                <div className="avatar">
                    {img ? (
                        <img src={img} alt="todo" />
                    ) : (
                        <StyledFontAwesomeWrapper>
                            <StyledFontAwesomeIconCamera icon={faCamera} />
                        </StyledFontAwesomeWrapper>
                    )}
                </div>
                <span>{name}</span>
            </header>
            {!isPreview && (
                <Link to={`/e-targ?uzytkownik=${userId}`} className="link-clear">
                    Zobacz ogłoszenia użytkownika
                </Link>
            )}
            {isPreview && (
                <Link to="#test" className="link-clear">
                    Zobacz ogłoszenia użytkownika
                </Link>
            )}
            <PhoneButton phone={phone} />
            <Button size="sm" onClick={showEmailModal}>
                <FontAwesomeIcon icon={faEnvelope} fixedWidth /> Zapytaj o produkt
            </Button>
            <FavoriteButton favorite={favorite} toggleFavorite={toggleFavorite} />
        </div>
    );
};

export default UserCard;
