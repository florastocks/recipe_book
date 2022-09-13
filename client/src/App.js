import Footer from './components/Footer'
import Landing from './components/Landing'
import Header from './components/Header'
import AllRecipes from './components/AllRecipes'
import AddRecipe from './components/AddRecipe'
import AddReview from './components/AddReview'
import Login from './components/Login'
import Register from './components/Register'
import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const App = () => {
  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get('/api/recipes/') // * <-- replace with your endpoint
  //     console.log(data)
  //   }
  //   getData()
  // })

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/allrecipes' element={<AllRecipes />} />
          <Route path='/add-recipe' element={<AddRecipe />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
