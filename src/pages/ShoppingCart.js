import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Announcement from '../layout/Announcement';
import Footer from '../layout/Footer';
import CartProduct from '../components/CartProduct';

import { useDispatch } from 'react-redux';
import { removeProduct, resetCart } from '../store/cart-slice';

const ShoppingCart = () => {
    //create a strip/razorpay payment token state
    const history = useNavigate();
    const cart = useSelector((store) => store.cart);
   const dispatch = useDispatch();
   const [product, setProduct] = useState({});   
   let [quantity, setQuantity] = useState(1);
   

    
    const continueShoppingClickHandler = () => {
        history("/");
      };

      //setting stripe/razorpay token functioon
      

      

      //useEffect to checkout()
      useEffect(() => {
       (async ()=>{ const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }})()        
      }, []);

      const removeFromCartHandler = () => {
        dispatch(removeProduct({ product, quantity }));
      };

      const resetCartItems = () => {
        dispatch(resetCart({
          products: [],
          totalQuantity: 0,
          totalPrice: 0,
        }));
      };
      const serverUrl = "http://localhost:4000";
      //load razorpay sdk
      function loadScript(src) {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      }
      async function displayRazorpay(amt) {
           
        console.log(amt)
        // creating a new order
        const result = await axios.post(`${serverUrl}/orders/${amt}`);
         
         console.log(result.data)  
    
        if (!result) {
          alert("Server error. Are you online?");
          return;
        }
    
        // Getting the order details back
        const { amount, id , currency } = result.data;        
        const options = {
          key: "rzp_test_qtaW6Uk2obHljz", // Enter the Key ID generated from the Dashboard
          amount: amount,
          currency: currency,
          name: "eCommerce",
          description: "Test Transaction",
          image:
            "data:image/png;base64,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",
          order_id: id,
          handler: async function (response) {        
            const data = {
              orderCreationId: id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            await axios.post(
              `${serverUrl}/success`,
              data
            ).then((response )=> {
              console.log(response)
              if(response.status === 200){
                alert("payment done successfully.. order will deliver shortly")
                resetCartItems();
              }
            })
          },
          prefill: {
            name: "eCommerce",
            email: "ecommerce@gmail.com",
            contact: "9999999999",
          },
          notes: {
            address: "eCommerce.in Office",
          },
          theme: {
            color: "#61dafb",
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }

      return (
        <>
          <Announcement />
          <section className='px-8 py-4'>
            <h1 className='uppercase mt-4 mb-8 text-4xl text-center'>your bag</h1>
            <div className='grid sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
              <div>
                <button                  
                  onClick={continueShoppingClickHandler}
                  className='text-sm lg:text-md cursor-pointer uppercase block p-4 border-2 border-black hover:bg-black hover:text-white transition ease-out duration-500'
                >
                  continue shopping
                </button>
              </div>
              <div className='flex'>
                <p className='mr-4 cursor-pointer'>
                  Shopping Bag ({cart.totalQuantity})
                </p>
                {/* <a className='underline cursor-pointer'>Your Wishlist (0)</a> */}
              </div>
              <div>
                {/* <StripeCheckout
                  name='HEIN.'
                  billingAddress
                  shippingAddress
                  description={`Your total is ${cart.totalPrice}`}
                  amount={cart.totalPrice * 100}
                  currency='USD'
                  token={onToken}
                  stripeKey='pk_test_51LbSFeDby8a9HLcBzbuGETbDJiWZkCbNQx3gSpAfRZIKSrvsKakFGjvkNPTvzuHNNXKDYojDjdk3XhLlTajrQmeZ00JSyq9AOO'
                >
                  <a className='text-sm lg:text-md cursor-pointer uppercase block p-4 border-2 hover:text-black hover:border-black hover:bg-white bg-black text-white transition ease-out duration-500'>
                    checkout now
                  </a>
                </StripeCheckout> */}
              </div>
            </div>
            <div className='my-12 grid gap-8 lg:grid-cols-[2fr_1fr]'>
              <div>
                {cart.products.map((product) => (
                  <>
                    <CartProduct key={product.id} product={product} />                    
                    <button onClick={()=>{setProduct(product); setQuantity(product.quantity); removeFromCartHandler() }} className='border-2 p-1 text-white bg-sky-400 rounded-lg'>Remove</button>
                  </>
                ))}
              </div>
              <div>
                <button onClick={()=>{resetCartItems()}} className='border-2 p-2 rounded-lg bg-orange-300'>Empty Cart</button>
              </div>
              <div>
                <div className='border rounded-xl p-4'>
                  <h1 className='uppercase text-4xl mb-8'>order summary</h1>
                  <div className='flex justify-between mb-8'>
                    <span className='capitalize'>subtotal</span>
                    <span>$ {cart.totalPrice}</span>
                  </div>
                  <div className='flex justify-between mb-8'>
                    <span className='capitalize'>estimated shipping</span>
                    <span>$ 00.00</span>
                  </div>
                  <div className='flex justify-between mb-8'>
                    <span className='capitalize'>shipping discount</span>
                    <span>-$ 00.00</span>
                  </div>
                  <div className='flex justify-between mb-8'>
                    <span className='capitalize font-bold text-2xl'>Total</span>
                    <span className='font-bold text-2xl'>$ {cart.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>          
          {cart.products.length !== 0?<div>
            <button onClick={()=>displayRazorpay(cart.totalPrice)} className='border-2 bg-sky-400 p-2 rounded-lg text-white hover:bg-sky-500 active:bg-sky-600'>Checkout</button>
          </div>:null}
          <Footer />
        </>
      );


}

export default ShoppingCart;