import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './Details.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/store";

const Details =()=>{ 
    const location = useLocation();
    const{product} = location.state || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState('1'); 

    
    const handleAdd= ()=>{
      dispatch(addProduct(product, parseInt(userCount, 10)));
      navigate('/Cart');
    }

    const handleCountChange = (event) => {
        setUserCount(event.target.value);
    };

    return(
        <>
        <div className={styles.product}>
            <img src={product.image} alt={product.title}></img>
            <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>rating: {product.rating.rate}</p>
            <button onClick={handleAdd}>Add to cart</button>
            <input 
            type="number" 
            value={userCount} 
            onChange={handleCountChange} 
            min="1"
        />
            </div>
            
        </div>
        
        </>
    )
}


export default Details;