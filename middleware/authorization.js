
const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401)
  };


function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(401)
  }
  next()
}

module.exports = {checkAuthenticated, checkNotAuthenticated}
