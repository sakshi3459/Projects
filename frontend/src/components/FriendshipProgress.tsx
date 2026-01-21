import './FriendshipProgress.css'

interface FriendshipProgressProps {
  villagersMetCount: number
  totalVillagers: number
}

const FriendshipProgress = ({ villagersMetCount, totalVillagers }: FriendshipProgressProps) => {
  const percentage = Math.round((villagersMetCount / totalVillagers) * 100)

  return (
    <div className="friendship-progress-container">
      <div className="friendship-progress-header">
        <span className="friendship-icon">❤️</span>
        <span className="friendship-label">Village Friendship</span>
        <span className="friendship-count">{villagersMetCount}/{totalVillagers}</span>
      </div>
      <div className="friendship-progress-bar">
        <div
          className="friendship-progress-fill"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 15 && <span className="friendship-percentage">{percentage}%</span>}
        </div>
      </div>
      <div className="friendship-milestones">
        <div className={`milestone ${villagersMetCount >= 1 ? 'reached' : ''}`}>
          <span className="milestone-icon">🌱</span>
          <span className="milestone-name">First Friend</span>
        </div>
        <div className={`milestone ${villagersMetCount >= 5 ? 'reached' : ''}`}>
          <span className="milestone-icon">🌻</span>
          <span className="milestone-name">Social Butterfly</span>
        </div>
        <div className={`milestone ${villagersMetCount >= 10 ? 'reached' : ''}`}>
          <span className="milestone-icon">⭐</span>
          <span className="milestone-name">Town Hero</span>
        </div>
        <div className={`milestone ${villagersMetCount >= totalVillagers ? 'reached' : ''}`}>
          <span className="milestone-icon">👑</span>
          <span className="milestone-name">Mayor's Favorite</span>
        </div>
      </div>
    </div>
  )
}

export default FriendshipProgress
