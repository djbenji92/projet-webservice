module.exports = (server) => {
    const Bot = server.models.Bot;

    return (req, res, next) => {
        Bot.find({ user: { $exists: false } }, (err, instances) => {
            if (err)
                return res.status(500).send(err);

            res.send(instances);
        });
    }
};
