import React from 'react'
import { FaBookOpen, FaEnvelope, FaFacebookF, FaInstagram } from 'react-icons/fa'

function Footer() {
  return (
    <>
      <div className='md:grid grid-cols-3 md:gap-10 bg-gray-900 text-white p-10'>
        <div>
          <h4 className='font-bold flex items-center'><FaBookOpen className='me-2'/>BOOK MANAGER</h4>
          <p className='mt-5 text-gray-300'>Keep track of your personal book collection. Add, edit, search and organize your books in one place.</p>
        </div>
        <div className='mt-5 md:mt-0'>
          <h4 className='font-bold'>QUICK LINKS</h4>
          <p className='mt-5 text-gray-300'>All Books</p>
          <p className='mt-2 text-gray-300'>Add Book</p>
        </div>
        <div className='mt-5 md:mt-0'>
          <h4 className='font-bold'>FOLLOW US</h4>
          <div className='flex gap-5 mt-5 text-xl'>
            <FaFacebookF/>
            <FaInstagram/>
            <FaEnvelope/>
          </div>
        </div>
      </div>
      <p className='bg-gray-900 p-3 text-gray-400 text-center border-t border-gray-700'>Copyright © 2026 All rights reserved | Book Manager</p>
    </>
  )
}

export default Footer