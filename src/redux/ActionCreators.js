import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes'
import { baseUrl } from '../shared/baseUrl'

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }
});

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + 'dishes')
  .then(response => {
    if (response.ok) {
      return response; // will be handled by the next then promise
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response
      throw error;
    }
  },
  error => { // problems with communication with the server
    var errMess = new Error(error.message);
    throw errMess;
  })
  .then(response => response.json()) // convert response to json
  .then(dishes => dispatch(addDishes(dishes))) // the response is renamed to dishes
  .catch(error => dispatch(dishesFailed(error.message)));
};

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response
      throw error;
    }
  },
  error => {
    var errMess = new Error(error.message);
    throw errMess;
  })
  .then(response => response.json())
  .then(comments => dispatch(addComments(comments)))
  .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + 'promotions')
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response
      throw error;
    }
  },
  error => {
    var errMess = new Error(error.message);
    throw errMess;
  })
  .then(response => response.json())
  .then(promos => dispatch(addPromos(promos)))
  .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errMess
});

export const addPromos = (promotions) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promotions
});

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errMess
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});
