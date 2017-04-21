module.exports = (server) => {
    const Challenge = server.models.Challenge;

    return (req, res) => {
         new Challenge(req.body)
             .save((err, instance) => {
                if (err)
                    return res.status(500).send(err);
                res.status(201).send();
             });

    };
};