#!/usr/bin/nodejs
/*
Module that shows all surveys by and Id from ../data/post.json
*/
const helper = require('./helpers/helpers')

/**
  * @desc showSurveyById - shows all surveys by id
  * @param - N/A
  * @return - N/A
*/
async function showSurveyById() {
    await helper.getAllSurveys()
    .then(post => helper.listAllSurveys(post))
    .catch(err => console.log(err))

    await helper.askForSurvey()
    .then(id => helper.getSurveyById(id))
    .then(post => helper.printSurvey(post))
    .catch(err => console.log(err))
}

showSurveyById()
