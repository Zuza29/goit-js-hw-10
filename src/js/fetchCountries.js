const BASE_URL = 'https://restcountries.com/v3.1'

function fetchCountries(name) {
    // podstawowy url + właściwości jakie chcemy wyciagnąć
    return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
};

export {
    fetchCountries
};
// 1. Czy można to zrobić bez użycia async/await?
// 2. Czemu funkcja fetchCountries jest taka krótka? Bez sensu ją robić od razu bardzo
// długą i ze skomplikowaną funkcjonalnością?