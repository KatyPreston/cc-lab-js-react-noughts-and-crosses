import React, { Component } from 'react'
import CurrentPlayer from '../components/CurrentPlayer'
import Grid from '../components/Grid'
import GameWinner from '../components/GameWinner'

export default class NoughtsCrosses extends Component {
  constructor(props) {
    super(props)

    this.state = {
      player: 'o',
      grid: new Array(9).fill(null),
      winArray: new Array(9).fill(0),
      gameWon: false,
      winner: null
    }

    this.handleBoxClick = this.handleBoxClick.bind(this)
    this.resetGame = this.resetGame.bind(this)
  }

  checkForWin(player) {
    const grid = this.state.grid
    const wins = [
      [1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 1, 0, 1, 0, 1, 0, 0]
    ]

    for (const win of wins) {
      let gameWon = true
      for (const ndx in grid) {
        const box = grid[ndx]
        if (win[ndx] === 0) {
          continue
        } else if (box !== player) {
          gameWon = false
          break
        }
      }

      if (gameWon) {
        this.setState({ gameWon })
        this.handleWin(player, win)
      } else {
        if (this.state.winner === 'NOBODY') return
        if (!this.state.grid.includes(null)) {
          this.nobodyWins()
        }
      }
    }
  }

  handleBoxClick(index) {
    let { player, grid, gameWon } = this.state
    if (grid[index] || gameWon) return

    grid[index] = player
    player === 'o' ? (player = 'x') : (player = 'o')

    this.setState({ player, grid }, () =>
      window.getSelection().removeAllRanges()
    )
  }

  handleWin(player, winArray) {
    this.setState({ winArray, winner: player })
  }

  resetGame() {
    this.setState({
      player: 'o',
      grid: new Array(9).fill(null),
      winArray: new Array(9).fill(0),
      gameWon: false,
      winner: null
    })
  }

  nobodyWins() {
    this.setState({ winner: 'NOBODY' })
  }

  componentDidUpdate(prevProps, prevState) {
    const { player } = prevState
    this.checkForWin(player)
  }

  render() {
    return (
      <div>
        <CurrentPlayer player={this.state.player} />
        <Grid
          handleBoxClick={this.handleBoxClick}
          grid={this.state.grid}
          win={this.state.winArray}
        />
        <GameWinner winner={this.state.winner} resetGame={this.resetGame} />
      </div>
    )
  }
}
