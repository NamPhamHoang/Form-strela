import React, { useState } from 'react';
import BCarousel from 'react-bootstrap/Carousel';

const CarouselWithCounter = ({ photos, sliderAlt }) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        if (e) {
            setDirection(e.direction);
        }
    };

    const mappedPhotos = photos.map((photo, photoIndex) => {
        return (
            <BCarousel.Item key={photo.id}>
                <div className="photo-container">
                    <img src={photo.url} alt={`${sliderAlt} ${photoIndex + 1}`} />
                </div>
            </BCarousel.Item>
        );
    });

    return (
        <div className="carousel-with-counter">
            <div className="carousel-parent">
                <BCarousel
                    controls
                    indicators={false}
                    activeIndex={index}
                    direction={direction}
                    onSelect={handleSelect}
                >
                    {mappedPhotos}
                </BCarousel>
            </div>
            <div className="carousel-counter">
                Zdjęcie {index + 1} z {photos.length}
            </div>
        </div>
    );
};

export default CarouselWithCounter;
