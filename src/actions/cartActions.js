import { productApi } from 'src/utils/api';
import cartApi from 'src/utils/api/cartApi';
import {
  ADD_TO_CART,
  DELETE_CART,
  UPDATE_CART,
  DELETE_ITEM_CART,
  CHANGE_QUANTITY_ITEM_CART,
  SET_CART,
  SELECT_ITEM_CART,
  SELECT_ALL_CART,
  UNSELECT_ITEM_CART,
  UNSELECT_ALL_CART
} from '../constants/actionTypes';
import { showAlertMessage } from './alertMessageActions';

export const setCart = ({ cart }) => ({
  type: SET_CART,
  payload: { cart }
});

export const addToCart = ({
  product_id, product_name, product_slug, product_thumbnail, price, quantity, buy_able, isSelected
}) => ({
  type: ADD_TO_CART,
  payload: {
    item: {
      product_id, product_name, product_slug, product_thumbnail, price, quantity, buy_able, isSelected
    }
  }
});

export const deleteItemCart = ({ itemIndex }) => ({
  type: DELETE_ITEM_CART,
  payload: { itemIndex }
});

export const changeQuantityItemCart = ({ itemIndex, quantity }) => ({
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

export const deleteCart = () => ({
  type: DELETE_CART,
  payload: null
});

export const updateCart = ({ items }) => ({
  type: UPDATE_CART,
  payload: { items }
});

export const checkAndAddToCart = ({
  product_id, product_name, price, quantity
}) => async (dispatch) => {
  if (!quantity || Number.isNaN(quantity)) {
    dispatch(showAlertMessage({ type: 'error', content: 'Quantity is invalid' }));
  } else {
    productApi.getProduct({
      id: product_id
    }).then((response) => response.data.data).then((productFromServer) => {
      if (productFromServer.enable === false) {
        dispatch(showAlertMessage({ type: 'error', content: 'This product has been disabled' }));
      } else if (productFromServer.quantity === 0) {
        dispatch(showAlertMessage({ type: 'error', content: 'This product has sold out' }));
      } else if (productFromServer.quantity < quantity) {
        dispatch(showAlertMessage({ type: 'error', content: 'Quantity of this product is not enough' }));
      } else if (productFromServer.price !== price || productFromServer.name !== product_name) {
        dispatch(addToCart({
          product_id,
          product_name: productFromServer.name,
          product_slug: productFromServer.slug,
          product_thumbnail: productFromServer.images[0],
          price: productFromServer.price,
          quantity,
          buy_able: true,
          isSelected: true
        }));
        dispatch(showAlertMessage({ type: 'warning', content: 'Added successfully. But product info has been changed, you should check again' }));
      } else {
        dispatch(addToCart({
          product_id,
          product_name: productFromServer.name,
          product_slug: productFromServer.slug,
          product_thumbnail: productFromServer.images[0],
          price: productFromServer.price,
          quantity,
          buy_able: true,
          isSelected: true
        }));
        dispatch(showAlertMessage({ type: 'success', content: 'Added successfully' }));
      }
    }).catch(() => {
      dispatch(showAlertMessage({ type: 'error', content: 'Something wrong happend' }));
    });
  }
};

export const checkAndChangeQuantity = ({ itemIndex, quantity }) => async (dispatch, getState) => {
  if (!quantity || Number.isNaN(quantity)) {
    dispatch(showAlertMessage({ type: 'error', content: 'Product quantity is invalid' }));
  } else if (quantity < 1) {
    dispatch(showAlertMessage({ type: 'error', content: 'Product quantity cann\'t be lower than 1' }));
    dispatch(changeQuantityItemCart({ itemIndex, quantity: 1 }));
  } else {
    const cart_item = getState().cart[itemIndex];
    productApi.getProduct({ id: cart_item.product_id }).then((response) => response.data.data).then((productFromServer) => {
      if (productFromServer.quantity === 0) {
        dispatch(showAlertMessage({ type: 'error', content: 'This product has sold out' }));
      } else if (productFromServer.quantity < quantity) {
        dispatch(showAlertMessage({ type: 'error', content: `You only can buy up to ${productFromServer.quantity} products of ${cart_item.product_name}` }));
        dispatch(changeQuantityItemCart({ itemIndex, quantity: productFromServer.quantity }));
      } else {
        dispatch(changeQuantityItemCart({ itemIndex, quantity }));
      }
    }).catch(() => {
      showAlertMessage({ type: 'error', content: 'Something wrong happend' });
    });
  }
};

export const checkItemsValid = ({ items, onSuccess, onFailed }) => async () => {
  cartApi.checkValid({
    cart_items: items.map((item) => ({
      product_id: item.product_id,
      product_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
    })),
  }).then((response) => response.data).then((response) => {
    if (response.success === true) {
      if (onSuccess) onSuccess(response);
    } else if (onFailed) onFailed(response);
  }).catch(() => {
    showAlertMessage({ type: 'error', content: 'Something wrong happend' });
  });
};

export const checkCartValid = ({ onSuccess, onFailed }) => async (dispatch, getState) => {
  cartApi.checkValid({
    cart_items: getState().cart.map((item) => ({
      product_id: item.product_id,
      product_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
    })),
  }).then((response) => response.data).then((response) => {
    if (response.success === true) {
      if (onSuccess) onSuccess(response);
    } else if (onFailed) onFailed(response);
  }).catch(() => {
    showAlertMessage({ type: 'error', content: 'Something wrong happend' });
  });
};

export const checkCartValidAndUpdate = () => async (dispatch, getState) => {
  cartApi.checkValid({
    cart_items: getState().cart.map((item) => ({
      product_id: item.product_id,
      product_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
    })),
  }).then((response) => response.data).then((response) => {
    const { success, errors } = response;
    if (success === false) {
      dispatch(showAlertMessage({ type: 'warning', content: 'Something wrong with your cart, you should check again' }));
      dispatch(updateCart({
        items: response.valid_items.map((item, i) => ({ ...item, errors: errors[i] }))
      }));
    }
  }).catch(() => {
    showAlertMessage({ type: 'error', content: 'Something wrong happend' });
  });
};
