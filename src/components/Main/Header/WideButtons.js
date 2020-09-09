import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import wideButton1 from '../../../img/wide-button-1.png';
import wideButton2 from '../../../img/wide-button-2.png';
import wideButton3 from '../../../img/wide-button-3.png';
import wideButton4 from '../../../img/wide-button-4.png';
import ButtonWideImage from '../../Buttons/ButtonWideImage/ButtonWideImage';

const BtnCol = props => {
    const className = `${props.marginTop} mt-xl-0`;
    return (
        <Col md={6} xl={3} className={className}>
            {props.children}
        </Col>
    );
};
BtnCol.defaultProps = {
    marginTop: '',
};

const WideButtons = props => {
    return (
        <div className={`wide-buttons form-row pt-lg-3 pb-4 ${props.className}`}>
            <BtnCol marginTop="mt-5 mt-md-0">
                <Link to="/e-urzad">
                    <ButtonWideImage image={wideButton1} alt="wide-button-1">
                        <b>e</b>Urząd
                    </ButtonWideImage>
                </Link>
            </BtnCol>
            <BtnCol marginTop="mt-5 mt-md-0">
                <Link to="/strefa-mieszkanca">
                    <ButtonWideImage image={wideButton2} alt="wide-button-2">
                        <b>Strefa</b> mieszkańca
                    </ButtonWideImage>
                </Link>
            </BtnCol>
            <BtnCol marginTop="mt-5 mt-xl-0">
                <Link to="/kup-bilet">
                    <ButtonWideImage image={wideButton3} alt="wide-button-3">
                        <b>Kup</b> bilet
                    </ButtonWideImage>
                </Link>
            </BtnCol>
            <BtnCol marginTop="mt-5 mt-xl-0">
                <Link to="/e-targ">
                    <ButtonWideImage image={wideButton4} alt="wide-button-4">
                        <b>e</b>Targ
                    </ButtonWideImage>
                </Link>
            </BtnCol>
        </div>
    );
};

WideButtons.defaultProps = {
    className: '',
};

export default WideButtons;
