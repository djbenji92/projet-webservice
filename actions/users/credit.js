module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        User.find({"_id": req.params.id})
            .then(ensureUserExist)
            //.then(checkRole)
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
          if(req.body.role == "admin"){
            return data;
          } else{
            return Promise.reject({code: 403, reason: 'bad.role'})
          }
        }

        function update(){
            return User.findByIdAndUpdate(req.params.id, {"credit": req.params.credit});
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
