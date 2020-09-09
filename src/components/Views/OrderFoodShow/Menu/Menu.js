import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AnimationWrapper from '../../InstitutionShow/AnimationWrapper';
import SectionTitle from '../../../Titles/SectionTitle/SectionTitle';
import Card from '../../../Cards/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/pro-light-svg-icons';


const Item = ({ id, title, description, variants, openBasketModal, categoryId }) => {
    const hasManyVariants = variants.length > 1;
    let price = variants[0].price;
    let variantsParsed = '';
    if (hasManyVariants) {
        price = `OD ${price}`;
        variants.forEach(item => {
            variantsParsed += ` ${item.name},`;
        });
        variantsParsed = variantsParsed.slice(0, variantsParsed.length - 1);
    }
    return (
        <Card className="menu-item">
            <div className="main">
                <h6>{title}</h6>
                <p className="description">{description}</p>
                <div className="price">
                    <div className="main-price">{price} ZŁ</div>
                    {variantsParsed && (
                        <div className="sizes">Do wyboru {variantsParsed}</div>
                    )}

                </div>
            </div>
            <div className="add-to-card-wrapper">
                <Button className="add-to-card" onClick={() => openBasketModal(categoryId, id)}>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                </Button>
            </div>
        </Card>
    );

};

const Menu = ({ menu, openBasketModal }) => {
    return (
        <AnimationWrapper>
            <Row>
                <Col>
                    {menu.map(category => (
                        <div key={category.id}>
                            <SectionTitle>{category.name}</SectionTitle>
                            {category.items.map(item => (
                                <Item
                                    openBasketModal={openBasketModal}
                                    key={item.id}
                                    id={item.id}
                                    categoryId={category.id}
                                    title={item.name}
                                    description={item.description}
                                    variants={item.variants}
                                />
                            ))}
                        </div>
                    ))}
                </Col>
            </Row>
        </AnimationWrapper>
    );
};

export default Menu;