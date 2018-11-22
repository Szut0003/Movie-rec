///* globals APIKEY */

const movieDataBaseURL = "https://api.themoviedb.org/3/";

let imageURL = null;
let imageSizes = [];
let searchString = "";
document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log(APIKEY);
    addEventListeners();

    getLocalStorageData();
}

function addEventListeners() {
    let searchButton = document.querySelector(".searchButtonDiv");
    searchButton.addEventListener("click", startSearch);
}

function getLocalStorageData() {

    // if there is no poster path or sizes data in local storage
    // or if the information is over 60 minutes old (stale)
    // then we need to get that data from TMDb using Fetch

    getPosterSizesandURL();
}

function getPosterSizesandURL() {
    // we need to create the url, it's a good idea to have a global base url (look at the top of this file)
    // https://developers.themoviedb.org/3/getting-started/introduction
    // https://developers.themoviedb.org/3/configuration/get-api-configuration
    // e.g. https://api.themoviedb.org/3/configuration?api_key=<<api_key>>

    let url = `${movieDataBaseURL}configuration?api_key=${APIKEY}`;

    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            imageURL = data.images.secure_base_url;
            imageSizes = data.images.poster_sizes;

            console.log(imageURL);
            console.log(imageSizes);

        })
        .catch((error) => console.log(error));

}


function startSearch() {
    console.log("Searching...");
    searchString = document.getElementById("search-input").value;
    if (!searchString) {
        alert("Please enter search data");
        searchString.focus();
        return;
    }

    // this is a new search so you should reset any existing page data

    getSearchResults();
}

function getSearchResults() {
    let url = `${movieDataBaseURL}search/movie?api_key=${APIKEY}&query=${searchString.value}`;
    fetch(url)
    
    .then((response) => response.json())
        .then(function (data) {
            console.log(data);

            //  create the page from data

            //  navigate to "results";

        })
        .catch((error) => alert(error));
}
