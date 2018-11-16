#!/usr/bin/nodejs

const fetch = require('node-fetch')
const readlineSync = require('readline-sync')
//const operations = require('./takesurvey')

main()

function askForSurvey() {
    return new Promise((resolve, reject) => {
        console.log('-------------------- ** ----------------------------')
        let survey_id = readlineSync.question('Please enter the Survey ID number: ')
        console.log('-------------------- ** ----------------------------')
        process.stdout.write('\n\n')
        resolve(survey_id)
    })
}


function getAllSurveys() {
    return new Promise((resolve, reject) => {
        let url = 'http://localhost:1337/api/v1/posts/'
        let params = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
        fetch(url, params)
            .then(function(res) {
                resolve(res.json())
            })
            .catch((err) => reject(err))
    })
}


function getSurveyById(id) {
    return new Promise((resolve, reject) => {
        let url = 'http://localhost:1337/api/v1/posts/' + id
        let params = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
        fetch(url, params)
            .then(function(res) {
                resolve(res.json())
            })
            .catch((err) => reject(err))
    })
}

function listAllSurveys(post) {
    console.log('-------------------- ** ----------------------------')
    console.log('Survey Ids and Titles currently available to search ')
    console.log('-------------------- ** ----------------------------')
    for (let i = 0; i < post.length; i++) {
      console.log(`ID: ${post[i].id} Survey Title: ${post[i].title}`)
    }
}

async function main() {
    await getAllSurveys()
    .then(post => listAllSurveys(post))
    .catch(err => console.log(err))

    await askForSurvey()
    .then(id => getSurveyById(id))
    .then(post => printSurvey(post))
    .catch(err => console.log(err))
}

function printSurvey(data) {
    return new Promise((resolve, reject) => {
        if (data.survey === undefined) {
            reject(data)
            return
        }

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
    })
}

