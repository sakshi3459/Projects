import { useEffect, useState, useRef } from 'react'
import './CandleBlowing.css'

interface CandleBlowingProps {
  onAllCandlesBlown: () => void
  onFirstCandle?: () => void
}

const CandleBlowing = ({ onAllCandlesBlown, onFirstCandle }: CandleBlowingProps) => {
  const [candlesLit, setCandlesLit] = useState(Array(3).fill(true))
  const [isListening, setIsListening] = useState(false)
  const [_micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt')
  const [_audioLevel, setAudioLevel] = useState(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const micStreamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    // Don't auto-start microphone - too sensitive and picks up background noise
    // Users can just click the candles instead

    return () => {
      console.log('🛑 Component unmounting, stopping listening')
      stopListening()
    }
  }, [])

  useEffect(() => {
    // Restart detection if listening state changes
    if (isListening && analyserRef.current && candlesLit.some(lit => lit)) {
      console.log('🔄 Restarting detection loop...')
      detectBlow()
    }
  }, [isListening])

  useEffect(() => {
    if (candlesLit.every(lit => !lit)) {
      onAllCandlesBlown()
    }
  }, [candlesLit, onAllCandlesBlown])

  // @ts-ignore - Keeping for potential future use
  const _startListening = async () => {
    try {
      console.log('🎤 Requesting microphone access...')
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      })
      micStreamRef.current = stream
      setMicPermission('granted')
      console.log('✅ Microphone access granted!')

      // Log stream details
      const audioTracks = stream.getAudioTracks()
      console.log('Audio tracks:', audioTracks.length)
      if (audioTracks.length > 0) {
        console.log('Track settings:', audioTracks[0].getSettings())
        console.log('Track enabled:', audioTracks[0].enabled)
        console.log('Track muted:', audioTracks[0].muted)
      }

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      audioContextRef.current = audioContext
      console.log('🔊 Audio context created')
      console.log('  State:', audioContext.state)
      console.log('  Sample rate:', audioContext.sampleRate)

      // Resume audio context if suspended
      if (audioContext.state === 'suspended') {
        console.log('⏸️ Audio context suspended, resuming...')
        await audioContext.resume()
        console.log('▶️ Audio context resumed, state:', audioContext.state)
      }

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 512
      analyser.smoothingTimeConstant = 0.3 // Less smoothing for more responsive detection
      analyserRef.current = analyser

      const microphone = audioContext.createMediaStreamSource(stream)
      microphone.connect(analyser)
      console.log('🎙️ Microphone connected to analyser')

      setIsListening(true)
      console.log('👂 Starting to listen for blowing...')
      detectBlow()
    } catch (error) {
      console.error('❌ Error accessing microphone:', error)
      setMicPermission('denied')
      alert('Microphone access denied. Please click the candles to blow them out!')
    }
  }

  const detectBlow = () => {
    if (!analyserRef.current) {
      console.error('❌ Analyser not available')
      return
    }

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    let lastBlowTime = 0
    const blowCooldown = 600 // 600ms between blows
    let frameCount = 0
    let recentLevels: number[] = [] // Track recent levels to detect sustained sound

    const checkBlowing = () => {
      if (!analyserRef.current || !isListening) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        return
      }

      // Get frequency data
      analyserRef.current.getByteFrequencyData(dataArray)

      // Focus on very low frequencies for blowing (0-200 Hz range)
      // Blowing creates broadband noise in low frequencies
      const veryLowFreqEnd = Math.floor(bufferLength / 8) // First 1/8 of spectrum
      const veryLowFreqData = dataArray.slice(0, veryLowFreqEnd)
      const veryLowFreqAverage = veryLowFreqData.reduce((a, b) => a + b) / veryLowFreqData.length

      // Mid frequencies (voice and claps have more energy here)
      const midFreqStart = Math.floor(bufferLength / 8)
      const midFreqEnd = Math.floor(bufferLength / 3)
      const midFreqData = dataArray.slice(midFreqStart, midFreqEnd)
      const midFreqAverage = midFreqData.reduce((a, b) => a + b) / midFreqData.length

      // Calculate the ratio - blowing should have higher low freq compared to mid freq
      const lowToMidRatio = veryLowFreqAverage / (midFreqAverage + 1) // +1 to avoid division by zero

      // Track sustained sound (blowing is sustained, claps are transient)
      recentLevels.push(veryLowFreqAverage)
      if (recentLevels.length > 10) {
        recentLevels.shift()
      }
      const isSustained = recentLevels.length >= 5 &&
                          Math.min(...recentLevels) > 5 // All recent levels above threshold

      // Update visual audio level
      setAudioLevel(Math.round(veryLowFreqAverage))

      // Log every 30 frames (roughly once per second)
      frameCount++
      if (frameCount % 30 === 0) {
        console.log('🎵 VeryLow:', veryLowFreqAverage.toFixed(2),
                    'Mid:', midFreqAverage.toFixed(2),
                    'Ratio:', lowToMidRatio.toFixed(2),
                    'Sustained:', isSustained)
      }

      // Detect blowing:
      // - Must have energy in very low frequencies (> 8)
      // - Should be sustained (not a quick transient)
      // - Preferably higher in low freq than mid freq
      const now = Date.now()
      const isBlowing = veryLowFreqAverage > 8 && isSustained && lowToMidRatio > 0.5

      if (isBlowing && now - lastBlowTime > blowCooldown) {
        console.log('🎉 BLOW DETECTED! VeryLow:', veryLowFreqAverage.toFixed(2), 'Ratio:', lowToMidRatio.toFixed(2))
        blowOutCandle()
        lastBlowTime = now
        recentLevels = [] // Reset after detection
      }

      // Continue checking if there are still lit candles
      setCandlesLit(current => {
        if (current.some(lit => lit)) {
          animationFrameRef.current = requestAnimationFrame(checkBlowing)
        }
        return current
      })
    }

    checkBlowing()
  }

  const blowOutCandle = () => {
    setCandlesLit(prev => {
      const litIndex = prev.findIndex(lit => lit)
      if (litIndex !== -1) {
        const newState = [...prev]
        newState[litIndex] = false
        return newState
      }
      return prev
    })
  }

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop())
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }
    setIsListening(false)
  }

  const handleClickBlow = () => {
    // Check if this is the first candle being blown
    const isFirstCandle = candlesLit.every(lit => lit)

    blowOutCandle()

    // Start happy birthday music on first candle click
    if (isFirstCandle && onFirstCandle) {
      onFirstCandle()
    }
  }

  // @ts-ignore - Keeping for potential future use
  const _handleTestMic = async () => {
    console.log('🧪 Testing microphone...')
    if (audioContextRef.current) {
      console.log('Audio context state:', audioContextRef.current.state)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
        console.log('Audio context resumed to:', audioContextRef.current.state)
      }
    }
    if (micStreamRef.current) {
      const tracks = micStreamRef.current.getAudioTracks()
      console.log('Audio tracks:', tracks.length, 'enabled:', tracks[0]?.enabled)
    }
    console.log('Analyser exists:', !!analyserRef.current)
    console.log('Is listening:', isListening)
  }

  return (
    <div className="candle-blowing-container">
      <div className="cake-display">
        <div className="cake-emoji">🎂</div>
        <div className="candles-grid">
          {candlesLit.map((lit, index) => (
            <span
              key={index}
              className={`candle-flame ${lit ? 'lit' : 'out'}`}
              onClick={handleClickBlow}
              style={{ cursor: 'pointer' }}
            >
              {lit ? '🕯️' : '💨'}
            </span>
          ))}
        </div>
      </div>

      {candlesLit.some(lit => lit) && (
        <p className="blow-instruction">
          💨 Click the candles to blow them out!
        </p>
      )}

      {!candlesLit.some(lit => lit) && (
        <div className="celebration-message">
          <h3>🎉 You blew them all out! Make a wish! 🎉</h3>
        </div>
      )}
    </div>
  )
}

export default CandleBlowing
