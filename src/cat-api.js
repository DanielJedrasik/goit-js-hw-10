import axios from 'axios';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_bSSpELqWvwtD9Z5qUkGhJ53bU7iXk6rQT0VyEr999SzyOXsD6cdQxNTpqJ0bQWkL';
// const axios = require('axios');
// GET https://api.thecatapi.com/v1/breeds;
export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('fetchBreeds error', error.response);
      return Promise.reject(error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      console.log('fetchCatByBreed error', error.response);
      return Promise.reject(error);
    });
}
