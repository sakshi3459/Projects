import { useState, useEffect } from 'react'
import './FarmAnimals.css'

interface Animal {
  id: number
  emoji: string
  type: 'chicken' | 'cow'
  left: number
  top: number
  clicked: boolean
}

const FarmAnimals = () => {
  const [animals, setAnimals] = useState<Animal[]>([])

  useEffect(() => {
    // Spawn animals randomly
    const spawnAnimal = () => {
      const types: ('chicken' | 'cow')[] = ['chicken', 'chicken', 'cow'] // More chickens than cows
      const type = types[Math.floor(Math.random() * types.length)]
      const emoji = type === 'chicken' ? '🐔' : '🐄'

      const newAnimal: Animal = {
        id: Date.now(),
        emoji,
        type,
        left: Math.random() * 80 + 10, // 10% to 90%
        top: Math.random() * 60 + 20, // 20% to 80%
        clicked: false,
      }

      setAnimals(prev => [...prev, newAnimal])

      // Remove animal after 8 seconds if not clicked
      setTimeout(() => {
        setAnimals(prev => prev.filter(a => a.id !== newAnimal.id))
      }, 8000)
    }

    // Spawn first animal immediately
    spawnAnimal()

    // Then spawn animals at random intervals (every 3-6 seconds)
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to spawn
        spawnAnimal()
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleAnimalClick = (id: number, _type: 'chicken' | 'cow') => {
    // Mark as clicked and add animation
    setAnimals(prev =>
      prev.map(a => (a.id === id ? { ...a, clicked: true } : a))
    )

    // Remove after animation
    setTimeout(() => {
      setAnimals(prev => prev.filter(a => a.id !== id))
    }, 600)
  }

  return (
    <div className="farm-animals-container">
      {animals.map(animal => (
        <div
          key={animal.id}
          className={`farm-animal ${animal.clicked ? 'clicked' : ''}`}
          style={{
            left: `${animal.left}%`,
            top: `${animal.top}%`,
          }}
          onClick={() => handleAnimalClick(animal.id, animal.type)}
        >
          {animal.emoji}
        </div>
      ))}
    </div>
  )
}

export default FarmAnimals
