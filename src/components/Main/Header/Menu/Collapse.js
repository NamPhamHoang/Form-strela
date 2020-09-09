import React from 'react';
import PropTypes from 'prop-types';
import ButtonWideIcon from '../../../Buttons/ButtonWideIcon/ButtonWideIcon';
import { CSSTransition } from 'react-transition-group';
import DualLink from '../../../DualLink/DualLink';

const Collapse = props => {
    return (
        <>
            <ButtonWideIcon
                active={props.active}
                icon={props.icon}
                onClick={props.toggleActive}
            >
                {props.label}
            </ButtonWideIcon>
            <CSSTransition
                in={props.active}
                classNames={`angle-slide-${props.direction}`}
                timeout={300}
                unmountOnExit
            >
                <ul className="angle-list">
                    {props.items.map((item) => (
                        <li key={item.id}>
                            <DualLink to={item.url} className="text-white" internal={item.internal_url}>
                                {item.name}
                            </DualLink>
                        </li>
                    ))}
                </ul>
            </CSSTransition>
        </>
    );
};

Collapse.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.instanceOf(Object).isRequired,
    items: PropTypes.instanceOf(Array).isRequired,
};

export default Collapse;