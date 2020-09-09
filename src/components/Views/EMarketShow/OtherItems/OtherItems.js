import React from 'react';
import { faShoppingCart } from '@fortawesome/pro-regular-svg-icons';
import Announcement from '../../MainPage/Announcements/Announcement/Announcement';

const OtherItems = ({ items }) => {
    return (
        <div className="other-items">
            <Announcement
                title="Inne ogłoszenia z tej kategorii"
                button={{
                    title: 'Wszystkie ogłoszenia',
                    icon: faShoppingCart,
                    to: '/e-targ',
                }}
                items={items.map(item => {
                    item.photoUrl = item.thumbnailUrl;
                    return item;
                })}
                variant="light"
                pathCore="e-targ"
            />
        </div>
    );
};

export default OtherItems;
