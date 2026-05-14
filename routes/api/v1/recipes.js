
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
    // const found = events.map(({id, name, location, date}) => ({id, name, location, date}))
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

//adds a new menu item
router.post('/menu', async (request, response) => {
    const collection = await getCollection('Food-Truck', 'Food')
    const total = await collection.countDocuments() + 1
    const { id = total, title, image, ingredients = [], description, cost } = request.body
    console.log({ id, title, image, ingredients, description, cost })
    const { acknowledged, insertedId } = await collection.insertOne({ id, title, image, ingredients, description, cost })
     response.send({ acknowledged, insertedId })
})

//adds a new event
router.post('/events', async (request, response) => {
    const collection = await getCollection('Food-Truck', 'Events')
    const total = await collection.countDocuments() + 1
    const { id = total, title, location, time, date } = request.body
    const { acknowledged, insertedId } = await collection.insertOne({ id, title, location, time, date })
    response.send({ acknowledged, insertedId })
})

module.exports = router;