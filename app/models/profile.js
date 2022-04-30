// app/models/profile.js

// Import dependencies
const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: false,
            unique: true
        },
        location: {
            type: String,
            required: false
        },
        fav_books: {
            type: String,
            required: false
        },
        fav_authors: {
            type: String,
            required: false
        },
        fav_genres: {
            type: String,
            required: false
        },
        fav_quote: {
            type: String,
            required: false
        },
        blocked_tags: {
            type: Array,
            default: []
        },        
    }
)

const Profile = mongoose.model("Profile", profileSchema)
module.exports = { Profile, profileSchema }
