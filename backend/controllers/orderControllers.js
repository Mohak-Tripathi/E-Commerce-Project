import expressAsyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";

//@desc Create new Order
//@route POST/api/orders
//@access PUBLIC - anybody can access it

const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


  if (orderItems && orderItems.length === 0) {
    // if (typeof orderItems === 'undefined' || orderItems.length === 0) 
    res.status(400);
    throw new Error("No order Items");

  } else {
    const order = new Order({

        orderItems,
        user: req.user._id, // protected route - get token
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });
const createdOrder = await order.save(); // CREATING ORDER HERE IN DATABASE THEN SAVING IT
res.status(201).json(createdOrder);

  }
});

// Note- The difference between the two is that .create() both instantiates a new mongoose schema object and saves it. 

// In this case, Brad decided to do these two steps separately.  He first created a new order, calling it "order".  Afterwards, he put the saved order in createdOrder.






//@desc Get Order By Id
//@route GET/api/orders/:id
//@access Private

const getOrderById = expressAsyncHandler(async (req, res) => {
  
const order= await Order.findById(req.params.id).populate("user",  "name email");

if(order){
  res.json(order)
}else{
  res.status(404)
  throw new Error ("order not found")
}


  }
);



//@desc Update order to paid
//@route GET/api/orders/:id/pay
//@access Private

const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  
  const order= await Order.findById(req.params.id)
  
  if(order){
    order.isPaid= true,
    order.paidAt= Date.now(),
    order.paymentResult= ({  //coming from Paypal
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    })

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  }else{
    res.status(404)
    throw new Error ("order not found")
  }
  
  
    }
  );
  


  

//@desc get loggedIn user Orders
//@route GET/api/orders/myorders
//@access Private

const getMyOrders= expressAsyncHandler(async (req, res) => {
  
  const orders= await Order.find({user: req.user._id})
 res.json(orders)
  
    }
  );
  


export {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders}