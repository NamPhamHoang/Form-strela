import React, {Component} from 'react';
import {CSSTransition} from "react-transition-group";

class AnimationWrapper extends Component {
    state = {
        visible: false,
    };

    componentDidMount() {
        this.setState({
            visible: true,
        });
    }

    render() {
        const {visible} = this.state;
        return (
            <CSSTransition
                in={visible}
                timeout={300}
                classNames="page"
                unmountOnExit
            >
                {this.props.children}
            </CSSTransition>
        );
    }
}

export default AnimationWrapper;