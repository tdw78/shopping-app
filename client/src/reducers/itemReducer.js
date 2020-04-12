import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  GET_ITEM,
  UPDATE_ITEM,
  DELETE_ALL
} from '../actions/types';


const initialState = {
    items: [],
    edited: [],
    loading: false
};


export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id === action.payload)
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items:   [...state.items]
      };
    case DELETE_ALL:
      return {
        ...state,
        items: [],
        loading: false
      }
    default:
      return state;
  }
}