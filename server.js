const express = require('express');
const projectRouter = require('./routes/project-router')

const server = express();
const parser = express.json();
server.use(parser);

server.use('/api/projects', projectRouter)

module.exports = server;