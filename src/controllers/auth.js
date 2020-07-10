module.exports.login = (req, res) => {
  res.status(200).json({
    message: 'login'
  })
}

module.exports.register = (req, res) => {
  res.status(200).json({
    message: 'register'
  })
}