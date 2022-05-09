import { OPEN_FULL_SCREEN_LOADING, CLOSE_FULL_SCREEN_LOADING } from 'src/constants/actionTypes';

export const openFullScreenLoading = () => ({
  type: OPEN_FULL_SCREEN_LOADING
});

export const closeFullScreenLoading = () => ({
  type: CLOSE_FULL_SCREEN_LOADING,
});
