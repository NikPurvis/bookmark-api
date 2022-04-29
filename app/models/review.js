// app/models/reviews.js

// Import dependencies
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
    {
		subject: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		stars: {
			type: String,
			required: true,
			enum:["0 stars", "1 star", "2 stars", "3 stars", "4 stars", "5 stars"]
		},
		is_finished: {
			type: Boolean,
			requried: true
		},
		owner: {
			type: mongoose.Schema.Types.ObjectID,
			ref: "User",
		},
		reviewing: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
		}
	},{
		timestamps: true,
	}
)

module.exports = reviewSchema
