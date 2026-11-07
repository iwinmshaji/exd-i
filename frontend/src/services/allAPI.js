import apiService from "../api/apiService";

// POST /api/books : create a new book
export const addBookAPI = async (bookDetails)=>{
    return await apiService("POST","/api/books",bookDetails)
}

// GET /api/books : get all books
export const getAllBooksAPI = async ()=>{
    return await apiService("GET","/api/books",{})
}

// GET /api/books/:id : get single book
export const getBookAPI = async (id)=>{
    return await apiService("GET",`/api/books/${id}`,{})
}

// PUT /api/books/:id : update a book
export const updateBookAPI = async (id,bookDetails)=>{
    return await apiService("PUT",`/api/books/${id}`,bookDetails)
}

// DELETE /api/books/:id : delete a book
export const deleteBookAPI = async (id)=>{
    return await apiService("DELETE",`/api/books/${id}`,{})
}
