import { useEffect, useState } from 'react'
import './Confetti.css'

interface ConfettiPiece {
  id: number
  left: number
  animationDuration: number
  color: string
}

const Confetti = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    // Stardew Valley themed colors
    const colors = ['#32CD32', '#FFD700', '#FF6347', '#8B4513', '#9370DB', '#228B22', '#DAA520', '#FF69B4']
    const pieces: ConfettiPiece[] = []

    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    setConfetti(pieces)
  }, [])

  return (
    <div className="confetti-container">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDuration: `${piece.animationDuration}s`,
            backgroundColor: piece.color
          }}
        />
      ))}
    </div>
  )
}

export default Confetti
