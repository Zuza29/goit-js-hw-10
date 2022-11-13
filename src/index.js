import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const inputValue = input.value;

input.addEventListener('input', debounce(inputHandler, DELAY));

