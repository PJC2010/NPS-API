'use strict'

function formatQueryParams(params){
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&')
}
function getStateParks(searchURL, searchState, maxResults, apiKey){
    const params = {
        stateCode: searchState,
        limit: maxResults
    }
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString + '&api_key=' + apiKey;
    console.log(url)

    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json()
        }
        throw new Error(response.statusText)
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('#js-error').text(`Something went wrong: ${err.message}`)
    })

}

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    for(let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName} - Location: ${responseJson.data[i].states}</h3>
            <p>Address: ${responseJson.data[0]}</p>
            <p>Description: ${responseJson.data[i].description}</p></li>
            <p>URL: <a href="${responseJson.data[i].url}"</a> ${responseJson.data[i].url}</p>
            `)

    }
    $('section').removeClass('hidden')
    
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchURL = 'https://api.nps.gov/api/v1/parks'
        const stateCode = $('#js-state-search').val()
        const maxResults = $('#js-max-results').val();

        const apiKey = 'z4BFySAXLMiM6EMUCtCCz11nbpCHgqErutdZsaRW'
        getStateParks(searchURL, stateCode, maxResults, apiKey)

    })
}
$(watchForm);
