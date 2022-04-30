// app/models/book.js

// Import dependencies
const mongoose = require('mongoose')
const { Schema } = mongoose
const reviewSchema = require('./review')

const bookSchema = new mongoose.Schema(
    {
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		publication: {
			type: String,
			required: false,
		},
        cover: {
			type: String,
			required: false,
		},
        isbn: {
			type: String,
			required: false,
		},
        genre: {
			type: String,
			required: false,
		},
        description: {
			type: String,
			required: false,
		},
		entered_by: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
        reviews: [reviewSchema],
			owner: {
				type: Schema.Types.ObjectId,
				ref: "User"
		},
		tags: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tag"
		}],
	},{
		timestamps: true,
		toObject: {virtuals: true},
		toJSON: {virtuals: true}
	}
)

module.exports = mongoose.model("Book", bookSchema)
