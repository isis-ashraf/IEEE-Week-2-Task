import { createStore } from "redux"

const ActionTypes ={
  ADD_PRODUCT : 'ADD_PRODUCT',
  REMOVE_PRODUCT : 'REMOVEPRODUCT',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
  CLEAR_CART : 'CLEAR_CART ',
  PURCHASE : 'PURCHASE'
}

export const addProduct= (product, count) =>{
  return{
     type: ActionTypes.ADD_PRODUCT,
     payload: {product, count},
 }
}

export const removeProduct= (product) =>{
 return{
    type: ActionTypes.REMOVE_PRODUCT,
    payload: product,
}
}

export const decrease= (productId) => ({
  type: ActionTypes.DECREASE_QUANTITY,
  payload: productId,
});



export const clear = () =>{
  return{
     type: ActionTypes.CLEAR_CART,
     
 }
 }


 export const purchase = () =>{
  return{
     type: ActionTypes.PURCHASE,
     
 }
 }

const initState = {
 cart:[],
}


const cartReducer = (state=initState , action) =>{
    switch(action.type){
      case ActionTypes.ADD_PRODUCT:
      const { product,count } = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = state.cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, count: item.count + count}
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...product, count: count }],
        };
      }

      case ActionTypes.REMOVE_PRODUCT:
        return {...state, cart:state.cart.filter(product => product!== action.payload)}

        case ActionTypes.DECREASE_QUANTITY:
  return {
    ...state,
    cart: state.cart
      .map((product) =>
        product.id === action.payload
          ? { ...product, count: product.count - 1 }
          : product
      )
      .filter((product) => product.count > 0),
  };
  case ActionTypes.CLEAR_CART:
    return { ...state, cart: [] };
    case ActionTypes.PURCHASE:
      return {...state,cart: []};
          
          default:
         return state;
    }
}


const store= createStore(cartReducer);

export default store;
