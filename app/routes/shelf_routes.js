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
	Profile.findOne({ "owner": userId })
        .then(handle404)
        .then((profile) => res.status(200).json({ profile: profile.toObject() }))
		.catch(next)
})

// POST route
// Add book to user's bookshelf
router.post("/bookshelf/:bookId", requireToken, (req, res) => {
    bookId = req.params.bookId
    userId = req.user.id
    const newShelved = { "owner": userId, "onShelf": bookId}
    console.log("newShelved:", newShelved)
    Profile.findOne({ "owner": userId })
        .then(profile => {
            profile.bookshelf.push(newShelved)
            return profile.save()
        })
        .then(() => res.sendStatus(204))
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})

module.exports = router
