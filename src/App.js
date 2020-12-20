import React, { useState, useEffect } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Header from './Components/Header.jsx'
import MantrasAmount from './Components/MantrasAmount.jsx'
import MantrasForm from './Components/MantrasForm.jsx'
// import MantrasHistory from './Components/MantrasHistory.jsx'
import './styles/App.css'
import MantrasIntro from './Components/MantrasIntro.jsx'
import Footer from './Components/Footer.jsx'
import Loader from './Components/Loader.jsx'

function App() {
  const [data, setData] = useState([])
  const [allMantras, setAllMantras] = useState({})
  const [showConfetti, setShowConfetti] = useState(false)
  const [inputData, setinputData] = useState({ name: '', mantras_count: '' })
  const [mode, setMode] = useState()

  useEffect(() => {
    async function loadData() {
      try {
        let mantrasAmount = { mantras_count: 0 }
        let sortedData = []
        const response = await fetch(process.env.REACT_APP_AWS_DYNAMODB_URI)
        const resJson = await response.json()
        if (resJson.length) {
          mantrasAmount = resJson.reduce((a, b) => ({
            mantras_count: a.mantras_count + b.mantras_count
          }))
          sortedData = resJson.sort(function (a, b) {
            return new Date(b.date_created) - new Date(a.date_created)
          })
        }
        setData(sortedData)
        setAllMantras(mantrasAmount)
      } catch (err) {
        console.error('Error fetching:', err)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)')
    function setThemeMode(e) {
      if (e.matches) {
        setMode('Dark')
      } else {
        setMode('Light')
      }
    }
    darkMode.addListener(setThemeMode)
  }, [mode])

  const handleChange = event => {
    setinputData({
      ...inputData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!inputData.name) inputData.name = 'Friend'
    if (inputData.mantras_count === '') {
      alert('Please add mantras.')
      return
    }
    data.unshift({
      ...inputData,
      date_created: new Date().toISOString()
    })
    setData(data)
    setAllMantras({
      mantras_count:
        allMantras.mantras_count + parseInt(inputData.mantras_count)
    })

    fetch(process.env.REACT_APP_AWS_DYNAMODB_URI, {
      method: 'POST',
      body: JSON.stringify(inputData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(err => console.log('Error:', err))

    setinputData({ name: '', mantras_count: '' })
  }

  useEffect(() => {
    if (
      (allMantras.mantras_count >= 1000000 &&
        allMantras.mantras_count <= 1001000) ||
      (allMantras.mantras_count >= 2000000 &&
        allMantras.mantras_count <= 2001000) ||
      (allMantras.mantras_count >= 3000000 &&
        allMantras.mantras_count <= 3001000) ||
      (allMantras.mantras_count >= 4000000 &&
        allMantras.mantras_count <= 4001000) ||
      (allMantras.mantras_count >= 5000000 &&
        allMantras.mantras_count <= 5001000) ||
      (allMantras.mantras_count >= 6000000 &&
        allMantras.mantras_count <= 6001000) ||
      (allMantras.mantras_count >= 7000000 &&
        allMantras.mantras_count <= 7001000) ||
      (allMantras.mantras_count >= 8000000 &&
        allMantras.mantras_count <= 8001000) ||
      (allMantras.mantras_count >= 9000000 &&
        allMantras.mantras_count <= 9001000) ||
      (allMantras.mantras_count >= 10000000 &&
        allMantras.mantras_count <= 10001000) ||
      (allMantras.mantras_count >= 11000000 &&
        allMantras.mantras_count <= 11005000)
    ) {
      setShowConfetti(true)
    }
    return () => {
      setShowConfetti(false)
    }
  }, [allMantras.mantras_count])

  const { width, height } = useWindowSize()

  return (
    <div
      className="App"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Header />
      <MantrasIntro />
      {data && allMantras.mantras_count >= 0 ? (
        <>
          <Confetti
            width={width}
            height={height}
            recycle={false}
            run={showConfetti}
            numberOfPieces={1500}
          />
          <MantrasAmount allMantras={allMantras} />
          <MantrasForm
            inputData={inputData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          {/* <MantrasHistory data={data} /> */}
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default App
