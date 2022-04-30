// app/routes/profile_routes.js

// Import dependencies

// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for profiles
const Profile = require('../models/profile')

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
router.patch("/profile/:userId", requireToken, removeBlanks, (req, res, next) => {
    // To prevent attempts to fake ownership of the profile by including a new owner, delete the incoming key/value pair.
	delete req.body.profile.owner
    // Pull the requested profile to edit from the url
    userId = req.params.userId
    Profile.findOne({ "owner": userId })
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
