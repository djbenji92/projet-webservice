module.exports = (server) => {
    const Challenge = server.models.Challenge;
    
    return (req, res, next) => {

        Challenge.findById(req.params.id)
            .then(ensureOne)
            .then(ensureLoggedUserIsOwner)
            .then(removeChallenge)
            .then(respond)
            .catch(error);

        function ensureOne(data) {
            return (data)? data : Promise.reject({code: 404})
        }

        function ensureLoggedUserIsOwner(challenge) {
            if (challenge.user != req.userId)
                return Promise.reject({code: 403});

            return challenge;
        }


        function removeChallenge() {
            return Challenge.findByIdAndRemove(req.params.id)
        }

        function respond(data) {
            return res.status(204).send()
        }

        function error(reason) {
            if (!reason.code)
                return res.status(500).send(reason);

            return res.status(reason.code).send(reason.message);
        }
    }
};
