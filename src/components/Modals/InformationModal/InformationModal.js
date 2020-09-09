import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';

const InformationModal = ({ title, className, children }) => {
    const [show, setShow] = useState(false);
    const onHide = () => setShow(false);

    return (
        <div className={`information-modal ${className}`}>
            <div className="button-container">
                <Button onClick={() => setShow(true)}>
                    Informacje <FontAwesomeIcon icon={faInfoCircle}/>
                </Button>
            </div>
            <Modal show={show} onHide={onHide} size="lg" centered>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} size="sm">
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

InformationModal.defaultProps = {
    title: 'Informacje',
    className: '',
};

export default InformationModal;