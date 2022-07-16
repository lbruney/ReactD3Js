import './App.css'
import { AppProvider } from './context/AppContext'
import CovidChartPage from './pages/CovidChartPage'

function App() {
  return (
    <AppProvider>
      <CovidChartPage />
    </AppProvider>
  )
}

export default App
