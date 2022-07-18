import { Link } from 'react-router-dom'
import AppContext from '../context/AppContext'
import StackedChart from '../charts/StackedChart'
import { useContext } from 'react'
import Card from '../components/Card'

function CovidChart() {
  const { data, labels } = useContext(AppContext)
  return (
    <div className='c-container'>
      <Card>
        <h1>Individuals who have Received Booster Doses</h1>
        <span>
          <small>Data as of July 11, 2022</small>
        </span>
        <p>
          In Massachusetts, 58% of those fully vaccinated have received a
          booster dose, compared with 48% of the national population that is
          fully vaccinated.
        </p>
        <StackedChart
          data={data}
          labels={labels}
          subCatStart={1}
          subCatEnd={5}
        />
        <h2 className='txt--r'>
          <Link to='/about'>About ?</Link>
        </h2>
      </Card>
    </div>
  )
}

export default CovidChart
