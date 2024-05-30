const bcrypt = require('bcryptjs')
const user = require('../models/user')

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)
    req.body.password = hash
    next()
  } catch (error) {
    res.status(400).send({ message: 'Ошибка хеширования пароля' })
  }
}

const findAllUsers = async (req, res, next) => {
  req.usersArray = await user.find({})
  next()
}

const createUser = async (req, res, next) => {
  try {
    req.user = await user.create(req.body)
    next()
  } catch (error) {
    console.log(error)
    res.setHeader('Content-Type', 'application/json')
    res.status(400).send('Ошибка при создании пользователя')
  }
}

const findUserById = async (req, res, next) => {
  console.log('GET /users/:id')
  try {
    req.user = await user.findById(req.params.id)
    next()
  } catch (error) {
    res.setHeader('Content-Type', 'application/json')
    res.status(404).send(JSON.stringify({ message: 'Пользователь не найден' }))
  }
}
const findByIdAndUpdate = async (req, res, next) => {
  try {
    req.users = await user.findByIdAndUpdate(req.params.id, req.body)
    next()
  } catch (error) {
    res.setHeader('Content-Type', 'application/json')
    res
      .status(400)
      .send(JSON.stringify({ message: 'Ошибка обновления пользователя' }))
  }
}

const findByIdAndDelete = async (req, res, next) => {
  try {
    req.user = await user.findByIdAndDelete(req.params.id)
    next()
  } catch (error) {
    res.setHeader('Content-Type', 'application/json')
    res
      .status(400)
      .send(JSON.stringify({ message: 'Ошибка удаления пользователя' }))
  }
}
const checkEmptyName = async (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    res.setHeader('Content-Type', 'application/json')
    res.status(400).send(JSON.stringify({ message: 'Заполни все имена' }))
  } else {
    next()
  }
}

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find(user => {
    return req.body.email === user.email
  })
  if (isInArray) {
    res.setHeader('Content-Type', 'application/json')
    res
      .status(400)
      .send(
        JSON.stringify({
          message: 'Пользователь с таким именем уже существует'
        })
      )
  } else {
    next()
  }
}

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Введите имя, email и пароль" }));
  } else {
    next();
  }
};

const filterPassword = (req, res, next) => {
  const filterUser = user => {
    const { password, ...userWithoutPassword } = user.toObject()
    return userWithoutPassword
  }
  if (req.user) {
    req.user = filterUser(req.user)
  }

  if (req.usersArray) {
    req.usersArray = req.usersArray.map(user => filterUser(user))
  }

  next()
}

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  findByIdAndUpdate,
  findByIdAndDelete,
  checkEmptyName,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  filterPassword,
  hashPassword
}
