const axios = require('axios');
const config = require('../../config.js');
const path = require('path');

let model = {
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products',
  headers: { 'Authorization': config.TOKEN },
  getAll: () => {
    let options = {
      method: 'GET',
      url: model.url,
      headers: model.headers,
    }
    return axios(options)
    .then(res => {
      return res.data;
    })
  },

  getOne: (id) => {
    let options = {
      method: 'GET',
      url: path.join(model.url, id),
      headers: model.headers,
    }
    return axios(options)
    .then(res => {
      return res.data;
    })
  },

  getStyle: (id) => {
    let options = {
      method: 'GET',
      url: path.join(model.url, id, 'styles'),
      headers: model.headers,
    }
    return axios(options)
    .then(res => {
      return res.data;
    })
  },

  getRelated: (id) => {
    let options = {
      method: 'GET',
      url: path.join(model.url, id, 'related'),
      headers: model.headers,
    }
    return axios(options)
    .then(res => {
      return res.data;
    })
  },

}

module.exports = model;