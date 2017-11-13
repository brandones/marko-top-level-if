const fetch = require('isomorphic-fetch')

function checkStatus(response) {
  console.log(response)
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(`HTTP Error ${response.statusText}`)
  error.status = response.statusText
  error.response = response
  console.log('apiCall threw a damn error')
  console.log(error) // eslint-disable-line no-console
  throw error
}

function parseJSON(response) {
  return response.json()
}

module.exports.apiCall = (endpoint, method = 'GET', body = null) => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  const fetchParams = {
    accept: 'application/json',
    body: body ? JSON.stringify(body) : null,
    credentials: 'include',
    headers,
    method,
  }
  console.log(fetchParams)
  return fetch(endpoint, fetchParams)
  .then(checkStatus)
  .then(parseJSON)
}

