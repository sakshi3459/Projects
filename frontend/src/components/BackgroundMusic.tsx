import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react'
import './BackgroundMusic.css'

export interface BackgroundMusicHandle {
  play: () => void
  nextTrack: () => void
}

const musicTracks = [
  '/music/track1.mp3',
  '/music/track2.mp3',
  '/music/track3.mp3',
  '/music/track4.mp3',
  '/music/track5.mp3',
  '/music/track6.mp3',
  '/music/track7.mp3',
]

const BackgroundMusic = forwardRef<BackgroundMusicHandle>((_props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.2)
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Set initial volume when audio element is ready
    if (audioRef.current) {
      audioRef.current.volume = volume
      console.log('Audio element initialized')
    }
  }, [])

  const handleTrackEnded = () => {
    // Move to next track when current one ends
    // If we're at track 6 (index 5), go back to track 2 (index 1), skip track 1 (happy birthday)
    let nextTrack = currentTrack + 1
    if (nextTrack >= musicTracks.length) {
      nextTrack = 1 // Go to track 2, not track 1
    }
    setCurrentTrack(nextTrack)
    if (audioRef.current && isPlaying) {
      audioRef.current.load()
      audioRef.current.play().catch(err => {
        console.error('Error playing next track:', err)
      })
    }
  }

  useImperativeHandle(ref, () => ({
    play: () => {
      console.log('Play method called from parent')
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            console.log('Music started playing')
            setIsPlaying(true)
          })
          .catch(err => {
            console.error('Error playing audio:', err)
          })
      }
    },
    nextTrack: () => {
      console.log('Next track method called')
      const nextTrackIndex = (currentTrack + 1) % musicTracks.length
      setCurrentTrack(nextTrackIndex)
      if (audioRef.current && isPlaying) {
        audioRef.current.load()
        audioRef.current.play().catch(err => {
          console.error('Error playing next track:', err)
        })
      }
    }
  }), [currentTrack, isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    console.log('Toggle play clicked, isPlaying:', isPlaying)
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        console.log('Music paused')
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
            console.log('Music started')
          })
          .catch(err => {
            console.error('Error playing audio:', err)
          })
      }
    } else {
      console.error('Audio ref is null')
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={handleTrackEnded}
      >
        <source src={musicTracks[currentTrack]} type="audio/mpeg" />
      </audio>
      <div className="music-control">
        <button className="music-button" onClick={togglePlay}>
          {isPlaying ? '🔊 Pause' : '🔇 Play Music'}
        </button>
        {isPlaying && (
          <div className="volume-control">
            <span>🔉</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
            />
            <span>🔊</span>
          </div>
        )}
      </div>
    </>
  )
})

BackgroundMusic.displayName = 'BackgroundMusic'

export default BackgroundMusic
