import { CSRF_TOKEN } from "./csrf_token.js"

//takes response just fetched and returns either '204 no content' or the json
//of the response
function handleResponse(response) {
    if (response.status === 204) {
        return '';
    } else if (response.status === 404) {
        return null;
    } else {
        return response.json()
    }
}

//this function attempts to fetch a response from the REST api backend
//based on the endpoint chosen, method used and data provided

function apiService(endpoint, method, data) {
    const config = { 
        method: method || "GET",
        body: data !== undefined ? JSON.stringify(data) : null,
        headers: {
            'content-type': 'application/json',
            'X-CSRFTOKEN': CSRF_TOKEN
        }
    };
    return fetch(endpoint, config)          
            .then(handleResponse)
            .catch(error => console.log(error))
}

export { apiService };