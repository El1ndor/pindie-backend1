const pagesRouter = require('express').Router()
const {
  sendIndex,
  sendDashboard,
  checkCookiesJWT
} = require('../controllers/auth.js')
const { checkAuth } = require('../middlewares/auth.js')
pagesRouter.get('/', sendIndex)
pagesRouter.get('/admin/**', checkCookiesJWT, checkAuth, sendDashboard)

module.exports = pagesRouter
