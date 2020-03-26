'use strict';

import $ from 'jquery';

// Resource Endpoint - https://developer.np

// Query String Parameters - parkCode=acad,dena

const searchURL = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'URhY1SlMNkUUZlzkDFcx9VLPJH5sVEhegRcLc7pA';

//curl -H 'X-Api-Key: INSERT-API-KEY-HERE' 'https://developer.nps.gov/api/v1/parks?parkCode=acad'
const store = {};

function formatQueryParams(params) {
  const items = Object.keys(params).map(key => `${key}=${params[key]}`)
  return items.join('&');
}

function getParks(stateCode, maxResult=10) {
  const params = {
    stateCode: [stateCode],
    limit: maxResult
  };

  const options = {
    headers: new Headers({
      "X-Api-Key": apiKey})
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url, options)
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

function renderResults(responseJson) {
  $('.display-parks').empty();
  console.log(responseJson);

  // for (let i = 0; i < responseJson.items.length; i++){

  //   // for each video object in the items 
  //   // array, add a list item to the results 
  //   // list with the video title, description,
  //   // and thumbnail
  //   $('#results-list').append(
  //     `<li><h3>${responseJson.items[i].snippet.title}</h3>
  //     <p>${responseJson.items[i].snippet.description}</p>
  //     <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
  //     </li>`
  //   )};

  // // display the results section  
  // $('#results').removeClass('hidden');
}

function handleSubmit() {
  $('form').submit(function(event) {
    event.preventDefault();
    let stateValue = $('.states').val();
    let numValue = $('.number-results').val();
    getParks(stateValue, numValue);
  });
}
function main() {
  handleSubmit();
}

$(main);
