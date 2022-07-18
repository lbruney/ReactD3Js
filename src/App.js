import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import CovidChartPage from './pages/CovidChartPage'
import AboutPage from './pages/AboutPage'
import boot from './handlers/boot'

function App() {
  useEffect(() => {
    boot()
  }, [])

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<CovidChartPage />} />
          <Route exact path='/about' element={<AboutPage />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
