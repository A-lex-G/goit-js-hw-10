const BASE_URL = 'https://restcountries.com/v3.1/name/';
export const inputArea = document.querySelector('#search-box');
export const locationDataContainer = document.querySelector('.country-info');
export const locationDataList = document.querySelector('.country-list');

export function fetchCountries(name) {
  const params = 'fields=name,capital,population,flags,languages';

  return fetch(`${BASE_URL}${name}?${params}`).then(res => {
    if (!res.ok && inputArea.value !== '') {
      throw new Error();
    }
    return res.json();
  });
}
