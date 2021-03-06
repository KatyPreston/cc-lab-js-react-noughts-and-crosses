import React from 'react'
import Box from './Box'

const Grid = props => {
  return (
    <div className="grid">
      {props.grid.map((box, index) => {
        return (
          <Box
            handleClick={props.handleBoxClick}
            value={box}
            win={props.win[index]}
            index={index}
            key={`box-${index}`}
          />
        )
      })}
    </div>
  )
}

export default Grid
