let posts = require('../data/posts.json')
const filename = './data/posts.json'
const helper = require('../helpers/helper.js')

/* Gets all posts in the data/posts.json file */
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

/* Get post in the data/posts.json file based on id */
function getPost(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(post => resolve(post))
        .catch(err => reject(err))
    })
}

/* inserts a new post to the data/posts.json file */
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

/* updates a new post to the data/posts.json file */
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

/* deletes a new post to the data/posts.json file */
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
