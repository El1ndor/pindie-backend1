const gamesRouter = require('express').Router()
const { checkAuth } = require('../middlewares/auth.js')
const {
  findAllGames,
  createGame,
  findGameById,
  findByIdAndUpdate,
  deleteGame,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkIsGameExists,
  checkIsVoteRequest
} = require('../middlewares/games')
const {
  sendAllGames,
  sendGameCreated,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted
} = require('../controllers/games')

gamesRouter.post(
  '/games',
  findAllGames,
  checkEmptyFields,
  createGame,
  sendGameCreated,
  checkIsGameExists,
  checkAuth
)
gamesRouter.get('/games', findAllGames, sendAllGames,)
gamesRouter.get('/games/:id', findGameById, sendGameById,)
gamesRouter.put(
  '/games/:id',
  checkAuth,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  findByIdAndUpdate,
  sendGameUpdated,
)
gamesRouter.delete('/games/:id', deleteGame, sendGameDeleted, checkAuth)

module.exports = gamesRouter
