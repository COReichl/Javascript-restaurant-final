
const router = require('express').Router()
const recipes = require('../../../data/recipes.json')
const events = require('../../../data/events.json')

//returns all recipes
router.get('/', (request, response) => {
    const found = recipes.map(({id, title, image, description, cost}) => ({id, title, image, description, cost}))
    response.send(found)
})

router.get('/menu', (request, response) => {
    const found = recipes.map(({id, title, image, description, cost}) => ({id, title, image, description, cost}))
    response.send(found)
})

router.get('/menu/:id', (request, response) => {
    const { id } = request.params
    const found = recipes.find(p => p.id.toString() === id)
    response.send(found)
})

router.get('/events', (request, response) => {
    const found = events.map(({id, title, location, date}) => ({id, title, location, date}))
    response.send(found)
})

router.get('/events/:id', (request, response) => {
    const { id } = request.params
    const found = events.find(p => p.id.toString() === id)
    response.send(found)
})

//gets the recipe with the specified id
router.get('/recipe/:id', (request, response) => {
    //gets the specified id
    const { id } = request.params
    //finds the id in the list of objects
    const found = recipes[id-1]
    //sends the specified recipe
    response.send(found)
})

//adds a new recipe
router.post('/recipe/add', (request, response) => {
    //creating the new recipe
    var newRecipe = { id: 0, title: "", image: "", description:"", ingredients: "", instructions: "", prepTime:0, difficulty:"" }
    //setting the information
    newRecipe = request.body
    newRecipe.id = recipes.length + 1
    //verifying information through console
    console.log(newRecipe)
    //adding new recipe to list of recipes
    recipes.push(newRecipe)
})

module.exports = router;