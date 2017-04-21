module.exports = (server) => {
    const Bot = server.models.Bot;
    const Weapon = server.models.Weapon;
    const User = server.models.User;

    //bots/:id/assign/:weaponId
    return (req, res, next) => {

        Weapon.findById(req.params.weaponId, (err, weapon) => {
            if (err)
                return res.status(500).send(err);

            if (!weapon)
                return res.status(404).send();

            if (weapon.bot)
                return res.status(403).send();

            Bot.findById(req.params.id, (err, bot) => {
                if (err)
                    return res.status(500).send(err);

                if (!bot)
                    return res.status(404).send();

                let nbWeapons = bot.weapons.length;
                if(nbWeapons >= bot.slots)
                    return res.status(403).send();

                weapon.bot = bot._id;

                bot.weapons.push(weapon._id);

                //decredite l'utilisateur avant de sauvegarder
                if(!bot.user)
                  return res.status(403).send(err);

                User.findOne({'_id':bot.user, "credit":{$gt: weapon.prix}}, (err, user) => {
                  if(!user)
                    return res.status(403).send(err);
                    console.log(user);
                    user.credit = user.credit - weapon.prix;
                    user.save();

                    weapon.save((err, instance) => {
                        if (err)
                            return res.status(500).send(err);

                        bot.save((err, instance) => {
                            if (err)
                                return res.status(500).send(err);

                            res.status(204).send();
                        })
                    })
                })

            })
        })
    };
};
