import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import Button from 'react-bootstrap/Button';
import ButtonQuantity from '../../Buttons/ButtonQuantity/ButtonQuantity';
import AnimationWrapper from '../../Views/InstitutionShow/AnimationWrapper';
import NoItemsMessage from '../../NoItemsMessage/NoItemsMessage';

const Item = ({ id, name, quantity, price, remove, changeQuantity, basketId }) => {
    const finalPrice = (price * quantity).toFixed(2).replace('.', ',');
    return (
        <article>
            <div className="item-title">
                {name}
            </div>
            <ButtonQuantity
                increment={() => changeQuantity(basketId, id, quantity + 1)}
                decrement={() => changeQuantity(basketId, id, quantity === 1 ? 1 : quantity - 1)}
                handleChange={(e) => {
                    let { value } = e.target;
                    value = value < 1 ? 1 : value;
                    value = Math.floor(value);
                    changeQuantity(basketId, id, value);
                }}
                quantity={quantity}
            />
            <div className="price">
                {finalPrice} ZŁ
            </div>
            <div className="delete">
                <button type="button" className="btn btn-sm" onClick={() => remove(basketId, id)}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </button>
            </div>
        </article>
    );
};

const Items = ({ basket, remove, changeQuantity, basketId, setTab, shippingPrice, freeShippingPrice, minimalShippingPrice }) => {
    const hasAnyItems = basket.items.length !== 0;
    console.log(parseFloat(shippingPrice), parseFloat(freeShippingPrice), parseFloat(minimalShippingPrice), parseFloat(basket.sum));
    return (
        <AnimationWrapper>
            <Row className="items">
                <Col>
                    <section className="items-list">
                        <header>
                            <div className="item-title">
                                Nazwa
                            </div>
                            <div className="quantity">
                                Ilość
                            </div>
                            <div className="price">
                                Cena
                            </div>
                            <div className="delete"/>
                        </header>
                        <NoItemsMessage
                            condition={hasAnyItems}
                            message="Brak przedmiotów w koszyku"
                        >
                            {basket.items.map(item => (
                                <Item
                                    key={item.id}
                                    id={item.id}
                                    basketId={basketId}
                                    name={item.name}
                                    quantity={item.quantity}
                                    price={item.price}
                                    changeQuantity={changeQuantity}
                                    remove={remove}
                                />
                            ))}
                        </NoItemsMessage>
                    </section>
                    {hasAnyItems && <>
                        {parseFloat(minimalShippingPrice) > parseFloat(basket.sum) && (
                            <p className="h5 text-danger my-3">Minimalna wartość
                                zamówienia: {minimalShippingPrice} zł</p>
                        )}
                        {parseFloat(freeShippingPrice) > parseFloat(basket.sum) && (
                            <p className="h5 my-3">Wartość od której obowiązauje darmowa
                                dostawa: {freeShippingPrice} zł</p>
                        )}
                        <footer className="sum">
                            <div className="pricing">
                                <h6>Razem: {basket.sum} zł</h6>
                                <h6>Dostawa: {parseFloat(freeShippingPrice) < parseFloat(basket.sum) ? '0,00' : shippingPrice} zł</h6>
                            </div>
                            <div className="button">
                                <Button onClick={setTab}
                                        disabled={parseFloat(minimalShippingPrice) > parseFloat(basket.sum)}>Przejdź do
                                    realizacji zamówienia</Button>
                            </div>
                        </footer>

                    </>}


                </Col>
            </Row>
        </AnimationWrapper>
    );
};


export default Items;
