import {
  DELETE_CART,
  DELETE_ITEM_CART,
  UPDATE_CART,
  ADD_TO_CART,
  CHANGE_QUANTITY_ITEM_CART,
  SET_CART,
  SELECT_ITEM_CART,
  SELECT_ALL_CART,
  UNSELECT_ITEM_CART,
  UNSELECT_ALL_CART
} from '../constants/actionTypes';
import { isArrayEmpty } from '../utils/utilFuncs';

const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART: {
      const curCart = [...state];
      const itemsToUpdate = action.payload.items;
      let new_cart;
      if (itemsToUpdate.length === curCart.length) {
        new_cart = curCart.map((item, index) => {
          const itemToUpdate = itemsToUpdate[index];
          const newItem = { ...item, ...itemToUpdate };
          if (!newItem.buy_able && newItem.isSelected) newItem.isSelected = false;
          return newItem;
        });
      } else {
        new_cart = curCart.map((item) => {
          const newItem = itemsToUpdate.find((i) => i.product_id === item.product_id) || item;
          if (!newItem.buy_able && newItem.isSelected) newItem.isSelected = false;
          return newItem;
        });
      }
      window.localStorage.setItem('cart', JSON.stringify(new_cart));
      return new_cart;
    }
    case SET_CART:
      return action.payload.cart;
    case ADD_TO_CART: {
      const cart_items = [...state];
      const { item } = action.payload;
      const index = cart_items.findIndex((cartItem) => cartItem.product_id === item.product_id);
      if (isArrayEmpty(cart_items) || index === -1) {
        cart_items.push(item);
      } else if (index !== -1) {
        const itemToUpdate = cart_items[index];
        cart_items[index] = { ...itemToUpdate, quantity: itemToUpdate.quantity + item.quantity };
      }
      window.localStorage.setItem('cart', JSON.stringify(cart_items));
      return cart_items;
    }

    case SELECT_ITEM_CART: {
      const cart_items = [...state];
      const itemToSelect = cart_items[action.payload.itemIndex];
      if (itemToSelect.buy_able) {
        itemToSelect.isSelected = true;
      }
      window.localStorage.setItem('cart', JSON.stringify(cart_items));
      return cart_items;
    }

    case UNSELECT_ITEM_CART: {
      const cart_items = [...state];
      cart_items[action.payload.itemIndex].isSelected = false;
      window.localStorage.setItem('cart', JSON.stringify(cart_items));
      return cart_items;
    }

    case SELECT_ALL_CART: {
      const cart_items = [...state].map((item) => {
        if (item.buy_able) {
          return { ...item, isSelected: true };
        } return item;
      });
      window.localStorage.setItem('cart', JSON.stringify(cart_items));
      return cart_items;
    }

    case UNSELECT_ALL_CART: {
      const cart_items = [...state].map((item) => {
        if (item.buy_able) {
          return { ...item, isSelected: false };
        } return item;
      });
      window.localStorage.setItem('cart', JSON.stringify(cart_items));
      return cart_items;
    }

    case CHANGE_QUANTITY_ITEM_CART: {
      const cart_items = [...state];
      const { itemIndex, quantity } = action.payload;
      cart_items[itemIndex].quantity = quantity;
      window.localStorage.setItem('cart', JSON.stringify(cart_items));
      return cart_items;
    }

    case DELETE_ITEM_CART: {
      let cart_items = [...state];
      const iIndex = action.payload.itemIndex;
      cart_items = cart_items.filter((item, index) => index !== iIndex);
      window.localStorage.setItem('cart', JSON.stringify(cart_items));
      return cart_items;
    }

    case DELETE_CART: {
      window.localStorage.removeItem('cart');
      return [];
    }

    default:
      return state;
  }
}
