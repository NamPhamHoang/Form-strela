import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/pro-solid-svg-icons/faAngleDown';
import { Gallery } from '../Gallery/Gallery';
import MyLightBox from '../LightBox/LightBox';

const Collapse = ({ id, title, content, renderChild, children, gallery, opened, setOpened }) => {
    const display = renderChild ? children : <div dangerouslySetInnerHTML={{ __html: content }} />;
    const [isOpen, setIsOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    return (
        <div>
            <Accordion.Toggle
                className={`btn btn-collapse btn-primary ${opened === id ? 'active' : ''}`}
                variant="link"
                eventKey={id}
                onClick={() => setOpened(id === opened ? null : id)}
            >
                {title}
                <div className="icon">
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={id} className="content">
                <>
                    {display}
                    {!!gallery && (
                        <>
                            {!!gallery.length && (
                                <>
                                    <h5>GALERIA ZDJĘĆ</h5>
                                    <Gallery>
                                        {gallery.map(({ imageLink }, index) => (
                                            <div className="galleryImageDiv">
                                                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                                                <img
                                                    src={imageLink}
                                                    alt=""
                                                    onClick={() => {
                                                        setStartIndex(index);
                                                        setIsOpen(true);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </Gallery>
                                </>
                            )}
                            {isOpen && !!gallery.length && (
                                <MyLightBox
                                    images={gallery.map(({ imageLink }) => imageLink)}
                                    startIndex={startIndex}
                                    onClose={() => setIsOpen(false)}
                                />
                            )}
                        </>
                    )}
                </>
            </Accordion.Collapse>
        </div>
    );
};

export default Collapse;
