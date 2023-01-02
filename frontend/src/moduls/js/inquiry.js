'use strict';

async function request(url, method = 'GET', data = null) {
  try {

    const headers = {}
    let body
    if (data) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)
    }
    console.log("http://localhost:3080"+url)
    const response = await fetch("http://localhost:3080"+url, {
      method,
      headers,
      body
    })
    return await response.json()
  } catch (e) {
    console.warn('Error', e.message)
  }
}

module.exports.request = request;
