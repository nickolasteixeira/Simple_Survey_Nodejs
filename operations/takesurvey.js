#!/usr/bin/nodejs
const helper = require('../helpers/helper.js')
const fetch = require('node-fetch')
const readlineSync = require('readline-sync')


function askForSurvey() {
    console.log('-------------------- ** ----------------------------')
    let survey_id = readlineSync.question('Please enter the Survey ID number.\nIf you do not have it, please type "no"\nSurvey ID: ')
    console.log('-------------------- ** ----------------------------')
    process.stdout.write('\n\n')

    if (survey_id === "no") 
        printFindId()
    else 
        updateSurvey(survey_id)
}


function printFindId() {
    console.log('-------------------- ** ----------------------------')
    console.log('Please find the ID of the Survey you want to update by running the ./operations/show.js file')
    console.log('-------------------- ** ----------------------------')
}

askForSurvey()


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

function transformSurvey(post) {
    return new Promise((resolve, reject) => {
        let survey = post.survey
        /* Check for valid id */
        if (survey === undefined) {
            reject(post)
            printFindId()
        }
        /* loop through survey and answer questsion */ 
        for (let i = 0; i < survey.length; i++) {
            answer = readlineSync.question(`${survey[i].question} (y/n): `).toLowerCase()
            answer = (answer === 'y' ? true : false)
            survey[i].answer = answer
        }
        resolve(post)
    })
}

function checkStatus(res) {
    if (res.status === 200) {
        process.stdout.write('\n\n')
        console.log('-------------------- ** ----------------------------') 
        console.log('            Survey succesfully saved                ')
        console.log('-------------------- ** ----------------------------') 
        process.stdout.write('\n\n')
    } else {
        console.log(response.statusText)
    }
}

function postSurvey(post) {
    return new Promise((resolve, reject) => {
        let id = post.id
        let url = 'http://localhost:1337/api/v1/posts/' + id
        let params = {
            method: 'PUT',
            body: JSON.stringify(post),
            headers: {'Content-Type': 'application/json'}
        }
        fetch(url, params)
            .then(checkStatus)
            .catch((err) => reject(err))
    }) 
}

function updateSurvey(id) {
    let int_id = parseInt(id, 10)
    if (isNaN(int_id)) {
        console.log(`${id} is not a valid integer`)
        return
    }
  
    getSurveyById(id)
    .then(post => transformSurvey(post))
    .then(post => postSurvey(post))
    .catch(err => console.log(err))
}

module.exports = {
    updateSurvey,
    postSurvey,
    checkStatus,
    transformSurvey,
    getSurveyById,
    printFindId,
    askForSurvey
}       
