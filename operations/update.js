#!/usr/bin/nodejs
const readline = require('readline')
const fetch = require('node-fetch')
const prompt = require('prompt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter the Survey ID number? If you do not have it, please type "no": ', (answer) => {
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

function postSurvey(post) {
    
    return new Promise((resolve, reject) => {
        let survey = post.survey
        let questions = []
        let newAnswers = []
        prompt.start()
        for (let i = 0; i < survey.length; i++)
            questions.push(survey[i].question)

        prompt.get(questions ,function(err, result){
              newAnswers.push(result)
        })
        console.log(newAnswers)
        console.log(questions)
        resolve(post)
    })
}



async function updateSurvey(id) {
 
    await getSurvey(id)
    .then(post => postSurvey(post))
    .catch(err => console.log(err))
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
