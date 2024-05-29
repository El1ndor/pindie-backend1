const usersRouter = require('express').Router()
const { checkAuth } = require('../middlewares/auth')
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
  hashPassword
} = require('../middlewares/users')
const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
  sendUserUpdated,
  deleteUser,
  sendMe
} = require('../controllers/users')

usersRouter.get('/users', 
findAllUsers,
 sendAllUsers, 
//filterPassword
)

usersRouter.post(
  '/users',
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
)
usersRouter.put('/users/:id',findByIdAndUpdate, sendUserUpdated, )
usersRouter.get('/me', checkAuth, sendMe)
usersRouter.get('/user/:id',  findUserById,sendUserById, )

usersRouter.delete('/users/:id', checkAuth, deleteUser, findByIdAndDelete)

module.exports = usersRouter
