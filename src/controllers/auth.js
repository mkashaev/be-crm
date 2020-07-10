module.exports.login = (req, res) => {
  res.status(200).json({
    login: req.body.email,
    password: req.body.password
  });
};

module.exports.register = (req, res) => {
  res.status(200).json({
    message: 'register'
  });
};