module.exports = (server) => {
    const Challenge = server.models.Challenge;

    return (req, res, next) => {
        Challenge.findById(req.params.id, (err, instance) => {
            if (err)
                return res.status(500).send(err);

            if (!instance)
                return res.status(404).send();

            res.send(instance);
        });
    }
};
