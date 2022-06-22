import {legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from "@redux-devtools/extension";


import { productListReducer , productDetailsReducer} from './reducers/productReducers.js';
import {cartReducer} from "./reducers/cartReducer.js"
import {userLoginReducer,userRegisterReducer, userDetailsReducer,userUpdateProfileReducer} from "./reducers/userReducers.js"

import {orderCreateReducer, orderDetailsReducer, orderPayReducer} from "./reducers/orderReducers.js"



import thunk from "redux-thunk";
// import {composeWithDevTools} from "redux-devtools-extention";

const rootreducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer ,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,

    


});

const cartItemsFromStorage= localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []


const userInfoFromStorage= localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const paymentMethodFromStorage= localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : {}

const shippingAddressFromStorage= localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}



const initialState= {
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod: paymentMethodFromStorage},
  userLogin: {userInfo: userInfoFromStorage},
  

}




const store= createStore(rootreducer, initialState, composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
)

export default store