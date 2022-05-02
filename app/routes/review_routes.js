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
const reviewSchema = require('../models/review')
const book = require('../models/book')

///////////////////////////
// Review routes
///////////////////////////
//
// INDEX
// See all reviews for a book
router.get("/reviews/:bookId", (req, res, next) => {
    bookId = req.params.bookId
	Book.findById(bookId)
        .populate("owner")
        .then(handle404)
        .then((reviews) => res.status(200).json({ reviews: reviews.toObject() }))
		.catch(next)
})


// // **** STRETCH GOAL/V2 ****
// // INDEX
// // See all reviews by a specific user
// router.get("reviews/user/:userId", (req, res, next) => {
//     userId = req.params.userId
//     Book.find(
//         { "reviews.owner": userId },
//         { "reviews.$": 1})
//     //     .populate("owner")
//     //     .populate("reviewOf")
//     //     .then((reviews) => {
//     //         return reviews.map((reviews) => reviews.toObject())
//     //     })
//         .then((reviews) => res.status(200).json({ reviews: reviews }))
//         .catch(next)
// })


// SHOW
// Get a specific review by its ID
router.get("/review/:id", (req, res, next) => {
    reviewId = req.params.id
    // Using the projectional operator ($) on the query otherwise it will return the entire subdocument array.
    Book.find({"reviews._id": reviewId}, {"reviews.$": true})
        // .populate("owner")
        .then(handle404)
        .then((review) => res.status(200).json({ review: review }))
        .catch(next)
})


// NEW route
// Create a new review on a book
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

// DESTROY
// Delete a specific review
// router.delete("/review/:bookId/:reviewId", requireToken, (req, res) => {
//     reviewId = req.params.reviewId
//     bookId = req.params.bookId
//     reviewToRemove = Book.find({"reviews._id": reviewId}, {"reviews.$": true})
//     console.log("remove me", reviewToRemove)
//     Book.findOneAndUpdate

router.delete("/review/:bookId/:reviewId", requireToken, async (req, res, next) => {
    reviewId = req.params.reviewId
    bookId = req.params.bookId
    userId = req.user.id
    await Book.findOneAndUpdate(
        { "id": bookId },
        { $pull: { reviews: reviewId }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
})


    // Book.findOneAndUpdate(
    //     {"reviews._id": reviewId}, {"reviews.$": true},
    //  -----------
    //     { $pull: { "reviews": reviewId }},
    //     { "new": true }
    // )
    //     .then(handle404)
    //  -----------
        // .then((review) => {
        //     requireOwnership
        // })
    //  -----------
        // .then((review) => {
        //     requireOwnership(req, review)
        //     return review.updateOne({ $pull: })
        // })
    //  -----------
        // .then(() => res.sendStatus(204))
        // .catch(next)
// })


// // // **** STRETCH GOAL/V2 ****
// // EDIT route
// // Update a review
// router.patch("/reviews/:id", requireToken, removeBlanks, (req, res, next) => {
//     // To prevent attempts to fake ownership of the review by including a new owner, delete the incoming key/value pair.
// 	delete req.body.review.owner
//     reviewId = req.params.id
//     Review.findOne({ reviewId })
// 		.then(handle404)
// 		.then((review) => {
// 			// The request object and Mongoose record pass through requireOwnership to see if they match.
// 			requireOwnership(req, review)
//             // If so, update.
// 			return review.updateOne(req.body.review)
// 		})
// 		.then(() => res.sendStatus(204))
// 		.catch(next)
// })




module.exports = router
