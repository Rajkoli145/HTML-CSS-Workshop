function handlesearch() {
    const countryName = document.getElementById("userInput").value;
    const result = document.getElementById("result");
    const API_URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(API_URL)
        .then(response => response.json())
        .then((data) => {
            console.log(data[0]);
            result.innerHTML = `
                <img src="${data[0].flags.png}" alt="Flag">
                <h2>Name: ${data[0].name.common}</h2>
                <h2>Capital: ${data[0].capital}</h2>
                <h2>Population: ${data[0].population}</h2>
                <h2>Continent: ${data[0].continents[0]}</h2>
            `;
        });
}