'use strict';

import $ from 'jquery';
import './index.css';

const searchURL = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'URhY1SlMNkUUZlzkDFcx9VLPJH5sVEhegRcLc7pA';

function handleSubmit() {
  $('form').submit(function(event) {
    event.preventDefault();
    let stateValue = $('#states').val();
    let numValue = $('#number-results').val();
    getParks(stateValue, numValue);
  });
}

function getParks(stateCode, maxResult=10) {
  const params = {
    stateCode: [stateCode],
    limit: maxResult,
    api_key: apiKey,
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => renderResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function formatQueryParams(params) {
  const items = Object.keys(params).map(key => `${key}=${params[key]}`)
  return items.join('&');
}

function renderResults(responseJson) {
  $('.display-parks').empty();
  let data = responseJson.data;
  console.log(data);

  for (let i = 0; i < data.length; i++){
    $('.display-parks').append(
      `<li><h3>${data[i].fullName}</h3>
      <p>${data[i].description}</p>
      <img src="${data[i].images[0].url}" alt="${data[i].images[0].altText}">
      <p>Visit us online <a href="${data[i].url}">here</a>!</p>
      </li>`
    )};
}

function main() {
  handleSubmit();
}

$(main);
