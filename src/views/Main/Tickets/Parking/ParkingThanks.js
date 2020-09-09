import React from 'react';
import {Thanks} from "../Thanks";

export const ParkingThanks = () => {
    return (
        <Thanks category="Parking" path={[
            { url: '/', label: 'Strona główna' },
            { url: '/kup-bilet', label: 'Kup bilet' },
            { url: '/kup-bilet/parkowanie', label: 'Parking' },
            { url: '/kup-bilet/parkowanie/podziekowanie', label: 'Podziękowanie' },
        ]} title="Parking - kup bilet"/>
    );
};