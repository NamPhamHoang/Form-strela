import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import LayoutCardWithTitleAndPath from '../../templates/LayoutCardWithTitleAndPath';
import CameraView from '../../components/Views/CameraLive/CameraView';
import img from '../../img/image.png';

class CameraLive extends Component {
    componentDidMount() {}

    render() {
        return (
            <>
                <LayoutCardWithTitleAndPath
                    category="Dla mieszkańców"
                    title="Live transmisja z kamer"
                    pathItems={[
                        { url: '/', label: 'Strona główna' },
                        { url: '/kamery-live', label: 'Live transmisja z kamer' },
                    ]}
                    className="camera-live"
                >
                    <Row>
                        <CameraView
                            title="AquaPark Jarocin"
                            img={img}
                            to="https://github.com/yannickcr/eslint-plugin-react/issues/2079"
                            alt="Podgląd kamery Aqua Parku Jarocin"
                        />
                        <CameraView
                            title="Rynek Jarocin"
                            img={img}
                            to="https://github.com/yannickcr/eslint-plugin-react/issues/2079"
                            alt="Podgląd kamery Aqua Parku Jarocin"
                        />
                    </Row>
                </LayoutCardWithTitleAndPath>
            </>
        );
    }
}

export default CameraLive;
