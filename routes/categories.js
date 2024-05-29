const categoriesRouter = require('express').Router()

const {
  findAllCategories,
  findCategoryById,
  createCategory,
  findByIdAndUpdate,
  deleteCategory,
  checkIsCategoryExists,
  checkEmptyName,
} = require('../middlewares/categories')
const {
  sendCategoriesById,
  sendAllCategories,
  sendCategoryCreated,
  sendCategoryUpdated,
  sendCategoryDeleted
} = require('../controllers/categories')
const { checkAuth } = require('../middlewares/auth')

categoriesRouter.get('/categories', findAllCategories, sendAllCategories)
categoriesRouter.post(
  '/categories',
  findAllCategories,
  checkIsCategoryExists,
  checkEmptyName,
  checkAuth,
  createCategory,
  sendCategoryCreated,
  
)

categoriesRouter.get('/categories/:id', findCategoryById, sendCategoriesById)
categoriesRouter.put(
  '/categories/:id',
  checkAuth,
  findByIdAndUpdate,
  sendCategoryUpdated,
  
)
categoriesRouter.delete(
  '/categories/:id',
  checkAuth,
  deleteCategory,
  sendCategoryDeleted,
  
)
module.exports = categoriesRouter
