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
  sendMe,
  checkEmptyNameAndEmail,
} = require('../controllers/users')

usersRouter.get('/users', 
findAllUsers,
 sendAllUsers, 
)

usersRouter.post(
  '/users',
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
 // hashPassword,
  createUser,
  sendUserCreated,
)
usersRouter.put('/users/:id',checkEmptyNameAndEmail,findByIdAndUpdate, sendUserUpdated, )
usersRouter.get('/me', checkAuth, sendMe)
usersRouter.get('/user/:id',  findUserById,sendUserById, )

usersRouter.delete('/users/:id', checkAuth, findByIdAndDelete, deleteUser, )

module.exports = usersRouter
