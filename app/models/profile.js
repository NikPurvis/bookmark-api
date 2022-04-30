// app/models/profile.js

// Import dependencies
const mongoose = require('mongoose')
const { Schema, model } = mongoose
const User = require('./user')

const profileSchema = new mongoose.Schema(
    {
		username: {
			type: String,
			required: false,
            unique: true
		},
		location: {
			type: String,
			required: false,
		},
		fav_books: {
			type: String,
			required: false,
		},
        fav_authors: {
			type: String,
			required: false,
		},
        fav_genres: {
			type: String,
			required: false,
		},
        fav_quote: {
			type: String,
			required: false,
		},
        owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},{
		timestamps: true,
	}
)

module.exports = mongoose.model('Profile', profileSchema)
