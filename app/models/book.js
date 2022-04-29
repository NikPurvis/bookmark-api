// app/models/book.js

// Import dependencies
const mongoose = require('mongoose')
const {Schema, model} = mongoose
const reviewSchema = require('./review')
const tagsSchema = require('./tags')

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
        reviews: [reviewSchema],
			owner: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
        tags: [tagsSchema]
	},{
		timestamps: true,
	}
)

module.exports = mongoose.model('Book', bookSchema)
