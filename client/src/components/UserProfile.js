import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap'

const UserProfile = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const [userData, setUserData ] = useState('')
  const [ error, setError ] = useState('')

  useEffect(() => {
    const getData = async() => {
      try {
        const token = localStorage.getItem('recipes')
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null

        const { data } = await axios.get('api/recipes/')
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    getData()
  }, [])
  return <h1>User Profile Page</h1>
}

export default UserProfile