#!/usr/bin/nodejs
/*
Module that shows all surveys currently in ../data/post.json
*/
const fetch = require('node-fetch')
const helpers = require('./helpers/helpers')

/**
  * @desc showAllSurveys - shows all surveys by completed and non completed
  * @param - N/A
  * @return - N/A
*/
function showAllSurveys() { 
    helpers.getAllSurveys()
    .then(data=> helpers.formatSurvey(data))
    .catch((err) => console.log(err))
}

showAllSurveys()
