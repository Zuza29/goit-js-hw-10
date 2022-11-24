import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';
import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');
const countriesList = document.getElementsByClassName('country-list');
const rollMarkup = document.getElementsByClassName('roll-list');

const createCountry = country => {
    console.log(countriesList[0]);
    const li = document.createElement('li');
    li.innerHTML = `<div><img src=${country.flags.svg} /><span class="country-name">${country.name.official}</span></div>`
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
        `<li data-name="${name.common}"><img src="${flags.svg}" alt="${name.common}"/>${name.common}</li>`
    )
        .join('');
};

const handleInput = async (event) => {
    const response = await fetchCountries(event.target.value && event.target.value.trim());
    if (response.status === 200) {
        const countries = await response.json();
        if (countries && countries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
        } else if (countries && countries.length === 1) {
            removeCountry();
            countries.forEach(country => createCountry(country));
        } else if (countries && countries.length >= 2 && countries.length <= 10) {
            countriesList[0].innerHTML = createRollMarkup(countries);
            
            Notiflix.Notify.info('Please select a country from the list');
        }
    } else if (response.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    }

}

input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));




