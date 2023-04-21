const BASE_URL = 'https://restcountries.com/v3.1/name/';
export const inputArea = document.querySelector('#search-box');
export const locationDataContainer = document.querySelector('.country-info');
export const locationDataList = document.querySelector('.country-list');
import Notiflix from 'notiflix';

export function fetchCountries(name) {
  const params = 'fields=name,capital,population,flags,languages';

  if (inputArea.value) {
    return fetch(`${BASE_URL}${name}?${params}`).then(res => {
      if (!res.ok && inputArea.value !== '') {
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      }
      return res.json();
    });
  } else {
    locationDataContainer.innerHTML = '';
    locationDataList.innerHTML = '';

    return;
  }
}
