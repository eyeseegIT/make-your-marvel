import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import MyProfile from './pages/MyProfile/MyProfile'
import * as authService from './services/authService'


//Components 
import CharacterList from './components/Characters/CharacterList'
import CharacterCard from './components/Characters/CharacterCard'

const App = () => {

  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()



  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }


  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing  user={user}/>} />
        <Route

          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <MyProfile user={user}/> : <Navigate to="/login" />}
        />
      <Route
          path="/charactersearch"
          element={user ? <CharacterList /> : <Navigate to="/login" />}
        />
      <Route
          path="/character/:id"
          element={user ? <CharacterCard /> : <Navigate to="/login" />}
        />  
      </Routes>
    </>
  )
}

export default App
