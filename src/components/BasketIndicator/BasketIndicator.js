import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import connect from 'react-redux/es/connect/connect';
import { CSSTransition } from 'react-transition-group';
import { Button } from 'react-bootstrap';
import { faShoppingCart } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';

const BasketIndicator = props => {
    const [listOpened, setListOpened] = useState(false);
    const { baskets } = props;
    const basketKeys = Object.keys(baskets);
    let render = false;
    basketKeys.forEach(key => {
        const basket = baskets[key];
        if (basket.items.length > 0) render = true;
    });

    if (!render) return null;

    return (
        <div className="basket-indicator">
            <CSSTransition
                in={listOpened}
                classNames="basket-indicator-list"
                timeout={300}
            >
                <div className="list">
                    {Object.keys(baskets).map(key => {
                        const basket = baskets[key];
                        if (basket.items.length === 0) return null;
                        return (
                            <Link key={basket.href} to={basket.href} className="list-item link-clear">
                                <FontAwesomeIcon icon={faShoppingCart}/> {basket.name} - {basket.sum}zł
                            </Link>
                        );
                    })}
                </div>
            </CSSTransition>
            <Button onClick={() => setListOpened(!listOpened)} className="icon">
                <FontAwesomeIcon icon={faShoppingCart}/>
            </Button>
        </div>
    );
};

const mapStateToProps = ({ baskets }) => ({ baskets });

export default connect(mapStateToProps)(BasketIndicator);