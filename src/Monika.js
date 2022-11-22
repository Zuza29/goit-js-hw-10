

import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';
import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');

const countriesList = document.getElementsByClassName('country-list');

const createCountry = country => {
    console.log(countriesList[0]);
    const li = document.createElement('li');
    li.innerHTML = `<img src=${country.flags.svg} /><span>${country.name.official}</span>`
    countriesList[0].appendChild(li);
}

const handleInput = async (event) => {
    const response = await fetchCountries(event.target.value && event.target.value.trim());
    // sprawdzamy status, 200 to znaczy, ze jest spoko, bez błędów
    if (response.status === 200) {
        const countries = await response.json();
        if (countries && countries.length >= 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
        } else if (countries) {
            // tworzymy element
            countries.forEach(country => createCountry(country));
        }
    } else if (response .status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    }

}

input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));


// fetchCountries.js

const BASE_URL = 'https://restcountries.com/v3.1'

function fetchCountries(name) {
  // podstawowy url + właściwości jakie chcemy wyciagnąć
  return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
};

export {
  fetchCountries
};



