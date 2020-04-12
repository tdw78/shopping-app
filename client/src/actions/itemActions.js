import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, GET_ITEM, 
         DELETE_ITEM, ITEMS_LOADING, UPDATE_ITEM, DELETE_ALL
        } from './types';
  

export const getItems = (id) => dispatch => {
  dispatch(setItemsLoading());
  axios
  .get(`/api/items/${id}`)
  .then((res) => 
   dispatch({
     type: GET_ITEMS,
     payload: res.data
   })
  )
};

  
export const addItem = (item) => dispatch => {
    dispatch({
      type: ADD_ITEM,
      payload: item
    })
};

export const updateItem = (item) => dispatch => {
    dispatch({
      type: UPDATE_ITEM,
      payload: item
    })
};

export const deleteItem = (id) => dispatch => {
  axios
  .delete(`/api/items/${id}`)
  .then((res) => 
  dispatch({
    type: DELETE_ITEM,
    payload: id
  })
  )
};

export const getItem = (id) => dispatch => {
  axios
  .get(`/api/items/${id}`)
  .then((res) => 
  dispatch({
    type: GET_ITEM,
    payload: id
  })
  )
};

export const setItemsLoading = () => {
  return {
     type: ITEMS_LOADING 
  };
};

export const deleteAll = (id) => dispatch => {
  axios
  .delete(`/api/items/all/${id}`)
  .then((res) => 
  dispatch({
    type: DELETE_ALL
  })
  )
};
