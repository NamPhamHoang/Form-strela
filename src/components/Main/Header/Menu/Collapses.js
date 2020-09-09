import React, { Component } from 'react';
import { faBuilding, faCameraAlt, faTv, faUsers } from '@fortawesome/pro-light-svg-icons';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Collapse from './Collapse';
import { connect } from 'react-redux';


const LCol = props => {
    return (
        <Col xs={8} sm={6} lg={3} className="mt-4 mt-lg-0">
            {props.children}
        </Col>
    );
};


class Collapses extends Component {
    state = {
        active: null,
        direction: 'right',
    };

    componentDidMount() {
        this.setMenuMaxHeight();
    }

    getLongestMenuItemLength = () => {
        const { menu } = this.props.menu;
        const lengths = [];
        Object.keys(menu).forEach(index => {
            const item = menu[index];
            lengths.push(item.length);
        });

        return Math.max(...lengths);
    };

    setMenuMaxHeight = () => {
        const menuMaxHeight = this.getLongestMenuItemLength() * 20 + 60;
        const root = document.documentElement;
        root.style.setProperty('--menu-max-height', `${menuMaxHeight}px`);
    };

    toggleActive = (active) => {
        const prevActive = this.state.active;
        const direction = prevActive > active ? 'right' : 'left';
        this.setState({ active, direction });
    };

    render() {
        const { menu } = this.props.menu;
        return (
            <Row className="mt-md-5 pt-2 pt-md-3 justify-content-center justify-content-sm-start">
                <LCol>
                    <Collapse
                        direction={this.state.direction}
                        active={this.state.active === 1}
                        toggleActive={() => this.toggleActive(1)}
                        icon={faBuilding}
                        label="Gmina"
                        items={menu[1]}
                    />
                </LCol>
                <LCol>
                    <Collapse
                        direction={this.state.direction}
                        active={this.state.active === 2}
                        toggleActive={() => this.toggleActive(2)}
                        icon={faUsers}
                        label="Dla mieszkańców"
                        items={menu[2]}
                    />
                </LCol>
                <LCol>
                    <Collapse
                        direction={this.state.direction}
                        active={this.state.active === 3}
                        toggleActive={() => this.toggleActive(3)}
                        icon={faCameraAlt}
                        label="Dla turystów"
                        items={menu[3]}
                    />
                </LCol>
                <LCol>
                    <Collapse
                        direction={this.state.direction}
                        active={this.state.active === 4}
                        toggleActive={() => this.toggleActive(4)}
                        icon={faTv}
                        label="Dla mediów"
                        items={menu[4]}
                    />
                </LCol>
            </Row>
        );
    }
}

const mapStateToProps = ({ menu }) => ({ menu });

export default connect(mapStateToProps)(Collapses);
