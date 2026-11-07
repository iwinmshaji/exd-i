const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    bookId : {
        type : String,
        required : true,
        unique : true
    },
    publishedYear : {
        type : Number
    },
    genre : {
        type : String
    }
})

// 'books' = collection name in MongoDB
const books = mongoose.model('books',bookSchema)

module.exports = books
