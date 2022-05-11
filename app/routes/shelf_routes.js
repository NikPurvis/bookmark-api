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
router.get("/bookshelf/", requireToken, (req, res, next) => {
    userId = req.user.id
	Shelf.findOne({ "owner": userId })
        .populate("onShelf")
        .then(handle404)
        .then((shelf) => {
            return shelf.map((shelf) => shelf.toObject())
        })
        .then((shelf) => res.status(200).json({ shelf: shelf }))
        .catch(next)
    })

// PATCH route
// Add book to user's bookshelf
router.patch("/bookshelf", requireToken, async (req, res, next) => {
    bookId = req.params.id
    userId = req.user.id
    await Shelf.findOneAndUpdate(
        { "owner": userId },
        { $addToSet: { onShelf: bookId }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE route
// Remove book from user's bookshelf
router.delete("/bookshelf/:id", requireToken, async (req, res, next) => {
    bookId = req.params.id
    userId = req.user.id
    await Shelf.findOneAndUpdate(
        { "owner": userId },
        { $pull: { onShelf: bookId }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
})


// // ** No longer necessary as shelf is now created at user creation.
// // NEW route
// // Create a new shelf
// router.post("/bookshelf", requireToken, (req, res, next) => {
// 	shelfOwner = req.user.id
//     newShelf = { "owner": shelfOwner }
//     Shelf.create(newShelf)
// 		.then((shelf) => {
// 			res.status(201).json({ shelf: shelf.toObject() })
// 		})
// 		.catch(next)
// })

module.exports = router
