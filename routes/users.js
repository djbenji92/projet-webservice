const router = require('express').Router();

module.exports = (server) => {

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(server.models.User.schema),
        server.actions.users.create
    );

    router.get('/',
        server.actions.users.list
    );

    router.get('/:id',
        server.actions.users.show
    );

    router.put('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureAuthenticated,
        server.middlewares.clean(['password', '_id']),
        server.actions.users.update
    );

    router.delete('/:id',
        server.actions.users.remove
    );

    router.post('/:id/grant',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureAuthenticated,
        server.actions.users.grant
    );

    router.post('/:id/credit/:credit',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureAuthenticatedAndRoleAdmin,
        server.actions.users.grant
    );

    return router;
};
