module.exports = (server) => {
    const Bot = server.models.Bot;
    const Challenge = server.models.Challenge;

    //challenges/:id/assign/:botId
    return (req, res, next) => {

        Bot.findById(req.params.botId, (err, bot) => {
            if (err)
                return res.status(500).send(err);

            if (!bot)
                return res.status(404).send();

            if (bot.bot)
                return res.status(403).send();

            Challenge.findById(req.params.id, (err, challenge) => {
                if (err)
                    return res.status(500).send(err);

                if (!challenge)
                    return res.status(404).send();


                bot.challenge = challenge._id;

                challenge.bots.push(bot._id);

                challenge.save((err, instance) => {
                    if (err)
                        return res.status(500).send(err);

                    challenge.save((err, instance) => {
                        if (err)
                            return res.status(500).send(err);

                        res.status(204).send();
                    })
                })
            })
        })
    };
};