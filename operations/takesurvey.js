#!/usr/bin/nodejs
const readlineSync = require('readline-sync')
const helper = require('./helpers/helpers')

async function askForSurvey() {
    await helper.getAllSurveys()
    .then(post => helper.listAllSurveys(post))
    .catch(err => console.log(err))
   
    await helper.displayPrompt()
}

askForSurvey()

