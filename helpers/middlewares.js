
function mustBeInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id)))
        res.status(400).json({ message: 'ID must be an integer' })
    else
        next()
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
          return false
    }
    return true
}

function notCorrectLength(obj) {
    if (Object.keys(obj).length !== 2)
        return true
    return false
}
function checkFieldsPost(req, res, next) {
    const { title, tags, survey } = req.body

    console.log(req.body)

    all_checks = []
 
    if (!(title && tags && survey))
        res.status(400).json({ message: 'Need to have a dictionary with keys => title, tags and survey' })
    else if (!Array.isArray(tags))
        res.status(400).json({ message: 'The key "tags" needs to have a value of an array type'})
    else if (!Array.isArray(survey))
        res.status(400).json({message: 'The key "survey" needs to have a value of an array with object type items'})
    else if (Array.isArray(survey))
        if (survey.length === 0)
            res.status(400).json({message: 'They survey value should not be an empty array'})
        for (let i = 0; i < survey.length; i++)
            /* Checking if its an object type */
            if (!(survey[i] && typeof(survey[i]) === 'object')) 
                res.status(400).json({message: 'Each item in the survey needs to be a object type' })
            /* Checking if an object is empty */
            //if (isEmpty(survey[i]))
                //res.status(400).json({message: 'You cannot pass an empty object as an item in the Survey'})
            //if (notCorrectLength(survey[i]))
                //res.status(400).json({message: 'Each object in the survey has to have a length of 2'}) 
            /* Checking if each survey object has the key question */ 
    else 
        next()
}

module.exports = {
    mustBeInteger,
    checkFieldsPost
}
