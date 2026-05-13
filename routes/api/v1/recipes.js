
const router = require('express').Router()
const recipes = require('../../../data/recipes.json')
const events = require('../../../data/events.json')
const { getCollection, ObjectId } = require('../../../dbconnect')

//returns all menu items
router.get('/', async (request, response) => {
    const {id, title, image, description, cost} = request.params
    const collection = await getCollection('Food-Truck', 'Food')
    const found = await collection.find().toArray()
    response.send(found)
})

//returns menu items
router.get('/menu', async (request, response) => {
    const {id, title, image, description, cost} = request.params
    const collection = await getCollection('Food-Truck', 'Food')
    const found = await collection.find().toArray()
    response.send(found)
})

//returns menu item by id
router.get('/menu/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getCollection('Food-Truck', 'Food')
    const found = await collection.findOne({"id": parseInt(id)})
    if(found)response.send(found)
    else response.send({ error: {message: `could not find food with id: ${id}`}})
})

//returns events
router.get('/events', async (request, response) => {
    const {id, title, location, date} = request.params
    const collection = await getCollection('Food-Truck', 'Events')
    const found = await collection.find().toArray()
    response.send(found)
    // const found = events.map(({id, title, location, date}) => ({id, title, location, date}))
    // response.send(found)
})

//returns events by id
router.get('/events/:id', async(request, response) => {
    const { id } = request.params
    const collection = await getCollection('Food-Truck', 'Events')
    const found = await collection.findOne({"id": parseInt(id)})
    if(found)response.send(found)
    else response.send({ error: {message: `could not find event with id: ${id}`}})
})

//gets the recipe with the specified id
// router.get('/recipe/:id', (request, response) => {
//     //gets the specified id
//     const { id } = request.params
//     //finds the id in the list of objects
//     const found = recipes[id-1]
//     //sends the specified recipe
//     response.send(found)
// })

//adds a new menu item
router.post('/menu', async (request, response) => {
    const { id, title, image, ingredients, description, cost } = request.body
    const collection = await getCollection('Food-Truck', 'Food')
    const { acknowledged, insertedId } = await collection.insertOne({ id, title, image, ingredients, description, cost })
    response.send({ acknowledged, insertedId })
})

//adds a new event
router.post('/events', async (request, response) => {
    const { id, title, location, time, date } = request.body
    const collection = await getCollection('Food-Truck', 'Events')
    const { acknowledged, insertedId } = await collection.insertOne({ id, title, location, time, date })
    response.send({ acknowledged, insertedId })
})

module.exports = router;