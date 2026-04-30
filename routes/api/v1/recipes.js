
const router = require('express').Router()
const recipes = require('../../../data/recipes.json')

//returns all recipes
router.get('/', (request, response) => {
    const found = recipes.map(({id, title, image, prepTime, difficulty}) => ({id, title, image, prepTime, difficulty}))
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