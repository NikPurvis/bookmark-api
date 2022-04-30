// app/routes/shelf_routes.js

// Import dependencies
const express = require('express')
const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// Import models
const Shelf = require('../models/shelf')
const Book = require('../models/book')
const User = require('../models/user')

///////////////////////////
// Bookshelf routes
///////////////////////////
//
// SHOW route
// Get user's bookshelf
router.get('/books/:id', (req, res, next) => {
	// Book to search for determined by ID in the URL
    Book.findById(req.params.id)
        // If no books found, raise 404 error middleware
        .then(handle404)
        // If book found, respond with 200 status and return the book in JSON format.
		.then((book) => res.status(200).json({ book: book }))
		// if an error occurs, pass it to the handler.
		.catch(next)
})

// NEW route
// Create a new bookshelf
router.post('/shelf', requireToken, (req, res, next) => {
	req.body.shelf.owner = req.user.id
	Shelf.create(req.body.shelf)
		.then((shelf) => {
			res.status(201).json({ shelf: shelf.toObject() })
		})
		.catch(next)
})

// DESTROY
// Delete a book
router.delete('/books/:id', requireToken, (req, res, next) => {
	Book.findById(req.params.id)
		.then(handle404)
		.then((book) => {
			book.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// EDIT route
// Update a book
router.patch('/books/:id', requireToken, removeBlanks, (req, res, next) => {
	// delete req.body.book.owner

	Book.findById(req.params.id)
		.then(handle404)
		.then((book) => {
			return book.updateOne(req.body.book)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
