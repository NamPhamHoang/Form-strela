import React from 'react';
import TabTitle from "../../../Titles/TabTitle/TabTitle";

const TabTitleBasedOnType = ({type}) => {
    switch (type) {
        case 3:
            return <TabTitle variant="primary">Gmina</TabTitle>;
        case 2:
            return <TabTitle variant="secondary">Dla przedsiębiorców</TabTitle>;
        case 1:
            return <TabTitle variant="orange">Dla mieszkańców</TabTitle>;
        default:
            return <TabTitle variant="primary">Gmina</TabTitle>;
    }
};

export default TabTitleBasedOnType;