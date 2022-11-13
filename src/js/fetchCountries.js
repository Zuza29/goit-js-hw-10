const fetchCountries = (name) => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages,region`)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error('Oops, there is no country with that name'));
            }
            const data = response.json();
            return data;
        })
        .catch(error => {
            console.log(`Your request could not be fulfilled. Error code: ${error}`);
        })
}

export { fetchCountries };