import './App.css'
import StackedBarChart from './charts/StackedChart'
import { AppProvider } from './context/AppContext'
import CovidChart from './components/CovidChart'

function App() {
  return (
    <AppProvider>
      <CovidChart />
    </AppProvider>
  )
}

export default App
