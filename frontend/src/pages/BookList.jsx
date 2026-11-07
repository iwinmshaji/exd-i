import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import { deleteBookAPI, getAllBooksAPI } from '../services/allAPI'

function BookList() {

  const [allBooks,setAllBooks] = useState([])      // books from the backend
  const [searchKey,setSearchKey] = useState("")    // search box text
  const [genreFilter,setGenreFilter] = useState("") // genre dropdown

  // READ : get all books when the page opens
  const getAllBooks = async()=>{
    const result = await getAllBooksAPI()
    if(result.status==200){
      setAllBooks(result.data)
    }else{
      toast.error("Cannot load books. Is the server running?")
    }
  }

  useEffect(()=>{
    getAllBooks()
  },[])

  // DELETE : with confirmation
  const handleDelete = async(id,title)=>{
    const isConfirmed = window.confirm(`Are you sure you want to delete "${title}"?`)
    if(isConfirmed){
      const result = await deleteBookAPI(id)
      if(result.status==200){
        toast.success("Book Deleted!!!")
        getAllBooks()          // refresh the table
      }else{
        toast.error(result?.response?.data || "Something Went Wrong!!!")
      }
    }
  }

  // SEARCH + FILTER
  const filteredBooks = allBooks.filter(book=>
    (book.title.toLowerCase().includes(searchKey.toLowerCase()) ||
     book.author.toLowerCase().includes(searchKey.toLowerCase())) &&
    (genreFilter=="" || book.genre==genreFilter)
  )

  return (
    <>
      {/* hero */}
      <div className='bg-green-50 p-5 py-12 md:px-40 text-center'>
        <p className='text-green-700 font-bold'>MY COLLECTION</p>
        <h1 className='text-4xl font-bold my-3'>All <span className='text-green-700'>Books</span></h1>
        <p className='text-gray-600'>View, search, edit and manage your personal library.</p>
      </div>

      <section className='md:px-20 p-5 my-10'>

        {/* search + filter + count */}
        <div className='md:flex justify-between items-center mb-5 gap-3'>
          <div className='md:flex gap-3 md:w-2/3'>
            <input value={searchKey} onChange={e=>setSearchKey(e.target.value)} type="text" placeholder='Search by title or author...' className='border border-gray-300 rounded p-2 w-full' />
            <select value={genreFilter} onChange={e=>setGenreFilter(e.target.value)} className='border border-gray-300 rounded p-2 w-full md:w-60 mt-3 md:mt-0'>
              <option value="">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Biography">Biography</option>
              <option value="Self Help">Self Help</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
            </select>
          </div>
          <p className='text-gray-600 mt-3 md:mt-0'>Showing <span className='font-bold'>{filteredBooks.length}</span> books</p>
        </div>

        {/* table */}
        <div className='overflow-x-auto shadow rounded'>
          <table className='w-full text-left'>
            <thead className='bg-green-700 text-white'>
              <tr>
                <th className='p-3'>Book ID</th>
                <th className='p-3'>Title</th>
                <th className='p-3'>Author</th>
                <th className='p-3'>Year</th>
                <th className='p-3'>Genre</th>
                <th className='p-3 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredBooks.length > 0 ?
                filteredBooks.map(book=>(
                  <tr key={book._id} className='border-b border-gray-100 hover:bg-green-50'>
                    <td className='p-3 text-gray-500'>{book.bookId}</td>
                    <td className='p-3 font-medium'>{book.title}</td>
                    <td className='p-3'>{book.author}</td>
                    <td className='p-3'>{book.publishedYear || "-"}</td>
                    <td className='p-3'>
                      {
                        book.genre ?
                        <span className='bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full'>{book.genre}</span>
                        :
                        "-"
                      }
                    </td>
                    <td className='p-3'>
                      <div className='flex justify-center gap-2'>
                        <Link to={`/edit-book/${book._id}`} className='bg-yellow-500 text-white px-3 py-1 rounded flex items-center hover:bg-yellow-600'><FaEdit className='me-1'/>Edit</Link>
                        <button onClick={()=>handleDelete(book._id,book.title)} className='bg-red-500 text-white px-3 py-1 rounded flex items-center hover:bg-red-600'><FaTrash className='me-1'/>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
                :
                <tr>
                  <td colSpan={6} className='p-5 text-center font-bold'>No Books Found!!!</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default BookList
