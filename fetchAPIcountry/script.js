"use strict";

const btn = document.querySelector("#btn_where");
const countriesContainer = document.querySelector(".countries");
const btnSearch = document.querySelector("#btn_search");
const inputCountry = document.querySelector("#input_country");

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = "") {
  countriesContainer.innerHTML = "";
  const html = ` 
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // Reverse geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!resGeo.ok) throw new Error("Problem getting location data");
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.countryName}`);
    if (!res.ok) throw new Error("Problem getting country ");
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong 
      ⛔⛔${err.message}`);
  }
};

const getCountryData = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);
    if (!res) throw new Error("Problem getting location Data");
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (error) {
    console.error(error);
    renderError(`Something went wrong 
      ⛔⛔${error.message}`);
  }
};

// Search Country via input
btnSearch.addEventListener("click", function (event) {
  event.preventDefault();
  const countryName = inputCountry.value.trim();
  countriesContainer.innerHTML = "";

  if (!countryName) {
    renderError("Insert a country");
    return;
  }
  getCountryData(countryName);
  inputCountry.value = "";
});

// Current location
btn.addEventListener("click", function (event) {
  event.preventDefault();
  whereAmI();
});
