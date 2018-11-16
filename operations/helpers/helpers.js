#!/usr/bin/nodejs
/*
Module that helps factilitate all the operations necessary to show and update surveys from the command line
*/

const fetch = require('node-fetch')
const readlineSync = require('readline-sync')


/* -------------------- showall helper functions --------------------- */

/**
  * @desc getAllSurveys - pings the application's api to retrieve all surveys
  * @param - N/A
  * @return - json object - object with all surveys in an array
*/
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

/**
  * @desc printSurvey - prints out each individual survey
  * @param object $data - the survey with survey information to display
  * @return - N/A
*/

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
/**
  * @desc formatsurvey - breaks the completed vs non completed surveys
  * @param array $data - an array of survey objects
  * @return - n/a
*/
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


/*------------------- showbyId helper functions ----------------------- */

/**
  * @desc askForSruvey - Prompts user for Survey id
  * @param - N/A
  * @return - N/A
*/
function askForSurvey() {
    return new Promise((resolve, reject) => {
        console.log('-------------------- ** ----------------------------')
        let survey_id = readlineSync.question('Please enter the Survey ID number: ')
        console.log('-------------------- ** ----------------------------')
        process.stdout.write('\n\n')
        resolve(survey_id)
    })
}


/**
  * @desc getSurveyById - pings API and gets survey object by the id
  * @param string $id - id the check for to get survey
  * @return - promise object - with the correct survey object
*/
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

/**
  * @desc listAllSurveys - lists all surveys and relevant information to search
  * @param array $post - survey array with all survey objects
  * @return - N/A
*/
function listAllSurveys(post) {
    console.log('-------------------- ** ----------------------------')
    console.log('Survey Ids and Titles currently available to search ')
    console.log('-------------------- ** ----------------------------')
    for (let i = 0; i < post.length; i++) {
        let surveyStatus = post[i].survey[0].answer
        console.log(`Completed: ${surveyStatus} | ID: ${post[i].id} | Survey Title: ${post[i].title}`)
    }
}


/* ---------------------------- take survey ------------------------ */

/**
  * @desc transformSurvey - take in an array of survey objects and updates each survey object
  * @param - array $post - an array of survey objects to transform
  * @return - array $post - a new array of updated survey objects
*/
function transformSurvey(post) {
    return new Promise((resolve, reject) => {
        let survey = post.survey
        /* Check for valid id */
        if (survey === undefined)
            reject(post)
        /* loop through survey and answer questsion */
        for (let i = 0; i < survey.length; i++) {
            answer = readlineSync.question(`${survey[i].question} (y/n): `).toLowerCase()
            answer = (answer === 'y' ? true : false)
            survey[i].answer = answer
        }
        resolve(post)
    })
}

/**
  * @desc checkStatus - checks the status of the postSurvey function that POST request the API
  * @param - N/A
  * @return - N/A
*/
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

/**
  * @desc postSurvey - posts a new survey to the API
  * @param post $post - survey array with all survey objects
  * @return - N/A
*/
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

/**
  * @desc displayPrompt - displays prompt for users to interact with. Updates survey object based on Id
  * @param - N/A
  * @return - N/A
*/
function displayPrompt() {
    console.log('-------------------- ** ----------------------------')
    let survey_id = readlineSync.question('Please enter the Survey ID number.\nSurvey ID: ')
    console.log('-------------------- ** ----------------------------')
    process.stdout.write('\n\n')

    let int_id = parseInt(survey_id, 10)
    if (isNaN(int_id)) {
        console.log(`${survey_id} is not a valid integer`)
        return
    }

    getSurveyById(survey_id)
    .then(post => transformSurvey(post))
    .then(post => postSurvey(post))
    .catch(err => console.log(err))
}

module.exports = {
    getAllSurveys,
    printSurvey,
    formatSurvey,
    askForSurvey,
    getSurveyById,
    listAllSurveys,
    transformSurvey,
    checkStatus,
    postSurvey,
    displayPrompt
}
