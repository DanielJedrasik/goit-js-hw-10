import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_bSSpELqWvwtD9Z5qUkGhJ53bU7iXk6rQT0VyEr999SzyOXsD6cdQxNTpqJ0bQWkL';

export function fetchBreeds() {
  return axios
    .get('/breeds')
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log('error', error);
    });
}
export function fetchCatByBreed(breedId) {
  return axios
    .get('/images/search?breed_ids=' + breedId)
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log('error', error);
    });
}
