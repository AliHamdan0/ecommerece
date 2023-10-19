import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  //   cart: [{productId: "", quantity:1}],
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getItems(state, action) {
      const products = action?.payload?.items || [];
      const quantities = action?.payload?.quantities || [];
      for (let i = 0; i < products?.length; i++)
        products[i].quantity = quantities[i].quantity;
      state.cart = products;
    },
    addItem(state, action) {
      const index = state.cart.findIndex((i) => i._id == action.payload._id);
      if (index > -1) {
        state.cart[index].quantity = action.payload.quantity;
      } else state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      const index = state.cart.findIndex((i) => i._id == action.payload);
      if (index > -1) {
        state.cart.splice(index, 1);
      }
    },
    updateItem(state, action) {
      const index = state.cart.findIndex((i) => i._id == action.payload._id);
      if (index > -1) {
        state.cart[index].quantity = action.payload.quantity;
      }
    },
    clearAllItems(state) {
      state.cart = [];
    },
  },
});
