import React from 'react'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaPlus } from 'react-icons/fa'

function Header() {
  return (
    <>
      <div className='flex justify-between items-center p-5 md:px-20'>
        <div className='flex items-center text-green-700'>
          <FaBookOpen className='text-4xl'/>
          <h1 className='text-2xl font-bold ms-3'>BOOK MANAGER</h1>
        </div>
        <Link to={'/add-book'} className='bg-green-700 text-white px-4 py-2 rounded flex items-center hover:bg-green-800'><FaPlus className='me-2'/>Add Book</Link>
      </div>
      <nav className='bg-green-700 w-full p-3 text-white flex justify-center'>
        <Link to={'/'} className='mx-4'>ALL BOOKS</Link>
        <Link to={'/add-book'} className='mx-4'>ADD BOOK</Link>
      </nav>
    </>
  )
}

export default Header
