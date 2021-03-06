// seed.js will be a script we can run from the terminal to populate data across our models easily and all at once.

// **************************************************************
// ****** CAUTION ***********************************************
// ****** The script will first drop all documents **************
// ****** ALL DATA DROPPED WILL BE GONE GONE GONE ***************
// **************************************************************

// 1. Require Mongoose to make a database connection in the file
const mongoose = require("mongoose")
// 2. Get db config string from the file
const db = require("../../config/db")
// 3. Bring in our models
const Book = require("./book")

const starterBooks = [
    {
        "title": "The Shining",
        "author": "Stephen King",
        "publication": "1977",
        "cover": "https://i.imgur.com/skFriPa.png",
        "description": "Jack Torrance's new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he'll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote...and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old.",
        "isbn": "0451150325",
        "genre": "horror"
    },{        
        "title": "A Wizard of EarthSea",
        "author": "Ursula LeGuin",
        "publication": "1992",
        "cover": "https://i.imgur.com/H64QWC6.jpg",
        "description": "Ged was the greatest sorcerer in Earthsea, but in his youth he was the reckless Sparrowhawk. In his hunger for power and knowledge, he tampered with long-held secrets and loosed a terrible shadow upon the world. This is the tumultuous tale of his testing, how he mastered the mighty words of power, tamed an ancient dragon, and crossed death's threshold to restore the balance.",
        "isbn": "1680652109",
        "genre": "fantasy"
    },{        
        "title": "Count of Monte Cristo",
        "author": "Alexandre Duams",
        "publication": "1844",
        "cover": "https://i.imgur.com/U8lJhaz.jpg",
        "description": "Thrown in prison for a crime he has not committed, Edmond Dantes is confined to the grim fortress of If. There he learns of a great hoard of treasure hidden on the Isle of Monte Cristo and he becomes determined not only to escape, but also to unearth the treasure and use it to plot the destruction of the three men responsible for his incarceration. Dumas' epic tale of suffering and retribution, inspired by a real-life case of wrongful imprisonment, was a huge popular success when it was first serialized in the 1840s.",
        "isbn": "9780140449266",
        "genre": "action/adventure"
    },{        
        "title": "Atonement",
        "author": "Ian McEwan",
        "publication": "2001",
        "cover": "https://i.imgur.com/52o54Zm.jpg",
        "description": "On a hot summer day in 1935, thirteen-year-old Briony Tallis witnesses a moment's flirtation between her older sister, Cecilia, and Robbie Turner, the son of a servant and Cecilia's childhood friend. But Briony's incomplete grasp of adult motives???together with her precocious literary gifts???brings about a crime that will change all their lives.",
        "isbn": "9780385721790",
        "genre": "contemporary fiction"
    },{        
        "title": "The Dead Girls Club",
        "author": "Damien Angelica Walters",
        "publication": "2019",
        "cover": "https://i.imgur.com/yx7v8YJ.jpg",
        "description": "In 1991, Heather Cole and her friends were members of the Dead Girls Club. Obsessed with the macabre, the girls exchanged stories about serial killers and imaginary monsters, like the Red Lady, the spirit of a vengeful witch killed centuries before. Heather knew the stories were just that, until her best friend Becca began insisting the Red Lady was real???and she could prove it.\n\nThat belief got Becca killed.\n\nIt's been nearly thirty years, but Heather has never told anyone what really happened that night???that Becca was right and the Red Lady was real. She's done her best to put that fateful summer, Becca, and the Red Lady, behind her. Until a familiar necklace arrives in the mail, a necklace Heather hasn't seen since the night Becca died.\n\nThe night Heather killed her.\n\nNow, someone else knows what she did...and they're determined to make Heather pay.",
        "isbn": "9781643851631",
        "genre": "thriller"
    },{        
        "title": "Mexican Gothic",
        "author": "Silvia Moreno-Garcia",
        "publication": "2020",
        "cover": "https://i.imgur.com/o1lR9fC.jpg",
        "description": "After receiving a frantic letter from her newly-wed cousin begging for someone to save her from a mysterious doom, Noem?? Taboada heads to High Place, a distant house in the Mexican countryside. She's not sure what she will find???her cousin's husband, a handsome Englishman, is a stranger, and Noem?? knows little about the region.\n\nNoem?? is also an unlikely rescuer: She's a glamorous debutante, and her chic gowns and perfect red lipstick are more suited for cocktail parties than amateur sleuthing. But she's also tough and smart, with an indomitable will, and she is not afraid: Not of her cousin's new husband, who is both menacing and alluring; not of his father, the ancient patriarch who seems to be fascinated by Noem??; and not even of the house itself, which begins to invade Noemi's dreams with visions of blood and doom.\n\nHer only ally in this inhospitable abode is the family's youngest son. Shy and gentle, he seems to want to help Noem??, but might also be hiding dark knowledge of his family's past. For there are many secrets behind the walls of High Place. The family's once colossal wealth and faded mining empire kept them from prying eyes, but as Noem?? digs deeper she unearths stories of violence and madness.\n\nAnd Noem??, mesmerized by the terrifying yet seductive world of High Place, may soon find it impossible to ever leave this enigmatic house behind.",
        "isbn": "9781529402681",
        "genre": "gothic fiction"
    },{        
        "title": "In the Woods",
        "author": "Tana French",
        "cover": "https://i.imgur.com/q7D8XbQ.jpg"
    },{        
        "title": "The House Next Door",
        "author": "Anne Rivers Siddons",
        "cover": "https://i.imgur.com/jrEWJnq.jpg"
    },{        
        "title": "The Killer Wore Leather",
        "author": "Laura Antoneiu",
        "cover": "https://i.imgur.com/5GgJQL3.jpg"
    },{        
        "title": "The Likeness",
        "author": "Tana French",
        "cover": "https://i.imgur.com/XrT0Cg1.jpg"
    },{        
        "title": "The Secret History",
        "author": "Donna Tartt",
        "cover": "https://i.imgur.com/ktHW6kS.jpg"
    },{        
        "title": "The Dwelling",
        "author": "Susie Moloney",
        "cover": "https://i.imgur.com/iP3ocbk.jpg"
    },{        
        "title": "Feed",
        "author": "Mira Grant",
        "cover": "https://i.imgur.com/X0UvFBr.jpg"
    },{        
        "title": "If it Bleeds",
        "author": "Stephen King",
        "cover": "https://i.imgur.com/s1Xs3Xt.jpg"
    },{        
        "title": "A Beautiful Poison",
        "author": "Lydia Kang",
        "cover": "https://i.imgur.com/MnSo9Mj.jpg"
    },{        
        "title": "This House is Haunted",
        "author": "John Boyne",
        "cover": "https://i.imgur.com/0PA0g8B.jpg"
    },{        
        "title": "East of Eden",
        "author": "John Steinbeck",
        "cover": "https://i.imgur.com/bAvivcG.jpg"
    },{        
        "title": "Fifteen Dogs",
        "author": "Andre Alexis",
        "cover": "https://i.imgur.com/qC9Dwyf.jpg"
    },{        
        "title": "It",
        "author": "Stephen King",
        "cover": "https://i.imgur.com/Yq3gFtZ.jpg"
    },{        
        "title": "Into the Drowning Deep",
        "author": "Mira Grant",
        "cover": "https://i.imgur.com/mjumQ9J.jpg"
    },{        
        "title": "Gideon the Ninth",
        "author": "Tamsyn Muir",
        "cover": "https://i.imgur.com/IB6NYpg.jpg"
    },{        
        "title": "The Wild Iris",
        "author": "Louise Gluck",
        "cover": "https://i.imgur.com/seKFU0e.jpg"
    },{        
        "title": "Doctor Sleep",
        "author": "Stephen King",
        "cover": "https://i.imgur.com/ZQU7ccv.jpg"
    },{        
        "title": "They Shoot Horses, Don't They?",
        "author": "Horace McCoy",
        "cover": "https://i.imgur.com/wD0K1QK.jpg"
    },{        
        "title": "My Cousin Rachel",
        "author": "Daphne du Maurier",
        "cover": "https://i.imgur.com/RN10OF7.jpg"
    }
]


//////////////////////////
// Seeding Collections
//////////////////////////
//
// Connect to the database via Mongoose (reference server.js)
mongoose.connect(db, {
	useNewUrlParser: true,
})
    .then(() => {
        Book.remove()
            .then(deletedBook => {
                console.log('deleted:', deletedBook)
                // we'll use console logs to check if it's working or if there are errors
                Book.create(starterBooks)
                    .then(newBook => {
                        console.log("Books seeded")
                        mongoose.connection.close()
                    })
                    .catch(err => {
                        console.log(err)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    // then at the end, we close our connection to the db
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })
//
//////////////////////////
// End seed script
//////////////////////////
