module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        User.find({"_id": req.params.id, "role": req.body.role})
            .then(ensureUserExist)
            .then(checkRole)
            .then(update)
            .then(respond)
            .catch(res.error);

        function ensureUserExist(data){
          if(!data)
            return Promise.reject({code: 404, reason: 'user.not.found'})

          return data;
        }

        function checkRole(data){
          console.log(req.body.role);
          if(req.body.role == "user" || req.body.role == "admin"){
            return data;
          } else{
            return Promise.reject({code: 403, reason: 'bad.role'})
          }
        }

        function update(roleUser){
            return User.findByIdAndUpdate(req.params.id, {"role": req.body.role});
        }

        function respond() {
            return res.status(204).send()
        }

        function error(error) {
            if (error.code)
                return res.status(code).send(error.reason);

            res.status(500).send();
        }
    };
};
