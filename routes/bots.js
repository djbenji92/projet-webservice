const router = require('express').Router();



module.exports = (server) => {

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(server.models.Bot.schema),
        server.middlewares.ensureAuthenticatedAndRoleAdmin,
        server.actions.bots.create
    );

    router.get('/',
        server.actions.bots.list
    );

    router.get('/all',
        server.actions.bots.listAll
    );

    router.get('/me',
        server.actions.bots.myList
    );

    router.get('/:id',
        server.actions.bots.show
    );

    router.put('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.actions.bots.update
    );

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.bots.remove
    );

    router.post('/:id/assign/:weaponId',
        server.middlewares.ensureAuthenticatedAndRoleAdmin,
        server.actions.bots.assign
    );

    router.post('/:id/drop/:weaponId',
        server.middlewares.ensureAuthenticatedAndRoleAdmin,       
        server.actions.bots.drop
    );

    return router;
};
