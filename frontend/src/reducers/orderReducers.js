import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
} from "../constants/orderConstant.js";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};








export const orderDetailsReducer = (state = {loading: true, error: null, order: { orderItems: [], shippingAddress: {}}, success:false}, action) => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return {
            ...state,
          loading: true,
        };
  
      case ORDER_DETAILS_SUCCESS:
        return {
          // ...state, // took a chance
          loading: false,
          order: action.payload, // create new order
        };
  
      case ORDER_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  


  



export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true// create new order
      };

    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      case ORDER_PAY_RESET:
      return {}
  

    default:
      return state;
  }
};
