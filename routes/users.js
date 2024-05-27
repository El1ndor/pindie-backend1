const usersRouter = require('express').Router()
const {checkAuth} = require("../middlewares/auth")
const {
  findAllUsers,
  createUser,
  findUserById,
  findByIdAndUpdate,
  findByIdAndDelete,
  checkEmptyName,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  filterPassword,
  hashPassword,
} = require('../middlewares/users')
const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
  sendUserUpdated,
  deleteUser,
  sendMe,
} = require('../controllers/users')

usersRouter.get('/users', checkAuth, findAllUsers, sendAllUsers, filterPassword, )

usersRouter.post(
  '/users',
  hashPassword,
  //checkIsUserExists,
  //checkEmptyNameAndEmailAndPassword,
  createUser,
  sendUserCreated,
  //checkAuth,
)
usersRouter.get(
  '/user/:id',
  filterPassword,
  checkAuth,
  findUserById,
  sendUserById,
)
usersRouter.put('/users/:id', checkAuth, findByIdAndUpdate, sendUserUpdated, )
usersRouter.delete('/users/:id', checkAuth, deleteUser, findByIdAndDelete, )
usersRouter.get('/me', checkAuth, sendMe)
module.exports = usersRouter;
