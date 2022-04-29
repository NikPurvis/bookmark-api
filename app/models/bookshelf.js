// app/models/bookshelf.js

// Import dependencies
const mongoose = require('mongoose')

const bookshelfSchema = new mongoose.Schema(
    {
		owner: {
			type: mongoose.Schema.Types.ObjectID,
			ref: "User",
		},
		on_shelf: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
		}]
    },{
		timestamps: true,
	}
)

module.exports = mongoose.model('Bookshelf', bookshelfSchema)
