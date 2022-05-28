import _ from 'lodash';
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
import { caculateCartPrice, isArrayEmpty } from '../utils/utilFuncs';

export const initialCartState = {
  items: [],
  subTotal: null,
  isValid: null,
  messages: null
};

export default function cartReducer(state = initialCartState, action) {
  switch (action.type) {
    case UPDATE_CART: {
      const curCart = [...state];
      const itemsToUpdate = action.payload.items;
      let new_cart;
      if (itemsToUpdate.length === curCart.length) {
        new_cart = curCart.map((item, index) => {
          const itemToUpdate = itemsToUpdate[index];
          const newItem = { ...item, ...itemToUpdate };
          if (!newItem.isBuyable && newItem.selected) newItem.selected = false;
          return newItem;
        });
      } else {
        new_cart = curCart.map((item) => {
          const newItem = itemsToUpdate.find((i) => i.productId === item.productId) || item;
          if (!newItem.isBuyable && newItem.selected) newItem.selected = false;
          return newItem;
        });
      }
      // window.localStorage.setItem('cart', JSON.stringify(new_cart));
      return new_cart;
    }

    case SET_CART:
      return action.payload.cart;

    case ADD_TO_CART: {
      const cart_items = [...state.items];
      const { item } = action.payload;
      const index = cart_items.findIndex((cartItem) => cartItem.productId === item.productId);
      if (isArrayEmpty(cart_items) || index === -1) {
        cart_items.push(item);
      } else if (index !== -1) {
        const itemToUpdate = cart_items[index];
        cart_items[index] = { ...itemToUpdate, quantity: itemToUpdate.quantity + item.quantity };
      }
      const subTotal = caculateCartPrice(cart_items);
      return _.merge({}, state, { items: cart_items, subTotal });
    }

    case SELECT_ITEM_CART: {
      const cart_items = [...state.items];
      const itemToSelect = cart_items[action.payload.itemIndex];
      if (itemToSelect.isBuyable) {
        itemToSelect.selected = true;
      }
      // window.localStorage.setItem('cart', JSON.stringify(cart_items));
      const subTotal = caculateCartPrice(cart_items);
      return _.merge({}, state, { items: cart_items, subTotal });
    }

    case UNSELECT_ITEM_CART: {
      const cart_items = [...state.items];
      cart_items[action.payload.itemIndex].selected = false;
      // window.localStorage.setItem('cart', JSON.stringify(cart_items));
      const subTotal = caculateCartPrice(cart_items);
      return _.merge({}, state, { items: cart_items, subTotal });
    }

    case SELECT_ALL_CART: {
      const cart_items = [...state.items].map((item) => {
        if (item.isBuyable) {
          return { ...item, selected: true };
        } return item;
      });
      // window.localStorage.setItem('cart', JSON.stringify(cart_items));
      const subTotal = caculateCartPrice(cart_items);
      return _.merge({}, state, { items: cart_items, subTotal });
    }

    case UNSELECT_ALL_CART: {
      const cart_items = [...state.items].map((item) => {
        if (item.isBuyable) {
          return { ...item, selected: false };
        } return item;
      });
      // window.localStorage.setItem('cart', JSON.stringify(cart_items));
      const subTotal = caculateCartPrice(cart_items);
      return _.merge({}, state, { items: cart_items, subTotal });
    }

    case CHANGE_QUANTITY_ITEM_CART: {
      const cart_items = [...state.items];
      const { itemIndex, quantity } = action.payload;
      cart_items[itemIndex].quantity = quantity;
      // window.localStorage.setItem('cart', JSON.stringify(cart_items));
      // const subTotal = caculateCartPrice(cart_items);
      return _.merge({}, state, { items: cart_items });
    }

    case DELETE_ITEM_CART: {
      const tempState = { ...state };
      const iIndex = action.payload.itemIndex;
      tempState.items = tempState.items.filter((item, index) => index !== iIndex);
      // window.localStorage.setItem('cart', JSON.stringify(cart_items));
      tempState.subTotal = caculateCartPrice(tempState.items);
      return tempState;
    }

    case DELETE_CART: {
      // window.localStorage.removeItem('cart');
      return initialCartState;
    }

    default:
      return state;
  }
}
