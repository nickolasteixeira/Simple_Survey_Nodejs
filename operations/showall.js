#!/usr/bin/nodejs

const fetch = require('node-fetch')
let url = 'http://localhost:1337/api/v1/posts'

let params = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
}

fetch(url, params)
  .then(res => res.json())
  .then(data=> formatSurvey(data))
  .catch((err) => console.log(err))

function printSurvey(data) {
    console.log('Survey Id:', data.id)
    console.log('Survey Title:', data.title)
    if (data.survey[0].answer.length !== 0)
        console.log('-- Survey Questions and Answers --')
    else
        console.log('-- Survey Questions --')
    let survey = data.survey
    for (let j = 0; j < survey.length; j++) {
        let answer = survey[j].answer
        console.log(survey[j].question, answer)
    }
    console.log()
}
function formatSurvey(data) {

    /* Finding all completed surveys */
    console.log('-------------------- ** ----------------------------')
    console.log('-------- Displaying all Completed Surveys ----------')
    console.log('-------------------- ** ----------------------------')
    console.log()
    for (let i = 0; i < data.length; i++) {
        if (data[i].survey[0].answer.length !== 0) 
            printSurvey(data[i])
    }

    /* Finding all noncompleted surveys */
    console.log('-------------------- ** ----------------------------')
    console.log('----- Displaying all Non Completed Surveys ---------')
    console.log('-------------------- ** ----------------------------')
    console.log()
    for (let i = 0; i < data.length; i++) {
        if (data[i].survey[0].answer.length === 0) 
            printSurvey(data[i])
    }
}
