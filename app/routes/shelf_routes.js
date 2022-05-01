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
const Profile = require('../models/profile')


///////////////////////////
// Bookshelf routes
///////////////////////////
//
// SHOW route
// Get user's bookshelf
router.get("/bookshelf/:userId", (req, res, next) => {
    userId = req.params.userId
	Shelf.findOne({ "owner": userId })
        .then(handle404)
        .then((shelf) => res.status(200).json({ shelf: shelf.toObject() }))
		.catch(next)
})

// PATCH route
// Add book to user's bookshelf
router.patch("/bookshelf/:id", requireToken, async (req, res, next) => {
    bookId = req.params.id
    userId = req.user.id
    await Shelf.findOneAndUpdate(
        { "owner": userId },
        { $addToSet: { onShelf: bookId }}
    )
        .then(handle404)
        .then((shelf) => res.status(200).json({ shelf: shelf.toObject() }))
        .catch(next)
})


// NEW route
// Create a new profile
router.post("/bookshelf", requireToken, (req, res, next) => {
	shelfOwner = req.user.id
    newShelf = { "owner": shelfOwner }
    Shelf.create(newShelf)
		.then((shelf) => {
			res.status(201).json({ shelf: shelf.toObject() })
		})
		.catch(next)
})

module.exports = router
