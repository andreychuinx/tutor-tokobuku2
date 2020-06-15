import * as actionsTypes from "./actionTypes";
import axios from 'axios';
import { ENDPOINT, access_token } from '../../utils/globals';

export const getListBook = () => {
  const request = axios.get(`${ENDPOINT}/book/findAll`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });

  return (dispatch) => {
    request.then((response) => {
      console.log(response, 'ini response')
      return dispatch({
        type: actionsTypes.GET_BOOK,
        payload: response.data,
      })
    })
  }
}

export const getBookById = (id) => {
  const request = axios.get(`${ENDPOINT}/book/findById/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  })

  return (dispatch) => {
    request.then((response) => {
      console.log(response);
      return dispatch({
        type: actionsTypes.GET_BOOK_BY_ID,
        payload: response.data,
      })
    })
  }
}

export const updateBook = (data) => {
  const request = axios.get(`${ENDPOINT}/book/update`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  })

  return (dispatch) => {
    request.then((response) => {
      console.log(response);
      dispatch({
        type: actionsTypes.UPDATE_BOOK,
        payload: response.data,
      })
      return dispatch(getListBook());
    })
  }
}

export const deleteBook = (id) => {
  const request = axios.get(`${ENDPOINT}/book/deleteById/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  })

  return (dispatch) => {
    request.then((response) => {
      console.log(response);
      dispatch({
        type: actionsTypes.GET_BOOK_BY_ID,
        payload: response.data,
      });
      return dispatch(getListBook())
    })
  }
}