import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IntroPage from './pages/User/intro/IntroPage'
import TetLoginPage from './pages/User/auth/TetLoginPage'
import TetAuthPage from './pages/User/auth/TetAuthPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <IntroPage/> */}
    {/* <TetLoginPage/> */}
    <TetAuthPage/>
    </>
  )
}

export default App
