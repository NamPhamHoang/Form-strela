import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const MyLightBox = ({ images, startIndex, onClose }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(startIndex);
    }, [startIndex]);

    return (
        <Lightbox
            mainSrc={images[index]}
            nextSrc={images[(index + 1) % images.length]}
            prevSrc={images[(index + images.length - 1) % images.length]}
            onCloseRequest={onClose}
            onMovePrevRequest={() => setIndex((index + images.length - 1) % images.length)}
            onMoveNextRequest={() => setIndex((index + images.length + 1) % images.length)}
        />
    );
};

export default MyLightBox;
