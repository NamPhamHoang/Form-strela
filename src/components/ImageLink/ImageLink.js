import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHandPointer} from '@fortawesome/pro-light-svg-icons/faHandPointer';
import DualLink from '../DualLink/DualLink';
import {device} from "../../theme/madiaQuery";

const ImgWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
height: 100%;
${({big}) => big && css`
background: none!important;
`}
`;
const StyledImg = styled.img`
display: none;

${({big}) => big && css`
min-height: 100vw;
transform: rotate(90deg);
display: block;
`}

@media ${device.laptop}{
${({big}) => big && css`
min-height: unset;
transform: rotate(0deg);
`}
}

`;

const ImageLink = ({big, variant, internal, alt, category, title, img, to,className, ...props}) => {
    return (
        <div className={`image-link image-link-${variant} ${className}`} >
            <div className="click-me">
                <FontAwesomeIcon icon={faHandPointer} size='3x'/>
            </div>
            <DualLink to={to} internal={internal} className="link-clear">
                <ImgWrapper className=""
                            big={big}
                            style={{backgroundImage: `url(${img})`}}
                >
                    <StyledImg big={big} src={img} alt={alt}/>
                </ImgWrapper>
                <div className="caption">
                    <h5>{category}</h5>
                    <h4>{title}</h4>
                </div>
            </DualLink>
        </div>
    );
};

ImageLink.propTypes = {
    variant: PropTypes.oneOf(['primary', 'orange']).isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};


export default ImageLink;