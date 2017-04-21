module.exports = (server) => {
    const Challenge = server.models.Challenge;

    return (req, res) => {
        let date = Date.now();

        findUser()
          .then(ensureNotExist)
          .then(checkConcurrent)
          .then(saveChallenge)
          .then(res.created)
          .catch(res.error);

        function findUser() {
            return Challenge.findOne({'target':req.userId, 'date':date}, (err, res) => {
              if(err)
                Promise.reject({code: 500, reason: 'bug.request.find.user.1'})
            });
        }

        function ensureNotExist(user){
          return (user)? Promise.reject({code: 404, reason: 'user1.not.found'}) : user;
        }

        function checkConcurrent(user){
          Challenge.findOne({'target':req.params.id, 'date':date}, (err, user2) => {
              if(user2)
                return res.status(403).send()

          })
          return user;
        }

        function saveChallenge(){
          new Challenge(req.body)
            .save((err, instance) => {
               if (err)
                   return res.status(500).send(err);
               res.status(201).send();
            });
        }

    };
};
