import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/pro-regular-svg-icons';
import { faFont, faUser } from '@fortawesome/pro-solid-svg-icons';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import Socials from '../Socials/Socials';

const setFontSize = (size) => {
    localStorage.setItem('fontSize', size);
    const { classList } = document.documentElement;
    classList.remove('version-small', 'version-normal', 'version-large');
    classList.add(size);
};

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
${({ifAuth, theme}) => ifAuth && css`
color: ${theme.blue}!important;
`}
`;

const toggleHighContrast = () => {
    let highContrast = localStorage.getItem('highContrast') || false;
    highContrast = highContrast === 'true';
    highContrast = !highContrast;
    console.log(highContrast);
    if (highContrast) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', highContrast);
};

const IconStrap = props => {
    const token = useSelector(state => state.token);

    return (
        <div className={`bg-${props.background} icon-strap`}>
            <div className="accessibility">
                <FontAwesomeIcon icon={faAdjust} fixedWidth className="mr-1" onClick={toggleHighContrast}/>
                <FontAwesomeIcon icon={faFont} onClick={() => setFontSize('version-small')}/>
                <FontAwesomeIcon icon={faFont} onClick={() => setFontSize('version-normal')}/>
                <FontAwesomeIcon icon={faFont} onClick={() => setFontSize('version-large')}/>
            </div>
            <Socials/>
            <div className="ml-3">
                <Link to={token ? "/panel/ustawienia":"/logowanie"} className="link-clear d-block">
                    <StyledFontAwesomeIcon icon={faUser} fixedWidth ifAuth={!!token}/>
                </Link>
            </div>
        </div>
    );
};

IconStrap.propTypes = {
    background: PropTypes.string.isRequired,
};

export default IconStrap;