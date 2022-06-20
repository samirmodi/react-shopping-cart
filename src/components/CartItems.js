import React from "react";

const CartItems = ({ cartItems }) => {
  console.log(cartItems);
  return (
    <>
      {cartItems.map((cartItem) => (
        <div className='product'> {cartItem.name}</div>
      ))}
      ;
    </>
  );
};

export default CartItems;
