import * as d3 from 'd3'
import { useRef, useEffect, useState } from 'react'

const StackedBarChart = ({ data }) => {
  const d3Chart = useRef()
  const [chartData, setChartData] = useState(data)

  useEffect(() => {
    drawChart()
  }, [])

  const drawChart = () => {
    const ages = [
      '0-4',
      '5-11',
      '12-15',
      '16-19',
      '20-29',
      '30-39',
      '40-49',
      '50-59',
      '60-64',
      '65-69',
      '70-74',
      '75+'
    ]
    const vaxCategories = ['fullyVaxed', 'oneBooster', 'twoBooster']

    const margin = { top: 20, right: 100, bottom: 30, left: 100 }
    const width = 800 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const svg = d3
      .select(d3Chart.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    const x = d3.scaleBand().domain(ages).range([0, width]).padding([0.3])
    svg
      .append('g')
      .attr('class', 'c-chart__xAxis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickSizeOuter(0))

    const y = d3.scaleLinear().domain([0, 900000]).range([height, 0])
    svg
      .append('g')
      .attr('class', 'c-chart__yAxis')
      .attr('transform', 'translate(0, 0)')
      .call(d3.axisLeft(y))

    const color = d3
      .scaleOrdinal()
      .domain(vaxCategories)
      .range(['#e41a1c', '#377eb8', '#4daf4a'])

    //  stack per subgroup
    const stackedData = d3.stack().keys(vaxCategories)(chartData)

    svg
      .append('g')
      .selectAll('g')
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .enter()
      .append('g')
      .attr('class', function (d) {
        return 'c-chart__' + d.key
      })
      .attr('fill', function (d) {
        return color(d.key)
      })
      .selectAll('rect')
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function (d) {
        return d
      })
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return x(d.data.ageRange)
      })
      .attr('y', function (d) {
        return y(d[1])
      })
      .attr('height', function (d) {
        return y(d[0]) - y(d[1])
      })
      .attr('width', x.bandwidth())
  }

  return (
    <div className='c-chart' id='chart'>
      <svg ref={d3Chart}></svg>
    </div>
  )
}

export default StackedBarChart
