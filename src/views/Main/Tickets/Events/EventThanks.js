import React from 'react';
import {Thanks} from "../Thanks";

export const EventThanks = () => {
    return (
        <Thanks category="Wydarzenia" path={[
            { url: '/', label: 'Strona główna' },
            { url: '/kup-bilet', label: 'Kup bilet' },
            { url: '/kup-bilet/wydarzenia', label: 'Wydarzenia' },
            { url: '/kup-bilet/wydarzenia/podziekowanie', label: 'Podziękowanie' },
        ]} title="Wydarzenia - kup bilet"/>
    );
};