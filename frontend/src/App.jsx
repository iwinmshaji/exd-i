import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import BookList from './pages/BookList'
import AddBook from './pages/AddBooks'
import EditBook from './pages/EditBook'

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<BookList/>}/>
        <Route path='/add-book' element={<AddBook/>}/>
        <Route path='/edit-book/:id' element={<EditBook/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App