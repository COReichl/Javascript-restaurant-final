
const express = require('express')
const colors = require('ansi-colors')
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 
const app = express()
const port = 3010

// middleware
app.use(express.static('public'))
app.use(express.json())

// routes
app.use('/api/v1', require('./routes/api/v1/recipes'))
app.use('/', require('./routes/pages/recipes'))

// server
const url = colors.blue('http://localhost:3010/')
const message = `Server is running on port ${port}. Visit ${url} in your browser.`
app.listen(port, () => console.log(message))