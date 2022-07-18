import { Link } from 'react-router-dom'
import Card from '../components/Card'

function AboutPage() {
  return (
    <div className='c-container'>
      <Card>
        <h1>About this project</h1>
        <p>
          This is a minimal project illustrating React & D3Js to create a
          stacked bar chart.
        </p>
        <h2>Features include:</h2>
        <ul>
          <li>Responsive graph.</li>
          <li>Quick change population value on click of bar block.</li>
          <li>Filtering sub categories on hover of legend square.</li>
        </ul>
        <h2>Disclaimers</h2>
        <ul>
          <li>
            Data does NOT persist (refresh returns original hard coded fixture)
          </li>
          <li>
            Usage of raw Javascript especially in query selector calls are not
            preferrred but for demo
          </li>
          <li>
            Known that where population of zero exists for all sub categories of
            a particular age group, that there's no quick edit feature
            available.
          </li>
          <li>Manually tested only</li>
        </ul>
        <h2>Considerations &amp; Further Reading</h2>
        <ul>
          <li>
            <a href='https://reactjs.org/docs/faq-internals.html'>
              What is React Virtual DOM
            </a>
          </li>
        </ul>
        <h2>Citations</h2>
        <ul>
          <li>
            <a href='https://www.mass.gov/doc/weekly-covid-19-vaccination-report-july-13-2022/download'>
              Massachusetts weekly covid report (Pg. 6)
            </a>
          </li>
          <li>
            <a href='https://d3-graph-gallery.com/index.html'>
              D3 Graph Gallery
            </a>
          </li>
        </ul>
        <h2 className='txt--r'>
          <a href='/'>Home</a>
        </h2>
      </Card>
    </div>
  )
}

export default AboutPage
