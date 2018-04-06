const express = require('express');
const helmet = require('helmet');

const actionRouter = require('./actions/actionRouter.js');
const projectRouter = require('./projects/projectRouter.js');

const server = express();

function logger (req, res, next) {
    console.log('requesting: ${req.url}');

    next ();
}

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
    res.json({ api: "Connected...." });
})

const port = 5000;
server.listen(port);