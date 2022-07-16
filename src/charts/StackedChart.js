import * as d3 from 'd3'
import { useRef, useEffect, useState } from 'react'
import Swatch from '../fixtures/Swatch'

const StackedBarChart = ({
  data,
  yLabel = 'Population',
  xLabel = 'Age group'
}) => {
  const d3Chart = useRef()
  const [chartData, setChartData] = useState(data)

  useEffect(() => {
    drawChart()
  }, [])

  const drawChart = () => {
    const xLabelText = (l) => l + ' years'

    const ages = chartData.map((d) => xLabelText(d.ageRange))
    const vaxCategories = Object.keys(chartData[0]).slice(0, 3)

    const margin = { top: 20, right: 100, bottom: 90, left: 100 }
    const $chart = d3.select('#chart')
    const width = parseInt($chart.style('width')) - margin.left - margin.right
    const height = parseInt($chart.style('height')) - margin.top - margin.bottom

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

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.top * 2)
      .attr('text-anchor', 'middle')
      .text(xLabel)

    svg
      .append('text')
      .attr('x', (height / 2) * -1)
      .attr('y', -70)
      .attr('transform', 'rotate(-90)')
      .text(yLabel)

    const y = d3.scaleLinear().domain([0, 1000000]).range([height, 0])
    svg
      .append('g')
      .attr('class', 'c-chart__yAxis')
      .attr('transform', 'translate(0, 0)')
      .call(d3.axisLeft(y))

    const color = d3
      .scaleOrdinal()
      .domain(vaxCategories)
      .range([Swatch.slate, Swatch.burntOrange, Swatch.matisse])

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
        return 'c-chart__bar c-chart__' + d.key
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
      .append('g')
      .attr('class', 'c-chart__barWrap')
      .append('rect')
      .attr('x', function (d) {
        return x(xLabelText(d.data.ageRange))
      })
      .attr('y', function (d) {
        return y(d[1])
      })
      .attr('height', function (d) {
        return y(d[0]) - y(d[1])
      })
      .attr('width', x.bandwidth())

      .append('text')
      .text(function (d) {
        return d[1]
      })
      .attr('y', function (d) {
        let pos = y(d[1])
        return pos + pos / 4
      })
      .attr('x', function (d) {
        return x(xLabelText(d.data.ageRange))
      })
  }

  return (
    <div className='c-chart' id='chart'>
      <svg ref={d3Chart}></svg>
    </div>
  )
}

export default StackedBarChart
