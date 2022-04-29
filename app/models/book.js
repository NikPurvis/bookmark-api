// app/models/book.js

// Import dependencies
const mongoose = require('mongoose')
const reviewSchema = require('./review')
const tagSchema = require('./tag')

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
        tags: [tagSchema]
	},{
		timestamps: true,
	}
)

module.exports = mongoose.model('Book', bookSchema)
