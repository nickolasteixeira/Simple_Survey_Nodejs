#!/usr/bin/nodejs

const fetch = require('node-fetch')
const readlineSync = require('readline-sync')
const helper = require('./helpers/helpers')

async function main() {
    await helper.getAllSurveys()
    .then(post => helper.listAllSurveys(post))
    .catch(err => console.log(err))

    await helper.askForSurvey()
    .then(id => helper.getSurveyById(id))
    .then(post => helper.printSurveys(post))
    .catch(err => console.log(err))
}

main()
