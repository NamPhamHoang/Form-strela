import React from 'react';
import Input from '../../../Input/Input';
import Button from 'react-bootstrap/Button';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';


const Location = ({ locations, location, locationChange, modalShow, manageModal, deleteLocation, newLocations, newLocation, changeNewLocation, addNewLocation }) => {
    return (
        <div className="location">
            <Input
                label="Wybierz lokalizację"
                name="location"
                value={location.toString()}
                onChange={locationChange}
                select
                size="lg"
                variant="shadow"
                icon={faAngleDown}
                floating
            >
                <option disabled/>
                {locations.map(item => (
                    <option value={item.location.id}
                            key={item.id}>{item.location.name} - {item.location.description}</option>
                ))}
            </Input>
            <Button onClick={manageModal(true)} size="sm">
                Zarządzaj listą lokalizacji
            </Button>
            <Modal show={modalShow} onHide={manageModal(false)}>
                <Modal.Header>
                    Zarządzaj listą lokalizacji
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {locations.map(item => (
                            <li key={item.id}>
                                {item.location.name} <Button onClick={deleteLocation(item.id)} variant="danger"
                                                             style={{ padding: '.1rem .2rem' }}
                                                             size="sm"><FontAwesomeIcon
                                icon={faTimes}/></Button>
                            </li>
                        ))}
                    </ul>
                    {locations.length < 5 && <>
                        <Input
                            label="Wybierz nową"
                            name="location"
                            value={newLocation.toString()}
                            onChange={changeNewLocation}
                            select
                            size="lg"
                            variant="shadow"
                            icon={faAngleDown}
                            floating
                        >
                            <option disabled/>
                            {newLocations.map(item => (
                                <option value={item.id}
                                        key={item.id}>{item.name} - {item.description}</option>
                            ))}
                        </Input>
                        < Button onClick={addNewLocation} size='sm'>Dodaj</Button>
                    </>}
                    {locations.length >= 5 && <p>Możesz dodać maksymalnie 5 lokalizacji</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={manageModal(false)}
                        size="sm"
                        variant="secondary"
                    >
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Location;