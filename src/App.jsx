import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IntroPage from './pages/User/intro/IntroPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <IntroPage/>
    </>
  )
}

export default App
