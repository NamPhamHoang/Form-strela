import React from 'react';

const ButtonQuantity = ({ increment, quantity, handleChange, decrement }) => {
    return (
        <div className="button-quantity quantity">
            <div className="btn-container">
                <button className="btn btn-primary" type="button" onClick={decrement}>-</button>
            </div>
            <input type="number" className="form-control" value={quantity} onChange={handleChange}/>
            <div className="btn-container">
                <button className="btn btn-primary" type="button" onClick={increment}>+</button>
            </div>
        </div>
    );
};

export default ButtonQuantity;