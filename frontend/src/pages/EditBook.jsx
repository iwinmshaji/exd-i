import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaArrowLeft } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import { getBookAPI, updateBookAPI } from '../services/allAPI'

function EditBook() {

  const {id} = useParams()           // the :id from the URL  /edit-book/:id
  const navigate = useNavigate()

  // form data (filled from the backend when the page opens)
  const [bookDetails,setBookDetails] = useState({
    title:"",
    author:"",
    bookId:"",
    publishedYear:"",
    genre:""
  })

  // READ ONE : get this book and fill the form
  const getBook = async()=>{
    const result = await getBookAPI(id)
    if(result.status==200){
      const {title,author,bookId,publishedYear,genre} = result.data
      setBookDetails({title,author,bookId,publishedYear:publishedYear || "",genre:genre || ""})
    }else{
      toast.error("Book not Found!!!")
    }
  }

  useEffect(()=>{
    getBook()
  },[])

  // UPDATE : Save Changes button
  const handleUpdate = async()=>{
    const {title,author,bookId} = bookDetails
    if(!title || !author || !bookId){
      toast.warning("Please fill Title, Author and Book ID!!!")
    }else{
      const result = await updateBookAPI(id,bookDetails)
      if(result.status==200){
        toast.success("Book Updated Successfully!!!")
        setTimeout(()=>{
          navigate('/')
        },1500)
      }else{
        toast.error(result?.response?.data || "Something Went Wrong!!!")
      }
    }
  }

  return (
    <>
      {/* hero */}
      <div className='bg-green-50 p-5 py-12 md:px-40 text-center'>
        <p className='text-green-700 font-bold'>EDIT BOOK</p>
        <h1 className='text-4xl font-bold my-3'>Update <span className='text-green-700'>Book Details</span></h1>
        <p className='text-gray-600'>Change the details and save.</p>
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
              <button onClick={getBook} className='bg-gray-200 px-4 py-2 rounded hover:bg-gray-300'>Undo Changes</button>
              <button onClick={handleUpdate} className='bg-yellow-500 text-white px-4 py-2 rounded flex items-center hover:bg-yellow-600'><FaSave className='me-2'/>Save Changes</button>
            </div>
          </div>

        </div>
      </section>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default EditBook
