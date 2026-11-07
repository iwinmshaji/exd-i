const books = require('../models/bookModel')

// CREATE : add a new book
exports.addBookController = async (req,res)=>{
    console.log("Inside addBookController");
    const {title,author,bookId,publishedYear,genre} = req.body
    // validation : required fields
    if(!title || !author || !bookId){
        return res.status(400).json("Title, Author and Book ID are required!!!")
    }
    // bookId must be unique
    const existingBook = await books.findOne({bookId})
    if(existingBook){
        return res.status(409).json("Book ID already exists!!!")
    }
    const newBook = await books.create({title,author,bookId,publishedYear,genre})
    res.status(201).json(newBook)
}

// READ : get all books
exports.getAllBooksController = async (req,res)=>{
    console.log("Inside getAllBooksController");
    const allBooks = await books.find()
    res.status(200).json(allBooks)
}

// READ : get one book by id
exports.getBookController = async (req,res)=>{
    console.log("Inside getBookController");
    const {id} = req.params
    const book = await books.findById(id)
    if(book){
        res.status(200).json(book)
    }else{
        res.status(404).json("Book not Found!!!")
    }
}

// UPDATE : edit a book
exports.updateBookController = async (req,res)=>{
    console.log("Inside updateBookController");
    const {id} = req.params
    const {title,author,bookId,publishedYear,genre} = req.body
    if(!title || !author || !bookId){
        return res.status(400).json("Title, Author and Book ID are required!!!")
    }
    // bookId must be unique : no OTHER book can have it ($ne = not equal)
    const existingBook = await books.findOne({bookId,_id:{$ne:id}})
    if(existingBook){
        return res.status(409).json("Book ID already exists!!!")
    }
    const updatedBook = await books.findByIdAndUpdate(id,{title,author,bookId,publishedYear,genre},{returnDocument:'after'})
    if(updatedBook){
        res.status(200).json(updatedBook)
    }else{
        res.status(404).json("Book not Found!!!")
    }
}

// DELETE : remove a book
exports.deleteBookController = async (req,res)=>{
    console.log("Inside deleteBookController");
    const {id} = req.params
    const deletedBook = await books.findByIdAndDelete(id)
    if(deletedBook){
        res.status(200).json(deletedBook)
    }else{
        res.status(404).json("Book not Found!!!")
    }
}
