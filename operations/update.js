#!/usr/bin/nodejs
const helper = require('../helpers/helper.js')
const readline = require('readline')
const fetch = require('node-fetch')
const readlineSync = require('readline-sync')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter the Survey ID number.\nIf you do not have it, please type "no": ', (answer) => {
  if (answer === "no")
      console.log('Please find the ID of the Survey you want to update by running the ./operations/show.js file')
  else 
      updateSurvey(answer)
  rl.close()
})

function getSurvey(id) {
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
        console.log('-------------------- ** ----------------------------') 
        console.log('            Survey succesfully saved                ')
        console.log('-------------------- ** ----------------------------') 
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
 
    getSurvey(id)
    .then(post => transformSurvey(post))
    .then(post => postSurvey(post))
    .catch(err => console.log(err))
}

