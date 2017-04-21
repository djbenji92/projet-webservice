const router = require('express').Router();

module.exports = (server) => {

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(server.models.Challenge.schema),
        server.actions.challenges.create
    );

    router.get('/',
        server.actions.challenges.list
    );

    router.get('/:id',
        server.actions.challenges.show
    );

    router.put('/:id',
        server.middlewares.bodyParser.json(),
        server.actions.challenges.update
    );

    router.delete('/:id',
        server.actions.challenges.remove
    );

    return router;
};