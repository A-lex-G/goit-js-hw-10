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

var debounce = require('lodash.debounce');

inputArea.addEventListener('input', debounce(onNameInput, DEBOUNCE_DELAY));

function onNameInput(e) {
  e.preventDefault();

  if (inputArea.value.trim()) {
    fetchCountries(inputArea.value.trim())
      .then(res => {
        if (inputArea.value.length < 2) {
          return Notiflix.Notify.failure('Please enter exactly two letters');
        } else if (res.length > 10) {
          return Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (res.length < 2) {
          locationDataList.innerHTML = '';
          locationDataContainer.innerHTML = createMarkupCard(res);
        } else {
          console.log(res);
          locationDataContainer.innerHTML = '';
          locationDataList.innerHTML = createMarkupList(res);
        }
      })
      .catch(err => {
        if ((err.status = '404')) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
          clearMarkup(err);
        }
      });
  } else {
    clearMarkup(inputArea.value.trim());
  }
}

function clearMarkup(searchVal) {
  locationDataContainer.innerHTML = '';
  locationDataList.innerHTML = '';
}

function createMarkupList(array) {
  if (array.length > 2 && array.length <= 10) {
    return array
      .map(
        ({ name: { official }, flags: { svg } }) => `<li>
        <img src="${svg}" alt="flag" width = 40, height = 40 />
        <p>${official}</p>
      </li>`
      )
      .join('');
  } else {
    return;
  }
}
function createMarkupCard(array) {
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
        return `<div class="container"><img src="${svg}" alt="flag" width = 40, height = 40 />
          <h2>${official}</h2></div>
          <ul>
            <li><p class="item-info"><span>Capital:</span> ${capital}</p></li>
            <li><p class="item-info"><span>Population:</span> ${population}</p></li>
            <li><p class="item-info"><span>Languages:</span> ${[
              languagesValues,
            ]}</p></li>
          </ul>`;
      }
    )
    .join('');
}

// Цей код мені потрібен для себе____________________________________________________________

// function fetchCountries(name) {
//   const params = 'fields=name,capital,population,flags,languages';

//   if (inputArea.value) {
//     return fetch(`${BASE_URL}${name}?${params}`).then(res => {
//       if (name.length < 2) {
//         return Promise.reject(
//           Notiflix.Notify.failure('Please enter exactly two letters')
//         );
//       } else if (!res.ok && inputArea.value !== '') {
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

// function onNameInput(e) {
//   e.preventDefault();
//   console.dir(inputArea);

//   fetchCountries(inputArea.value.trim())
//     .then(res => {
//       if (res.length < 2) {
//         locationDataList.innerHTML = '';
//         locationDataContainer.innerHTML = createMarkup(res);
//       } else {
//         locationDataContainer.innerHTML = '';
//         locationDataList.innerHTML = createMarkup(res);
//       }
//     })
//     .catch(err => {});
// }

// function createMarkup(array) {
//   if (array.length > 2 && array.length <= 10) {
//     return array
//       .map(
//         ({ name: { official }, flags: { svg } }) => `<li>
//         <img src="${svg}" alt="flag" width = 40, height = 40 />
//         <p>${official}</p>
//       </li>`
//       )
//       .join('');
//   } else {
//     return array
//       .map(
//         ({
//           name: { official },
//           flags: { svg },
//           capital,
//           languages,
//           population,
//         }) => {
//           const languagesValues = Object.values(languages).join(', ');
//           return `<div class="container"><img src="${svg}" alt="flag" width = 40, height = 40 />
//           <h2>${official}</h2></div>
//           <ul>
//             <li><p class="item-info"><span>Capital:</span> ${capital}</p></li>
//             <li><p class="item-info"><span>Population:</span> ${population}</p></li>
//             <li><p class="item-info"><span>Languages:</span> ${[
//               languagesValues,
//             ]}</p></li>
//           </ul>`;
//         }
//       )
//       .join('');
//   }
// }
