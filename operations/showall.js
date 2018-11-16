#!/usr/bin/nodejs

const fetch = require('node-fetch')
const helpers = require('./helpers/helpers')

helpers.getAllSurveys()
.then(data=> helpers.formatSurvey(data))
.catch((err) => console.log(err))
