import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, decrease, clear, purchase } from '../redux/store';
import styles from './cart.module.css';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
   

    const handlePurchase = () => {
      if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart.');
      } else {
        dispatch(purchase());
        alert('Purchase successful!');
      }
    };
    
  

  return (
    
     
        <div className={styles.cart}>
          <h2>Cart items :</h2>
          {cart.map(item => (
            <div key={item.id} className={styles.items}>
              <img src={item.image}></img>
              <div className={styles.details}>
              <p>{item.title}</p>
              <p>category: {item.category}</p>
              <p>price: {item.price}</p>
              <p>quantity: {item.count}</p>
              <div className={styles.buttons}>
              <button onClick={() => dispatch(removeProduct(item))}>Remove</button>
              <button onClick={() => dispatch(decrease(item.id))}>Decrease Count</button>
              </div>
             </div> 
            </div>
          ))}
          <div className={styles.actions}>
          
          <button onClick={handlePurchase}>Purchase</button>
          <button onClick={() => dispatch(clear())}>Clear cart</button>
          <Link to="/">
          <button className={styles.home}>Continue Shopping</button>
         </Link>
          </div>
        </div>
      
    
  );
};

export default Cart;

