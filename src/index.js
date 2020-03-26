'use strict';

import $ from 'jquery';
import './index.css';

const searchURL = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'URhY1SlMNkUUZlzkDFcx9VLPJH5sVEhegRcLc7pA';

/**This will wait for the for to submit and
 * store the values for the states and amount of items to show
 */
function handleSubmit() {
  $('form').submit(function(event) {
    event.preventDefault();
    let stateValue = $('#states').val();
    let numValue = $('#number-results').val();
    getParks(stateValue, numValue);
  });
}

/**This will get the values we received from the form
 * and put them in a query string for us to make an API call.
 * 
 * Once it makes the API call, if it's no good (i.e, (!response.ok)),
 * it'll go down to the 'catch' block; 
 * if the API call is good, it'll call the 'renderResults' funciton.
 */
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

/**This accepts and object of key, value pairs and turns it into
 * a string of the 'key' equal to (=) 'value', each pair separated
 * by an '&'.
 */
function formatQueryParams(params) {
  const items = Object.keys(params).map(key => `${key}=${params[key]}`)
  return items.join('&');
}

/**This function will get an object from the 'response.json'
 * and append a new 'li' for each item in the data.
*/
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
