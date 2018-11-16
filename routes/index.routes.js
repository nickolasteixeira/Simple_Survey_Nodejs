/* Base of the API routes */
const express = require('express')
const router = express.Router()

/* define API route */
router.use('/api/v1/posts', require('./post.routes'))

module.exports = router
