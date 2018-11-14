
function mustBeInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id)))
        res.status(400).json({ message: 'ID must be an integer' })
    else
        next()
}

function isValidObject(obj, res) {
    /* Checking if its an object type  */
    if (!(obj && typeof(obj) === 'object')) 
        res.status(400).json({message: 'Each item in the survey needs to be an object type' })

    /* Check for key length to be 2 */   
    if (Object.keys(obj).length !== 2)
        res.status(400).json({message: 'You need to pass two keys into each object <question> and <answer>'})
 
    /* Check for only question and answer keys in object */
    if (!('question' in obj) || !('answer' in obj))
        res.status(400).json({message: 'There should be a "question" or "answer" key in each survey object'})
   
    /* Check if question length is longer than 10 and answer length should be 0 */ 
    if (obj.question instanceof String || obj.question.length < 10)
        res.status(400).json({message: 'A valid question should be a string type and longer than 10 character'})
    if (obj.answer instanceof String || obj.answer.length !== 0)
        res.status(400).json({message: 'When creating a survey, the answer should be a string type and be blank. Ex:{"question":"Why do you consume cannabis?", "answer": ""}'})
    return true
}


function checkParameters(req, res) {
    const { title, tags, survey } = req.body
    if (!(title && tags && survey))
        res.status(400).json({ message: 'Need to have a dictionary with keys => title, tags and survey' })
    return true
}

function tagSurveyIsArray(req, res) {
    /* checks for tags and survey to both be of an array type, survey should also not be empty */
    const { title, tags, survey } = req.body
    if (!Array.isArray(tags))
        res.status(400).json({ message: 'The key "tags" needs to have a value of an array type'})
    if (!Array.isArray(survey))
        res.status(400).json({message: 'The key "survey" needs to have a value of an array with object type items'})
    if (Array.isArray(survey) && survey.length === 0)
        res.status(400).json({message: 'They survey value should not be an empty array'})
    return true
}



function checkFieldsPost(req, res, next) {
    const { title, tags, survey } = req.body

    checks = [checkParameters, tagSurveyIsArray]
    
    for (let i = 0; i < checks.length; i++)
        checks[i](req, res)
    
    for (let i = 0; i < survey.length; i++)
        isValidObject(survey[i], res) 
    
    next()
}

module.exports = {
    mustBeInteger,
    checkFieldsPost
}
