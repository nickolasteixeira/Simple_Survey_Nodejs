/*
Module that abstracts API CRUD operations from the route
*/
let posts = require('../data/posts.json')

const filename = './data/posts.json'
const helper = require('../helpers/helper.js')


/**
  * @desc getPosts - Gets all posts in the data/posts.json file
  * @param - N/A
  * @return - json object - object with all surveys in an array
*/
function getPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            })
        }

        resolve(posts)
    })
}

/**
  * @desc getPost - Get post in the data/posts.json file based on id
  * @param - string $id - id of the survey object 
  * @return - json object - object with the survey id matching id passed into the function
*/
function getPost(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(post => resolve(post))
        .catch(err => reject(err))
    })
}

/**
  * @desc insertPost - inserts a new post to the data/posts.json file with updated object
  * @param - json object $newPost -  json object received from api POST call
  * @return - json object - newly updated object with new keys (id, dates, surveyid)
*/
function insertPost(newPost) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(posts) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newPost = { ...id, ...date, ...newPost }
        
        let survey = newPost.survey
        /* adds a new question_id and updated at key for each question */
        for (let i = 0; i < survey.length; i++) {
            survey[i].updatedAt = helper.newDate()
            survey[i].question_id = newPost.id + ((i+1)/100)
        }
        posts.push(newPost)
        helper.writeJSONFile(filename, posts)
        resolve(newPost)
    })
}

/**
  * @desc updatePost - updates a new post to the data/posts.json file
  * @param - string $id, json object $newPost- json object received from api PUT call
  * @return - json object - newly updated object with new keys (id, dates, surveyid)
*/
function updatePost(id, newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(post => {
            const index = posts.findIndex(p => p.id == post.id)
            id = { id: post.id }
            const date = {
                createdAt: post.createdAt,
                updatedAt: helper.newDate()
            } 
            posts[index] = { ...id, ...date, ...newPost }
            let survey = posts[index].survey
            /* updates a new question_id and updated at key for each question */
            for (let i = 0; i < survey.length; i++)
                survey[i].updatedAt = helper.newDate()
            helper.writeJSONFile(filename, posts)
            resolve(posts[index])
        })
        .catch(err => reject(err))
    })
}

/**
  * @desc deletePost - deletes a new post to the data/posts.json file
  * @param - string $id -  json object received from api DELETE call
  * @return - N/A
*/

function deletePost(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(() => {
            posts = posts.filter(p => p.id !== id)
            helper.writeJSONFile(filename, posts)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertPost,
    getPosts,
    getPost, 
    updatePost,
    deletePost
}
