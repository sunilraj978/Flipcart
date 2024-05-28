import React, { useState } from "react";
import "./style.css";

/**
 * @author
 * @function CartItem
 **/

const CartItem = (props) => {
 

  const { _id, name, price, img } = props.cartItem;


  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={img} alt={""} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>Rs. {price}</p>
          </div>
          <div>Delivery in 3 - 5 days</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button>-</button>
          
          <button >+</button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button
          className="cartActionBtn"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;