import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import SelectAndDate from '../../components/Panel/Filters/SelectAndDate';
import ConsultantCard from '../../components/Cards/ConsultantCard/ConsultantCard';
import image from '../../img/wide-button-1.png';
import { API_GET_EVENTS_TICKETS } from '../../api';
import {getPrice} from "../../helpers";

const TableItem = ({ type, date, valid, price, eventName, photo }) => {
    const [opened, setOpened] = useState(false);
    return (
        <Accordion defaultActiveKey="0">
            <div className={`tr ${opened ? 'bg-light' : ''}`}>
                <div className="td">{type}</div>
                <div className="td">{date}</div>
                <div className="td">{valid}</div>
                <div className="td">{getPrice(price)}</div>
                <div className="td action-buttons">
                    <Accordion.Toggle
                        eventKey="1"
                        as={Button}
                        variant="primary"
                        size="sm"
                        onClick={() => setOpened(!opened)}
                    >
                        {opened ? 'Schowaj' : 'Zobacz'}
                    </Accordion.Toggle>
                    {/* <Button variant="primary-darken" size="sm">
                        Ponów
                    </Button> */}
                </div>
                <Accordion.Collapse eventKey="1">
                    <div className="inside-collapse">
                        {/*
                            TODO: Będą kompletnie różne rzezy tutaj - osoba z obsługi, atrybuty. Co z
                        */}
                        <div className="properties">
                            <ul className="list-unstyled">
                                <li>{eventName}</li>
                                <li>Czas trwania: 1h 30min</li>
                                <li>Ważność: {valid}</li>
                            </ul>
                        </div>
                        <div className="qr-code">
                            <img src={photo} alt="zdjęcie wydarzenia" width="300" className="img-fluid" />
                        </div>
                        <div className="help">
                            <p>
                                Masz pytania?
                                <br />Z chęcią na nie odpowiemy
                            </p>
                        </div>
                        <ConsultantCard
                            img={image}
                            alt="Obsługa klienta"
                            phone="(62) 123 12 12"
                            position="Obsługa klienta"
                            name="Katarzyna Kowalska-Nowak"
                            className="card"
                        />
                    </div>
                </Accordion.Collapse>
            </div>
        </Accordion>
    );
};

const BuyTicketPanel = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [redirect] = useState(null);
    const token = useSelector(state => state.token);

    const getTickets = async () => {
        try {
            const response = await axios.get(API_GET_EVENTS_TICKETS, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.tickets;
        } catch (e) {
            throw e;
        }
    };

    useEffect(() => {
        getTickets()
            .then(newTickets => {
                setTickets(newTickets);
                setLoading(false);
            })
            .catch(e => {
                console.error(e);
                setLoading(false);
            });
    });

    return (
        <PanelTemplate className="buy-ticket-panel" loading={loading} redirect={redirect}>
            <SectionTitle>Kupione bilety</SectionTitle>
            <SelectAndDate
                handleSearch={values => {
                    console.log(values);
                }}
                selectLabel="Typ biletu"
            >
                <option>1</option>
                <option>2</option>
            </SelectAndDate>
            <div className="table-responsive">
                <div className="simulated-table simulated-table-sm simulated-table-simple">
                    <div className="thead">
                        <div className="tr">
                            <div className="th">Typ biletu</div>
                            <div className="th">Data zakupu</div>
                            <div className="th">Ważność</div>
                            <div className="th">Kwota</div>
                            <div className="th">Akcja</div>
                        </div>
                    </div>
                    <div className="tbody">
                        {tickets.map(item => (
                            <TableItem
                                type="Bilet na wydarzenie"
                                eventName={item.event_name}
                                date={item.created_at}
                                valid={item.event_party_at}
                                price={item.price}
                                photo={item.event_photo}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </PanelTemplate>
    );
};

export default BuyTicketPanel;
