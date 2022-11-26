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
    li.innerHTML = `<div class="full-info-container"><img src=${country.flags.svg} /><span class="country-name">${country.name.official}</span><ul><li><span class="country-info">Population: ${country.population}</span></li><li><span class="country-info">Capital city: ${country.capital}</span></li><li><span class="country-info">Languages: ${Object.values(country.languages).join(', ')}</span></li></ul></div>`
    countriesList[0].appendChild(li);
};

const removeCountry = () => {
    let element = document.querySelector('ul');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
};

const createRollMarkup = (data) => {
    return data.map(({ name, flags }) =>
        `<a href="http://wikipedia.org/wiki/${name.common}" target="_blank"><li class="list-item" data-name="${name.common}"><img src="${flags.svg}" alt="${name.common}"/>${name.common}</li></a>`
    )
        .join('');
};

const handleInput = async event => {
    let value = event.target.value.trim();
    if (value !== '') {
        const response = await fetchCountries(value);
        if (response.status === 200) {
            const countries = await response.json();
            if (countries && countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
            } else if (countries && countries.length === 1) {
                removeCountry();
                countries.forEach(country => createCountry(country));
            } else if (countries && countries.length >= 2 && countries.length <= 10) {
                countriesList[0].innerHTML = createRollMarkup(countries);
            }
        } else if (response.status === 404) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        }
    }
    if (value === '') { removeCountry() }
}

input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));




