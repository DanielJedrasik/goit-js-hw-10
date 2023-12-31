import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const catInfo = document.querySelector('.cat-info');
function showWelcomeNotification() {
  return new Promise(() => {
    Notiflix.Notify.success('Wellcome on my cat finder site!');
  });
}
showWelcomeNotification();

Notiflix.Loading.standard('Just a moment...');

window.addEventListener('DOMContentLoaded', () => {
  Notiflix.Loading.standard('Loading data...');

  let select = new SlimSelect({
    select: '.breed-select',
    events: {
      afterChange: data => {
        const selectedBreedId = data[0].value;

        if (selectedBreedId) {
          Notiflix.Loading.standard('Loading data...');
          fetchCatByBreed(selectedBreedId)
            .then(catData => {
              console.log(catData);
              updateCatInfo(catData);
              Notiflix.Loading.remove();
            })
            .catch(error => {
              Notiflix.Loading.remove();
              Notiflix.Notify.failure(
                'Oops! Something goes wrong! Try to reload this page!'
              );
            });
        }
      },
    },
  });

  fetchBreeds()
    .then(breeds => {
      Notiflix.Loading.remove();
      select.setData(
        breeds.map(breed => ({
          text: breed.name,
          value: breed.id,
        }))
      );
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });

  function updateCatInfo(catData) {
    const { url, breeds } = catData;

    if (breeds.length > 0) {
      const { name, description, temperament } = breeds[0];

      catInfo.innerHTML = `
    <img src="${url}" alt="${breeds.name}" />
    <div class="cat-finder">
    <h2>${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>
    </div>
    `;
    }
  }
});
