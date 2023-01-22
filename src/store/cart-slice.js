import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {

      const newProduct = {
        _id: action.payload.product.id,
        title: action.payload.product.title,
        description: action.payload.product.description,
        image: action.payload.product.image,
        price: action.payload.product.price,
        quantity: action.payload.quantity,
      };

      let added = false;

      for (let oldProduct of state.products) {
        // Check if the product already added before
        if (oldProduct._id === newProduct._id) {
          // If the same size increase the quantity
          oldProduct.quantity += newProduct.quantity;
          added = true;
          break;
        }
      }
      // If not added before or not the same size push it as a new product
      if (!added) {
        state.products.push(newProduct);
      }
      state.totalQuantity += newProduct.quantity;
      state.totalPrice += newProduct.price * newProduct.quantity;
    },
    removeProduct(state, action) {
      console.log(state.totalQuantity,action.payload)
      let removed = false;

      for (let oldProduct of state.products) {
        // Check if the product already added before
        if (oldProduct._id === action.payload.product._id) {
          const index = state.products.indexOf(oldProduct);
          if (index > -1) {
            // only splice array when item is found
            state.products.splice(index, 1); // 2nd parameter means remove one item only
          }
          state.totalQuantity -= action.payload.quantity;
          state.totalPrice -= (action.payload.product.price*action.payload.product.quantity);
          removed = true;
          break;
        }
      }
    },
    resetCart(state){
      Object.assign(state, initialState)
    }
  },
});

export const { addProduct, removeProduct, resetCart } = cartSlice.actions;
export default cartSlice;
