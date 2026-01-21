import { useEffect, useState } from 'react'
import { SoundEffects } from '../utils/soundEffects'
import './Achievement.css'

export interface AchievementData {
  id: string
  title: string
  description: string
  icon: string
}

interface AchievementProps {
  achievement: AchievementData | null
  onClose: () => void
}

const Achievement = ({ achievement, onClose }: AchievementProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (achievement) {
      setIsVisible(true)
      SoundEffects.playAchievement()

      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 500)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  if (!achievement) return null

  return (
    <div className={`achievement-notification ${isVisible ? 'visible' : ''}`}>
      <div className="achievement-header">
        <span className="achievement-star">⭐</span>
        <span className="achievement-label">Achievement Unlocked!</span>
        <span className="achievement-star">⭐</span>
      </div>
      <div className="achievement-body">
        <div className="achievement-icon">{achievement.icon}</div>
        <div className="achievement-content">
          <div className="achievement-title">{achievement.title}</div>
          <div className="achievement-description">{achievement.description}</div>
        </div>
      </div>
    </div>
  )
}

export default Achievement
