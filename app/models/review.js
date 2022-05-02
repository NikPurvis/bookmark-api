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
			type: Number,
			min: 0,
			max: 5,
			default: 3,
			required: true,
		},
		// isFinished: {
		// 	type: Boolean,
		// 	requried: true,
		// 	default: true
		// },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		}
	},{
		timestamps: true,
	}
)

module.exports = reviewSchema
