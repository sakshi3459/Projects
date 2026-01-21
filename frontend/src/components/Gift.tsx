import { useState } from 'react'
import './Gift.css'

interface GiftProps {
  onOpen: (item: string) => void
}

const stardewItems = [
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '🍺', name: 'Beer' },
  { emoji: '💎', name: 'Diamond' },
  { emoji: '🐟', name: 'Fish' },
  { emoji: '🌶️', name: 'Hot Pepper' },
  { emoji: '🍓', name: 'Strawberry' },
  { emoji: '🥖', name: 'Bread' },
  { emoji: '☕', name: 'Coffee' },
  { emoji: '🎂', name: 'Birthday Cake' },
  { emoji: '🌻', name: 'Sunflower' },
  { emoji: '🍯', name: 'Honey' },
  { emoji: '🧀', name: 'Cheese' },
  { emoji: '🥧', name: 'Pie' },
  { emoji: '🍷', name: 'Wine' },
  { emoji: '⭐', name: 'Stardrop' },
]

const Gift = ({ onOpen }: GiftProps) => {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [item, setItem] = useState<{ emoji: string; name: string } | null>(null)

  const handleClick = () => {
    if (isOpened || isOpening) return

    setIsOpening(true)

    setTimeout(() => {
      const randomItem = stardewItems[Math.floor(Math.random() * stardewItems.length)]
      setItem(randomItem)
      setIsOpened(true)
      setIsOpening(false)
      onOpen(randomItem.name)
    }, 800)
  }

  return (
    <div className="gift-container">
      {!isOpened ? (
        <div
          className={`gift-box ${isOpening ? 'opening' : ''}`}
          onClick={handleClick}
        >
          <div className="gift-bow">🎀</div>
          <div className="gift-body">🎁</div>
          <div className="gift-hint">Click to open!</div>
        </div>
      ) : (
        <div className="gift-revealed">
          <div className="gift-item">{item?.emoji}</div>
          <div className="gift-item-name">{item?.name}</div>
          <div className="gift-message">A gift from 8th Lok Farm!</div>
        </div>
      )}
    </div>
  )
}

export default Gift
