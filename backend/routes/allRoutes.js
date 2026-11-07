const express = require('express')
const bookController = require('../controllers/bookController')

const router = new express.Router()

// create a new book
router.post('/api/books',bookController.addBookController)

// get all books
router.get('/api/books',bookController.getAllBooksController)

// get single book by id
router.get('/api/books/:id',bookController.getBookController)

// update a book
router.put('/api/books/:id',bookController.updateBookController)

// delete a book
router.delete('/api/books/:id',bookController.deleteBookController)

module.exports = router
