import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';


import './CartItem.css';


const CartItem = ({ onContinueShopping ,cartNum, setCartNum, setAddedToCart }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  

  

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total=0
    for(let i=0;i<cart.length;i++){
      let amount =cart[i].quantity
      let price = Number(cart[i].cost.slice(1))
      let itemTotal=amount*price
      total= total + itemTotal
    }
    return total;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e)
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    let newNum = cartNum+1
      setCartNum(newNum)
    let newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
  };

  const handleDecrement = (item) => {
    let newNum = cartNum-1
      setCartNum(newNum)
    let newQuantity=item.quantity-1
    if(item.quantity>1){    
      dispatch(updateQuantity({name:item.name, quantity:newQuantity}));}
    else{
      dispatch(removeItem(item.name));
      setAddedToCart((prevState) => ({
        ...prevState,
        [item.name]: false, 
      }));

    }
   
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    let newNum = cartNum-item.quantity
    setCartNum(newNum)
    setAddedToCart((prevState) => ({
      ...prevState,
      [item.name]: false, 
    }));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const quant = item.quantity;
    let cost = Number(item.cost.slice(1));
    let subtotal = cost*quant;
    return subtotal;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <ul>
        {cart.map((item,itemIndex) => {
         return(
          <li className="cart-item" key={itemIndex}>
          
          <img className="cart-item-image" src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">{item.cost}</div>
            <div className="cart-item-quantity">
              <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
              <span className="cart-item-quantity-value">{item.quantity}</span>
              <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
            </div>
            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        
        </li>
         )}
        )}
      </ul>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;



