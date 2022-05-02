// app/models/profile.js

// Import dependencies
const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: {
			type: String,
			required: false,
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
	},{
		timestamps: true,
	}
)

module.exports = mongoose.model('Profile', profileSchema)
