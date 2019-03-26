const express = require('express');
const projectRouter = require('./routes/project-router')
const actionRouter = require('./routes/action-router')

const server = express();
const parser = express.json();
server.use(parser);

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)


module.exports = server;