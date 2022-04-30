// app/routes/shelf_routes.js

// Import dependencies

// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for books
const Shelf = require('../models/shelf')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()


///////////////////////////
// Book routes
///////////////////////////
//
// INDEX route
// "/" root directory test
router.get("/", (req, res) => {
    res.send("You finally made it!")
})

// INDEX route
// Get all books
router.get('/books', (req, res, next) => {
	Book.find()
		.then((books) => {
			return books.map((book) => book.toObject())
		})
		// respond with status 200 and JSON of the books
		.then((books) => res.status(200).json({ books: books }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW route
// Get one individual book
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
// Create a new book
router.post('/books', requireToken, (req, res, next) => {
	req.body.book.entered_by = req.user.id
	Book.create(req.body.book)
		.then((book) => {
			res.status(201).json({ book: book.toObject() })
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
