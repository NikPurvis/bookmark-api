// app/models/shelf.js

// Import dependencies
const mongoose = require('mongoose')

const shelfSchema = new mongoose.Schema(
    {
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		onShelf: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
			required: true
		},{
			timestamps: true
		}]
    },{
		timestamps: true,
	}
)

module.exports = mongoose.model("Shelf", shelfSchema)
