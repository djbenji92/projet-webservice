module.exports = (server) => {
    const Bot = server.models.Bot;
    const Weapon = server.models.Weapon;
    const User = server.models.User;

    return (req, res, next) => {

        User.findById(req.userId)
            .then(ensureOne)
            // .then(deleteUser)
            .then(unasignWeapons)
            .then(deleteBots)
            .then(res.noContent)
            .catch(res.error);

        function ensureOne(data) {
            return (data) ? data : Promise.reject({code: 404})
        }

        function deleteUser(user) {
            return User.remove({_id: req.userId});
        }

        function unasignWeapons(user) {
            let bots = user.bots;
            for (let bot of bots) {
                Bot.findById(bot, (err, detailBot) => {
                    let weapons = detailBot.weapons;

                    for (let weapon of weapons) {
                        Weapon.findById(weapon)
                            .then(unasignBot)
                            .catch(res.error);

                        function unasignBot(weapon) {
                            delete weapon.bot;
                            weapon.save();
                        }

                        detailBot.weapons.splice(weapon);

                        detailBot.save((err, instance) => {
                            if (err)
                                return res.status(500).send();
                        });

                        return user;
                    }

                });
            }
        }

        function deleteBots(user) {
            console.log('prout');
            return Bot.remove({_id: {$in: [user.bots]}}, (err, result) => {
                console.log(err);
                console.log(result);
            });
        }
    }
};
