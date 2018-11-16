/*
Module that aids with helper functions for CRUD API operations
*/
const fs = require('fs')

/**
  * @desc getNewId - finds a new id for the survey object
  * @param - array $array - the survey with survey information to display
  * @return - new object with new id for the survey object
*/
const getNewId = (arr) => {
  if (arr.length > 0) {
    return arr[arr.length - 1].id + 1
  } else {
    return 1
  }
}

/**
  * @desc newDate - creates a new Date
  * @param - N/A
  * @return - string - new date in string format
*/
const newDate = () => new Date().toString()

/**
  * @desc mustBeInArray - checks if id is in a survey object before returning that object with the id
  * @param - array $array, string $id- the survey with survey information to display, id to check
  * @return - object with the id associated with the id parameter
*/
function mustBeInArray (arr, id) {
  return new Promise((resolve, reject) => {
    const row = arr.find(r => r.id == id)
    if (!row) {
      reject({
        message: 'ID is not good',
        status: 404
      })
    }
    resolve(row)
  })
}

/**
  * @desc writeJSONFile - writes array with survey object to ./data/post.json
  * @param - string $filename, array $content - file name to write to, new content to write to filename
  * @return - N/A
*/
function writeJSONFile (filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = {
  getNewId,
  newDate,
  mustBeInArray,
  writeJSONFile
}
