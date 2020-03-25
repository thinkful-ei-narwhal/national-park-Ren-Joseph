'use strict';

import $ from 'jquery';

// API key for Joseph
// const apiKey = 'URhY1SlMNkUUZlzkDFcx9VLPJH5sVEhegRcLc7pA';

// Resource Endpoint - https://developer.np

// Query String Parameters - parkCode=acad,dena

//const searchURL = 'https://developer.nps.gov/api/v1/parks?parkCode=ac'

//curl -H 'X-Api-Key: INSERT-API-KEY-HERE' 'https://developer.nps.gov/api/v1/parks?parkCode=acad'
const store = {};

function fetchApi() {}

function pushToStore() {}

function getParks() {}

function renderResults() {}

function handleSubmit() {
  $('form').submit(function(event) {
    event.preventDefault();
    let statevalue = $('.states').val();
    let numValue = $('.number-results').val();
    getParks(stateValue, numValue);
    console.log('working', statevalue, numValue);
  });
}
function main() {
  handleSubmit();
}

$(main);
