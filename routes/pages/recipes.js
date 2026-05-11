
const router = require('express').Router()
const path = require('path')
const root = path.join(__dirname, '..', '..', 'public')

router.get('/', (_, response) => response.sendFile('index.htm', { root }))
router.get('/menu', (_, response) => response.sendFile('index.htm', { root }))
router.get('/menu/:id', (_, response) => response.sendFile('recipe.htm', { root }))
router.get('/events', (_, response) => response.sendFile('index.htm', { root }))
router.get('/events/:id', (_, response) => response.sendFile('events.htm', { root }))
router.get('/admin', (_, response) => response.sendFile('admin.htm', { root }))

module.exports = router