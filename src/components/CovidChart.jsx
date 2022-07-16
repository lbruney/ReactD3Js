import React from 'react'

import AppContext from '../context/AppContext'
import StackedChart from '../charts/StackedChart'
import { useContext } from 'react'
import Card from './Card'

function CovidChart() {
  const { data } = useContext(AppContext)
  return (
    <div className='c-container'>
      <Card>
        <StackedChart data={data} />
      </Card>
    </div>
  )
}

export default CovidChart
