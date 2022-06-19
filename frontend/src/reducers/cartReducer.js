import { CART_ADD_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstant.js";

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod:{} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItems = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (existItems) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => {
            return x.product === item.product ? item : x;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

// case CART_REMOVE_ITEM:

case CART_SAVE_SHIPPING_ADDRESS:
return { 
  ...state,
  shippingAddress: action.payload,

}

case CART_SAVE_PAYMENT_METHOD:
return { 
  ...state,
  paymentMethod: action.payload,

}


    default:
      return state;
  }
};
