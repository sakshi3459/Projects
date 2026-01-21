import { useState, useRef } from 'react'
import { getVillagerImage, getVillagerColor } from './utils/villagerImages'
import { getRandomBirthdayMessage } from './data/birthdayMessages'
import Confetti from './components/Confetti'
import Balloons from './components/Balloons'
import CandleBlowing from './components/CandleBlowing'
import BackgroundMusic, { BackgroundMusicHandle } from './components/BackgroundMusic'
import TypingText from './components/TypingText'
import FarmAnimals from './components/FarmAnimals'
import './App.css'

function App() {
  const [showCelebration, setShowCelebration] = useState<boolean>(false)
  const [birthdayMessage, setBirthdayMessage] = useState<string>('')
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false)

  const musicRef = useRef<BackgroundMusicHandle>(null)

  const parseVillagerMessage = (message: string) => {
    // Extract villager name and their message
    const match = message.match(/^(.+?):\s*'(.+)'$/)
    if (match) {
      const [, villagerWithEmoji, quote] = match
      const villagerName = villagerWithEmoji.replace(/[^\w\s]/g, '').trim()
      const emoji = villagerWithEmoji.match(/[\u{1F300}-\u{1F9FF}]/u)?.[0] || '💬'
      return { villagerName, emoji, quote }
    }
    return { villagerName: 'Villager', emoji: '💬', quote: message }
  }

  const fetchBirthdayMessage = () => {
    const newMessage = getRandomBirthdayMessage()
    setBirthdayMessage(newMessage)
  }

  const handleCelebrate = async () => {
    setShowCelebration(true)
    setShowConfetti(true)

    // Don't fetch message yet - wait for candles to be blown and button to be clicked

    setTimeout(() => setShowConfetti(false), 5000)
  }

  const handleNewMessage = () => {
    setShowConfetti(true)

    // Start playing background music and change to next track
    if (musicRef.current) {
      musicRef.current.play()
      musicRef.current.nextTrack()
    }

    fetchBirthdayMessage()
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const handleFirstCandle = () => {
    // Play happy birthday song when first candle is clicked
    if (musicRef.current) {
      musicRef.current.play()
    }
  }

  const handleAllCandlesBlown = () => {
    setCandlesBlown(true)
    setShowConfetti(true)

    setTimeout(() => setShowConfetti(false), 5000)
  }

  const handleShowWishes = () => {
    // Switch to track 2 and fetch first villager message
    if (musicRef.current) {
      musicRef.current.nextTrack()
    }
    fetchBirthdayMessage()
  }

  const handleReset = () => {
    setShowCelebration(false)
    setBirthdayMessage('')
    setCandlesBlown(false)
  }

  const { villagerName, emoji, quote } = birthdayMessage ? parseVillagerMessage(birthdayMessage) : { villagerName: '', emoji: '', quote: '' }
  const villagerImage = villagerName ? getVillagerImage(villagerName) : ''
  const villagerColor = villagerName ? getVillagerColor(villagerName) : '#DAA520'

  return (
    <div className="App">
      {showConfetti && <Confetti />}
      <Balloons />
      <BackgroundMusic ref={musicRef} />
      <FarmAnimals />


      {/* Stardew Valley Farm Decorations */}
      <div className="theme-decorations">
        <span className="decoration western">🌻</span>
        <span className="decoration gaming">🌾</span>
        <span className="decoration office">🐔</span>
        <span className="decoration farm">🥕</span>
        <span className="decoration snacks">🍓</span>
        <span className="farm-extra farm-chicken">🐓</span>
        <span className="farm-extra farm-star" style={{top: '12%', right: '25%'}}>⭐</span>
        <span className="farm-extra farm-star" style={{top: '18%', left: '15%'}}>⭐</span>
        <span className="farm-extra" style={{bottom: '30%', right: '8%', animation: 'float-decoration 12s ease-in-out infinite'}}>🌱</span>
        <span className="farm-extra" style={{top: '40%', right: '5%', animation: 'float-decoration 15s ease-in-out infinite'}}>🍄</span>
      </div>

      {!showCelebration ? (
        <div className="welcome-screen">
          <div className="pixel-corner top-left"></div>
          <div className="pixel-corner top-right"></div>
          <div className="pixel-corner bottom-left"></div>
          <div className="pixel-corner bottom-right"></div>

          <h1 className="main-title">
            <div>Happy birthday</div>
            <div>🎂 Jay 🎂</div>
          </h1>
          <p className="subtitle">Welcome to 8th Lok Farm! 🌾</p>
          <div className="subtitle-extra">
            The whole village is celebrating your special day!
          </div>

          <div className="input-section">
            <button
              className="celebrate-btn"
              onClick={handleCelebrate}
            >
              🎉 Join the Festival! 🎉
            </button>
          </div>
        </div>
      ) : (
        <div className="celebration-screen">
          <div className="pixel-corner top-left"></div>
          <div className="pixel-corner top-right"></div>
          <div className="pixel-corner bottom-left"></div>
          <div className="pixel-corner bottom-right"></div>

          <h1 className="celebration-title">
            <div>Happy birthday</div>
            <div>🎂 Jay 🎂</div>
          </h1>

          <CandleBlowing
            onAllCandlesBlown={handleAllCandlesBlown}
            onFirstCandle={handleFirstCandle}
          />

          {candlesBlown && !birthdayMessage && (
            <button
              className="show-wishes-btn"
              onClick={handleShowWishes}
            >
              🎁 The whole town showed up! 🎉
            </button>
          )}

          {candlesBlown && birthdayMessage && (
            <div className="villager-message-container">
              {/* Villager Header */}
              <div
                className="villager-header"
                style={{
                  background: `linear-gradient(180deg, ${villagerColor} 0%, ${villagerColor}dd 100%)`
                }}
              >
                <div className="villager-portrait">
                  <img
                    src={villagerImage}
                    alt={villagerName}
                    className="portrait-image"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      e.currentTarget.style.display = 'none'
                      const parent = e.currentTarget.parentElement
                      if (parent) {
                        parent.innerHTML = `<span class="portrait-emoji">${emoji}</span>`
                      }
                    }}
                  />
                </div>
                <div className="villager-info">
                  <h3 className="villager-name">{villagerName}</h3>
                  <div className="friendship-hearts">
                    <span className="heart filled">❤️</span>
                    <span className="heart filled">❤️</span>
                    <span className="heart filled">❤️</span>
                    <span className="heart filled">❤️</span>
                    <span className="heart filled">❤️</span>
                  </div>
                </div>
              </div>

              {/* Message Box */}
              <div className="birthday-message villager-dialogue">
                <div className="dialogue-arrow"></div>
                <p>
                  <TypingText
                    text={quote}
                    speed={30}
                  />
                </p>
              </div>
            </div>
          )}

          {candlesBlown && (
            <button
              className="new-message-btn"
              onClick={handleNewMessage}
            >
              ✨ Talk to Another Villager ✨
            </button>
          )}

          <button className="reset-btn" onClick={handleReset}>
            🔄 Start Over
          </button>
        </div>
      )}
    </div>
  )
}

export default App
