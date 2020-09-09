import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormCheck from 'react-bootstrap/FormCheck';
import * as PropTypes from 'prop-types';
import ButtonQuantity from '../../Buttons/ButtonQuantity/ButtonQuantity';
import { connect } from 'react-redux';
import { basketAddAction } from '../../../actions';
import { NotificationManager } from 'react-notifications';


class BasketModal extends Component {
    state = {
        activeVariant: null,
        quantity: 1,
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { variants, opened } = nextProps.data;
        if (opened) {
            this.setState({
                activeVariant: variants.length === 0 ? 0 : variants[0].id,
                quantity: 1,
            });
        }
    }

    handleVariantChange = (activeVariant) => {
        this.setState({
            activeVariant,
        });
    };

    handleQuantityChange = (e) => {
        const { value } = e.target;
        this.setState({
            quantity: value > 0 ? value : 1,
        });
    };

    incrementQuantity = () => {
        this.setState(state => ({ quantity: state.quantity + 1 }));
    };

    decrementQuantity = () => {
        this.setState(state => ({ quantity: state.quantity !== 0 ? state.quantity - 1 : 0 }));
    };

    addToBasket = () => {
        const { activeVariant, quantity } = this.state;
        const data = { ...this.props.data };
        const { onBasketAdd, closeModal, seller, sellerName } = this.props;
        onBasketAdd('orderFood', data, activeVariant, quantity, seller, sellerName);
        NotificationManager.info('Pomyślnie dodano do koszyka');
        closeModal();
    };

    render() {
        const { props } = this;
        const { quantity, activeVariant } = this.state;
        if (props.data.variants.length <= 0) return <></>;
        const hasManyVariants = props.data.variants.length > 1;
        const price = (props.data.variants.find(variant => variant.id === activeVariant).price * quantity).toFixed(2).replace('.', ',');
        return (
            <Modal show={props.data.opened} onHide={props.closeModal} dialogClassName="basket-modal" centered size="md">
                <Modal.Header>
                    <Modal.Title>
                        Dodaj do koszyka
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                    {hasManyVariants && (
                        <div className="variants">
                            {props.data.variants.map(item => (
                                <FormCheck
                                    key={item.id}
                                    className="mb-2"
                                    custom
                                    type="radio"
                                    name="variant"
                                    id={`variant-${item.id}`}
                                    label={item.name}
                                    onChange={() => this.handleVariantChange(item.id)}
                                    checked={item.id === activeVariant}
                                />
                            ))}
                        </div>
                    )}
                    <div className="summary">
                        <div className="price">{price} zł</div>
                        <ButtonQuantity
                            increment={this.incrementQuantity}
                            decrement={this.decrementQuantity}
                            handleChange={this.handleQuantityChange}
                            quantity={quantity}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="gray" onClick={props.closeModal}>
                        Zamknij
                    </Button>
                    <Button size="sm" onClick={this.addToBasket}>
                        Dodaj
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

BasketModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.shape({
        opened: PropTypes.bool.isRequired,
        variants: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })),
    }).isRequired,
    children: PropTypes.any,
};

BasketModal.defaultProps = {
    children: null,
};


const mapStateToProps = () => ({});

export default connect(mapStateToProps, { onBasketAdd: basketAddAction })(BasketModal);