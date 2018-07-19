import React from 'react'

const GameWinner = props => {
  if (!props.winner) return null
  return (
    <div className="game-winner">
      <p>{props.winner} wins!!</p>
      <button onClick={props.resetGame}>Play Again</button>
    </div>
  )
}

export default GameWinner
