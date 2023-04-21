import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import {
  inputArea,
  locationDataContainer,
  locationDataList,
  fetchCountries,
} from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
// const BASE_URL = 'https://restcountries.com/v3.1/name/';

var debounce = require('lodash.debounce');
// const inputArea = document.querySelector('#search-box');
// const locationDataList = document.querySelector('.country-list');
// const locationDataContainer = document.querySelector('.country-info');

inputArea.addEventListener('input', debounce(onNameInput, DEBOUNCE_DELAY));

function onNameInput(e) {
  e.preventDefault();

  fetchCountries(inputArea.value.trim())
    .then(res => {
      if (res.length < 2) {
        locationDataList.innerHTML = '';
        locationDataContainer.innerHTML = createMarkup(res);
      } else {
        locationDataContainer.innerHTML = '';
        locationDataList.innerHTML = createMarkup(res);
      }
    })
    .catch(err => {});
}

// function fetchCountries(name) {
//   const params = 'fields=name,capital,population,flags,languages';

//   if (inputArea.value) {
//     return fetch(`${BASE_URL}${name}?${params}`).then(res => {
//       if (!res.ok && inputArea.value !== '') {
//         throw new Error(
//           Notiflix.Notify.failure('Oops, there is no country with that name')
//         );
//       }
//       return res.json();
//     });
//   } else {
//     locationDataContainer.innerHTML = '';
//     locationDataList.innerHTML = '';
//     return;
//   }
// }

function createMarkup(array) {
  if (array.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (array.length > 2 && array.length <= 10) {
    return array
      .map(
        ({ name: { official }, flags: { svg } }) => `<li>
        <img src="${svg}" alt="flag" width = 50, height = 50 />
        <h2>${official}</h2>
      </li>`
      )
      .join('');
  } else {
    return array
      .map(
        ({
          name: { official },
          flags: { svg },
          capital,
          languages,
          population,
        }) => {
          const languagesValues = Object.values(languages).join(', ');
          return `<h1>${official}</h1>
          <img src="${svg}" alt="flag" width = 100, height = 100 />
          <ul>
            <li><p>Capital: ${capital}</p></li>
            <li><p>Population: ${population}</p></li>
            <li><p>Languages: ${[languagesValues]}</p></li>
          </ul>`;
        }
      )
      .join('');
  }
}
