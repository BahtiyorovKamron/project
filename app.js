const express = require('express')
const login = require('./modules/login')
const port = process.env.PORT || 1111
const server = express()
server.use( express.json() )
server.use(login)

server.listen(port,()=>console.log(port))