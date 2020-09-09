import React from 'react';
import {Thanks} from "../Thanks";

export const BusThanks = () => {
    return (
        <Thanks category="Bilet na autobus" path={[
            { url: '/', label: 'Strona główna' },
            { url: '/kup-bilet', label: 'Kup bilet' },
            { url: '/kup-bilet/autobus', label: 'Parking' },
            { url: '/kup-bilet/autobus/podziekowanie', label: 'Podziękowanie' },
        ]} title="Jarocińskie Linie Autobusowe - kup bilet"/>
    );
};
