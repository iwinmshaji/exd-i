import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSave, FaArrowLeft } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import { addBookAPI } from '../services/allAPI'

function AddBooks() {

  const navigate = useNavigate()     // to go to another page from code

  // form data
  const [bookDetails,setBookDetails] = useState({
    title:"",
    author:"",
    bookId:"",
    publishedYear:"",
    genre:""
  })

  // CREATE : Add Book button
  const handleAdd = async()=>{
    const {title,author,bookId} = bookDetails
    if(!title || !author || !bookId){
      toast.warning("Please fill Title, Author and Book ID!!!")
    }else{
      const result = await addBookAPI(bookDetails)
      if(result.status==201){
        toast.success("Book Added Successfully!!!")
        handleReset()
        setTimeout(()=>{
          navigate('/')            // go back to the book list
        },1500)
      }else{
        // shows the backend message, eg: "Book ID already exists!!!"
        toast.error(result?.response?.data || "Something Went Wrong!!!")
      }
    }
  }

  // Reset button
  const handleReset = ()=>{
    setBookDetails({title:"",author:"",bookId:"",publishedYear:"",genre:""})
  }

  return (
    <>
      {/* hero */}
      <div className='bg-green-50 p-5 py-12 md:px-40 text-center'>
        <p className='text-green-700 font-bold'>NEW BOOK</p>
        <h1 className='text-4xl font-bold my-3'>Add a <span className='text-green-700'>Book</span></h1>
        <p className='text-gray-600'>Fill in the details to add a book to your collection.</p>
      </div>

      {/* form card */}
      <section className='p-5 my-10 flex justify-center'>
        <div className='w-full max-w-2xl shadow rounded p-8'>

          <div className='md:grid grid-cols-2 gap-5'>

            {/* title */}
            <div className='mb-5 md:mb-0'>
              <label className='text-sm font-medium'>Title <span className='text-red-500'>*</span></label>
              <input value={bookDetails.title} onChange={e=>setBookDetails({...bookDetails,title:e.target.value})} type="text" placeholder='eg: Atomic Habits' className='w-full p-2 rounded border border-green-200 mt-1' />
            </div>

            {/* author */}
            <div className='mb-5 md:mb-0'>
              <label className='text-sm font-medium'>Author <span className='text-red-500'>*</span></label>
              <input value={bookDetails.author} onChange={e=>setBookDetails({...bookDetails,author:e.target.value})} type="text" placeholder='eg: James Clear' className='w-full p-2 rounded border border-green-200 mt-1' />
            </div>

            {/* book id */}
            <div className='mb-5 md:mb-0'>
              <label className='text-sm font-medium'>Book ID <span className='text-red-500'>*</span></label>
              <input value={bookDetails.bookId} onChange={e=>setBookDetails({...bookDetails,bookId:e.target.value})} type="text" placeholder='eg: B101' className='w-full p-2 rounded border border-green-200 mt-1' />
            </div>

            {/* published year */}
            <div className='mb-5 md:mb-0'>
              <label className='text-sm font-medium'>Published Year</label>
              <input value={bookDetails.publishedYear} onChange={e=>setBookDetails({...bookDetails,publishedYear:e.target.value})} type="number" placeholder='eg: 2018' className='w-full p-2 rounded border border-green-200 mt-1' />
            </div>

            {/* genre */}
            <div className='col-span-2'>
              <label className='text-sm font-medium'>Genre</label>
              <select value={bookDetails.genre} onChange={e=>setBookDetails({...bookDetails,genre:e.target.value})} className='w-full p-2 rounded border border-green-200 mt-1'>
                <option value="">Select Genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Biography">Biography</option>
                <option value="Self Help">Self Help</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
              </select>
            </div>

          </div>

          <p className='text-xs text-gray-500 mt-3'><span className='text-red-500'>*</span> Required fields</p>

          {/* buttons */}
          <div className='flex justify-between items-center mt-8'>
            <Link to={'/'} className='text-green-700 flex items-center hover:underline'><FaArrowLeft className='me-2'/>Back to Books</Link>
            <div className='flex gap-2'>
              <button onClick={handleReset} className='bg-gray-200 px-4 py-2 rounded hover:bg-gray-300'>Reset</button>
              <button onClick={handleAdd} className='bg-green-700 text-white px-4 py-2 rounded flex items-center hover:bg-green-800'><FaSave className='me-2'/>Add Book</button>
            </div>
          </div>

        </div>
      </section>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default AddBooks
