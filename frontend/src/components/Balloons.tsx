import './Balloons.css'

const Balloons = () => {
  const balloons = ['🎈', '🎈', '🎈', '🎈', '🎈']
  const colors = ['red', 'blue', 'yellow', 'pink', 'purple']

  return (
    <div className="balloons-container">
      {balloons.map((balloon, index) => (
        <div
          key={index}
          className={`balloon balloon-${colors[index]}`}
          style={{
            left: `${15 + index * 20}%`,
            animationDelay: `${index * 0.3}s`
          }}
        >
          {balloon}
        </div>
      ))}
    </div>
  )
}

export default Balloons
