import _ from 'lodash';
import { initialCartState } from 'src/reducers/cartReducers';
import { productApi } from 'src/utils/api';
import cartApi from 'src/utils/api/cartApi';
import {
  ADD_TO_CART,
  DELETE_CART,
  DELETE_ITEM_CART,
  CHANGE_QUANTITY_ITEM_CART,
  SET_CART,
  SELECT_ITEM_CART,
  SELECT_ALL_CART,
  UNSELECT_ITEM_CART,
  UNSELECT_ALL_CART,
} from '../constants/actionTypes';
import { showAlertMessage } from './alertMessageActions';

export const setCart = ({ cart }) => ({
  type: SET_CART,
  payload: { cart }
});

export const addToCart = ({
  productId, productName, productSlug, thumbnail, price, quantity, isBuyable, selected
}) => ({
  type: ADD_TO_CART,
  payload: {
    item: {
      productId, productName, productSlug, thumbnail, price, quantity, isBuyable, selected
    }
  }
});

export const changeQuantityItem = ({ itemIndex, quantity }) => ({
  type: CHANGE_QUANTITY_ITEM_CART,
  payload: { itemIndex, quantity }
});

export const selectItemCart = ({ itemIndex }) => ({
  type: SELECT_ITEM_CART,
  payload: { itemIndex }
});

export const unselectItemCart = ({ itemIndex }) => ({
  type: UNSELECT_ITEM_CART,
  payload: { itemIndex }
});

export const selectAllCart = () => ({
  type: SELECT_ALL_CART,
  payload: null
});

export const unselectAllCart = () => ({
  type: UNSELECT_ALL_CART,
  payload: null
});

export const deleteAll = () => ({
  type: DELETE_CART,
  payload: null
});

export const deleteItem = ({ itemIndex }) => ({
  type: DELETE_ITEM_CART,
  payload: { itemIndex }
});

export const getCart = () => async (dispatch) => {
  try {
    const cartResult = await cartApi.getCart().then((response) => response.data.data);
    dispatch(setCart({
      cart: cartResult || initialCartState
    }));
  } catch (error) {
    dispatch(showAlertMessage({ type: 'error', content: 'Error while getting cart' }));
  }
};

export const updateCart = () => async (dispatch, getState) => {
  try {
    const currentCart = getState().cart;
    const updateResult = await cartApi.updateCart({
      items: currentCart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        selected: item.selected
      }))
    }).then((response) => response.data.data);
    dispatch(setCart({
      cart: _.merge(currentCart, updateResult)
    }));
  } catch (error) {
    dispatch(showAlertMessage({ type: 'error', content: 'Error while update cart' }));
  }
};

export const deleteItemCart = ({ itemIndex }) => async (dispatch) => {
  dispatch(deleteItem({ itemIndex }));
  dispatch(updateCart());
};

export const deleteCart = () => async (dispatch) => {
  dispatch(deleteAll());
  dispatch(updateCart());
};

export const checkAndAddToCart = ({
  productId, productName, price, quantity
}) => async (dispatch, getState) => {
  if (!getState().user) {
    dispatch(showAlertMessage({ type: 'error', content: 'You must login to add product to cart' }));
  } else if (!quantity || Number.isNaN(quantity)) {
    dispatch(showAlertMessage({ type: 'error', content: 'Quantity is invalid' }));
  } else {
    productApi.getProductById(
      productId
    ).then((response) => response.data.data).then((productFromServer) => {
      if (productFromServer.isEnabled === false) {
        dispatch(showAlertMessage({ type: 'error', content: 'This product has been disabled' }));
      } else if (productFromServer.stockQuantity === 0) {
        dispatch(showAlertMessage({ type: 'error', content: 'This product has sold out' }));
      } else if (productFromServer.stockQuantity < quantity) {
        dispatch(showAlertMessage({ type: 'error', content: 'Quantity of this product is not enough' }));
      } else if (productFromServer.price !== price || productFromServer.name !== productName) {
        dispatch(addToCart({
          productId,
          productName: productFromServer.name,
          productSlug: productFromServer.slug,
          thumbnail: productFromServer.thumbnail,
          price: productFromServer.price,
          quantity,
          isBuyable: true,
          selected: true
        }));
        dispatch(showAlertMessage({ type: 'warning', content: 'Added successfully. But product info has been changed, you should check again' }));
      } else {
        dispatch(addToCart({
          productId,
          productName: productFromServer.name,
          productSlug: productFromServer.slug,
          thumbnail: productFromServer.thumbnail,
          price: productFromServer.price,
          quantity,
          isBuyable: true,
          selected: true
        }));
        dispatch(updateCart());
        dispatch(showAlertMessage({ type: 'success', content: 'Added successfully' }));
      }
    }).catch((err) => {
      console.log(err);
      dispatch(showAlertMessage({ type: 'error', content: 'Something wrong happend' }));
    });
  }
};

export const checkAndChangeQuantity = ({ itemIndex, quantity }) => async (dispatch, getState) => {
  if (!quantity || Number.isNaN(quantity)) {
    dispatch(showAlertMessage({ type: 'error', content: 'Product quantity is invalid' }));
  } else if (quantity < 1) {
    dispatch(showAlertMessage({ type: 'error', content: 'Product quantity can\'t be lower than 1' }));
  } else {
    const cart_item = getState().cart.items[itemIndex];
    productApi.getProductById(cart_item.productId).then((response) => response.data.data).then((productFromServer) => {
      if (productFromServer.stockQuantity === 0) {
        dispatch(showAlertMessage({ type: 'error', content: 'This product has sold out' }));
      } else if (productFromServer.stockQuantity < quantity) {
        dispatch(showAlertMessage({ type: 'error', content: `You only can buy up to ${productFromServer.stockQuantity} products of ${cart_item.productName}` }));
        dispatch(changeQuantityItem({ itemIndex, quantity: productFromServer.stockQuantity }));
        dispatch(updateCart());
      } else {
        dispatch(changeQuantityItem({ itemIndex, quantity }));
        dispatch(updateCart());
      }
    }).catch(() => {
      showAlertMessage({ type: 'error', content: 'Something wrong happend' });
    });
  }
};

export const checkItemsValid = ({ items, onSuccess, onFailed }) => async () => {
  cartApi.checkValid({
    items: items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
    })),
  }).then((response) => response.data.data).then((data) => {
    if (data.isValid) {
      if (onSuccess) onSuccess();
    } else if (onFailed) onFailed();
  }).catch(() => {
    showAlertMessage({ type: 'error', content: 'Error while checking cart' });
  });
};

export const checkCartValidAndUpdate = () => async (dispatch, getState) => {
  cartApi.checkValid({
    items: getState().cart.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
    })),
  }).then((response) => response.data.data).then((data) => {
    if (data.isValid === false) {
      dispatch(showAlertMessage({ type: 'warning', content: 'Something wrong with your cart, you should check again' }));
      dispatch(updateCart());
    }
  }).catch(() => {
    showAlertMessage({ type: 'error', content: 'Error while checking cart' });
  });
};
