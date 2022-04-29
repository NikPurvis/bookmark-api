// app/routes/book_routes.js

// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for books
const Book = require('../models/book')

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

// INDEX
// "/" test
router.get("/", (req, res) => {
    res.send("You finally made it!")
})


// // GET /books
// router.get('/books', requireToken, (req, res, next) => {
// 	Book.find()
// 		.then((books) => {
// 			return books.map((book) => book.toObject())
// 		})
// 		// respond with status 200 and JSON of the examples
// 		.then((book) => res.status(200).json({ books: books }))
// 		// if an error occurs, pass it to the handler
// 		.catch(next)
// })



module.exports = router