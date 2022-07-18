import * as d3 from 'd3'
import { useRef, useEffect, useState } from 'react'
import Legend from '../components/Legend'
import Tooltip from '../components/Tooltip'
import Swatch from '../fixtures/Swatch'
import boot from '../handlers/boot'
import BaseUtil from '../handlers/BaseUtil'

const StackedBarChart = ({
  data,
  labels,
  yLabel = 'Population',
  xLabel = 'Age group',
  diffMin = 30000
}) => {
  const util = new BaseUtil()
  const d3Chart = useRef()
  const [rowId, setRowId] = useState(0)
  const [startPopulation, setStartPopulation] = useState(0)
  const [population, setPopulation] = useState(0)
  const [chartData, setChartData] = useState(data)
  const [subCat, setSubCat] = useState()
  const subCategories = Object.keys(chartData[0]).slice(1, 5)

  const color = d3
    .scaleOrdinal()
    .domain(subCategories)
    .range([Swatch.slate, Swatch.burntOrange, Swatch.matisse, Swatch.green])

  useEffect(() => {
    window.addEventListener('resize', () => {
      redrawChart()
    })
    drawChart()
  }, [])

  const redrawChart = () => {
    d3.select(d3Chart.current).selectChildren().remove()
    drawChart()
    boot()
  }

  const handleTooltip = (e) => {
    let [startPopulation, population, id, cat] = e.target
      .getAttribute('data-val')
      .split(',')
    setStartPopulation(+startPopulation)
    setPopulation(+population)
    setRowId(Number(id))
    setSubCat(cat)
  }

  const handlePopulationChange = (e) => {
    setPopulation(+e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let item
    for (let d in chartData) {
      if (rowId === chartData[d].id) {
        item = chartData[d]
        item[subCat] = population - startPopulation
        break
      }
    }
    setChartData(
      chartData.map((_item) =>
        _item.id === item.id ? { ..._item, ...item } : _item
      )
    )
    redrawChart()
  }

  const handleKeydown = (e) => {
    if (util.isEnter(e)) {
      handleSubmit(e)
    }
  }

  const drawChart = () => {
    const $chart = d3.select('#chart')

    const isLgScreen = () => parseInt($chart.style('width')) > 1000
    const xLabelText = (l) => l + (isLgScreen() ? ' years' : '')

    const ages = chartData.map((d) => xLabelText(d.ageRange))

    const margin = { top: 20, right: 100, bottom: 90, left: 100 }

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
      .attr('class', 'c-chart__xAxis js-chart__xAxis')
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
    const axis = d3.axisLeft(y).ticks(height / 100)

    const totalPopulation = (d) => {
      let sum = 0
      for (let cat of subCategories) {
        sum += d[cat]
      }
      return sum
    }

    svg
      .append('g')
      .attr('class', 'c-chart__yAxis')
      .attr('transform', 'translate(0, 0)')
      .call(axis)

    const stackedData = d3.stack().keys(subCategories)(chartData)
    const populationData = chartData.map((d) => {
      return {
        sum: totalPopulation(d),
        ageRange: d.ageRange
      }
    })

    const $wraps = svg
      .append('g')
      .selectAll('g')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('data-bars', function (d) {
        return d.key
      })
      .attr('class', function (d) {
        return `js-legendGroup js-legendGroup--${d.key} c-chart__bars`
      })
      .attr('fill', function (d) {
        return color(d.key)
      })

    $wraps
      .selectAll('rect')
      .data(function (d) {
        return d
      })
      .enter()
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
      .attr('class', 'js-btn--tooltip')
      .attr('data-tooltip', function (d) {
        return `${d[0]}, ${d[1]}, ${d.data.id}`
      })
    if (isLgScreen()) {
      $wraps
        .selectAll('text')
        .data(function (d) {
          return d
        })
        .enter()
        .append('text')
        .text(function (d) {
          let diff = d[1] - d[0]
          return diff > diffMin ? d[1].toLocaleString() : ''
        })
        .attr('y', function (d) {
          //y(st + (ed - st) / 2)
          let diff = d[1] - d[0]
          let mid = y(d[0] + diff / 2)
          return mid
        })
        .attr('x', function (d) {
          return x(xLabelText(d.data.ageRange)) + 15
        })
      $wraps
        .selectAll('.sumtext')
        .data(populationData)
        .enter()
        .append('text')
        .text(function (d) {
          return d.sum.toLocaleString()
        })
        .attr('class', function (d) {
          return 'c-chart__total'
        })
        .attr('y', function (d) {
          return y(d.sum) - 3
        })
        .attr('text-anchor', 'middle')
        .attr('x', function (d, i) {
          let $el = document.querySelectorAll('.js-chart__xAxis .tick')[i]
          return util.getTranslateX($el)
        })
    }
  }

  return (
    <div className='c-chart' data-js-tooltip>
      <div className='c-chart__legend'>
        <svg id='legend'>
          <Legend colorScale={color} labels={labels} />
        </svg>
      </div>
      <div className='c-chart__graph' id='chart'>
        <svg ref={d3Chart}></svg>
      </div>
      <span
        className='hide js-tooltipListener'
        onClick={(e) => handleTooltip(e)}
      ></span>
      <Tooltip>
        <form onSubmit={handleSubmit}>
          <label></label>
          <input
            type='number'
            name='population'
            onChange={handlePopulationChange}
            onKeyDown={handleKeydown}
            value={population}
          />
          <input type='hidden' name='id' readOnly value={rowId} />
        </form>
      </Tooltip>
    </div>
  )
}

export default StackedBarChart
