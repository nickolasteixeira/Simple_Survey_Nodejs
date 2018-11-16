#!/usr/bin/nodejs
/*
Module that allows users to take a survey
*/
const helper = require('./helpers/helpers')

/**
  * @desc askForSurvey - asks users for surveys, displays prompt, then updates survey
  * @param - N/A
  * @return - N/A
*/
async function askForSurvey() {
    /* list all surveys */
    await helper.getAllSurveys()
    .then(post => helper.listAllSurveys(post))
    .catch(err => console.log(err))
   
    /* displays prompt to get surveys */
    await helper.displayPrompt()
}

askForSurvey()

