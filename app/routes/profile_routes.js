// app/routes/profile_routes.js

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
const Profile = require('../models/profile')

///////////////////////////
// Profile routes
///////////////////////////
//
// SHOW
// Get the user profile via the ID in the URL
router.get("/profile/:userId", (req, res, next) => {
    userId = req.params.userId
	Profile.findOne({ "owner": userId })
        .then(handle404)
        .then((profile) => res.status(200).json({ profile: profile.toObject() }))
		.catch(next)
})

// NEW route
// Create a new profile
router.post("/profile", requireToken, (req, res, next) => {
	// Sets the profile owner to the current user ID
    req.body.profile.owner = req.user.id
    Profile.create(req.body.profile)
		.then((profile) => {
			res.status(201).json({ profile: profile.toObject() })
		})
		.catch(next)
})


// EDIT route
// Update user profile
router.patch("/profile", requireToken, removeBlanks, (req, res, next) => {
    // To prevent attempts to fake ownership of the profile by including a new owner, delete the incoming key/value pair.
	delete req.body.profile.owner
    // Get the info ourselves
    req.body.profile.owner = req.user.id
    Profile.findOne({ "owner": req.user.id })
		.then(handle404)
		.then((profile) => {
			// The request object and Mongoose record pass through requireOwnership to see if they match.
			requireOwnership(req, profile)
            // If so, update.
			return profile.updateOne(req.body.profile)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
