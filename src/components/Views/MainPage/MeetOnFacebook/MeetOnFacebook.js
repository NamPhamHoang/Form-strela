import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { gate } from '../../../../api';

const Photo = ({ url, photo, alt }) => (
    <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={photo} alt={alt} />
    </a>
);

const StyledContainer = styled(Container)`
    display: grid;
    grid-gap: 20px;
    @media screen and (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const MeetOnFacebook = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        axios.get(`${gate}/facebook/posts`).then(({ data }) => {
            setPhotos(data.posts);
        });
    }, []);

    return (
        <StyledContainer className="meet-on-facebook">
            <h5 className="title">Spotkajmy się na Facebooku</h5>
            {photos.map((item, index) => (
                <Photo
                    key={`${item.url}`}
                    url={item.url}
                    photo={item.photoUrl}
                    alt={`Zdjęcie pobrane z facebooka numer ${index} `}
                />
            ))}
        </StyledContainer>
    );
};

export default MeetOnFacebook;
