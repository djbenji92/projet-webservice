module.exports = (server) => {
    const Challenge = server.models.Challenge;

    return (req, res, next) => {
        Challenge.findByIdAndUpdate(req.params.id,
            req.body,
            (err, instance) => {
            if (err)
                return res.status(500).send(err);

            if (!instance)
                return res.status(404).send();

            res.status(204).send();
        })
    }
};
