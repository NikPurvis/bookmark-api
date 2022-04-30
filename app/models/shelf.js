// app/models/shelf.js

// Import dependencies
const mongoose = require('mongoose')

const shelfSchema = new mongoose.Schema(
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

const Shelf = mongoose.model("Shelf", shelfSchema)
module.exports = { Shelf, shelfSchema }
