import './App.css'
import { useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import CovidChartPage from './pages/CovidChartPage'
import boot from './handlers/boot'

function App() {
  useEffect(() => {
    boot()
  }, [])

  return (
    <AppProvider>
      <CovidChartPage />
    </AppProvider>
  )
}

export default App
