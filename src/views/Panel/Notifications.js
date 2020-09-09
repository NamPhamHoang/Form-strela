import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import PanelTemplate from '../../templates/PanelTemplate';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import TextAndDate from '../../components/Panel/Filters/TextAndDate';
import { API_NOTIFICATIONS } from '../../api';

const Notifications = () => {
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const token = useSelector(state => state.token);

    useEffect(() => {
        axios
            .get(`${API_NOTIFICATIONS}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data }) => {
                setNotifications(data.notifications.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setRedirect('/');
            });
    }, [token]);
    return (
        <PanelTemplate className="notifications" loading={loading} redirect={redirect}>
            <SectionTitle>Powiadomienia</SectionTitle>
            <TextAndDate handleSearch={() => {}} />
            <Table responsive size="sm" className="table-simple">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Typ</th>
                        <th>Treść</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map(({ isSeen, id, created_at: date, type, content }) => (
                        <tr className={`${!isSeen ? 'new' : null}`} key={id}>
                            <td>
                                {date}
                                {!isSeen && (
                                    <>
                                        &nbsp;<span className="pill">Nowe</span>
                                    </>
                                )}
                            </td>
                            <td>{type}</td>
                            <td>{content}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </PanelTemplate>
    );
};

export default Notifications;
