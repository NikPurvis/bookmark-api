// app/routes/review_routes.js

// Import dependencies
const express = require('express')
const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Import models
const Review = require('../models/review')
const Book = require('../models/book')

///////////////////////////
// Review routes
///////////////////////////
//
// INDEX
// See all reviews for a book
router.get("/reviews/:bookId", (req, res, next) => {
    bookId = req.params.bookId
	Review.findOne({ "reviewOf": bookId })
        .populate("reviewOf")
        .populate("owner")
        .then(handle404)
        .then((review) => res.status(200).json({ review: review.toObject() }))
		.catch(next)
})

// INDEX
// See all reviews by a specific user
router.get("reviews/user/:userId", (req, res, next) => {
    userId = req.params.userId
    Review.find({ "owner": userId })
        .populate("owner")
        .populate("reviewOf")
        .then((reviews) => {
            return reviews.map((reviews) => reviews.toObject())
        })
        .then((reviews) => res.status(200).json({ reviews: reviews }))
        .catch(next)
})

// SHOW
// Get a specific review
router.get("/reviews/:id", (req, res, next) => {
	Review.findById(req.params.id)
        .populate("reviewOf")
        .populate("owner")
        .then(handle404)
        .then((review) => res.status(200).json({ review: review.toObject() }))
		.catch(next)
})

// NEW route
// Create a new review on a book
// router.post("/reviews/:bookId", requireToken, (req, res, next) => {
// 	// Sets the review owner to the current user ID
//     req.body.review.owner = req.user.id
//     req.body.review.reviewOf = req.params.id
//     Review.create(req.body.review)
// 		.then((review) => {
// 			res.status(201).json({ review: review.toObject() })
// 		})
// 		.catch(next)
// })

router.post("/reviews/:bookId", requireToken, (req, res) => {

    bookId = req.params.bookId
    // Adding the reivew owner via user id
    req.body.review.owner = req.user._id
    // Find the book the user is reviewing
    Book.findById(bookId)
        .then(book => {
            // Adding the review to the book's reviews array...
            console.log("review body:", req.body)
            book.reviews.push(req.body.review)
            // ...and save the book
            return book.save()
        })
        // Send confirmation that the review was added successfully
        .then(() => res.sendStatus(204))
        // Throw an error if something went wrong
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})

// EDIT route
// Update a review
router.patch("/reviews/:id", requireToken, removeBlanks, (req, res, next) => {
    // To prevent attempts to fake ownership of the review by including a new owner, delete the incoming key/value pair.
	delete req.body.review.owner
    reviewId = req.params.id
    Review.findOne({ reviewId })
		.then(handle404)
		.then((review) => {
			// The request object and Mongoose record pass through requireOwnership to see if they match.
			requireOwnership(req, review)
            // If so, update.
			return review.updateOne(req.body.review)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
