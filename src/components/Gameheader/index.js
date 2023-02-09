import React, { Component } from 'react'
import { connect } from 'react-redux'
import {resetScore, updateRows} from '../../redux/actions'
import Score from '../Score'
import './index.css'

class Gameheader extends Component {
    resetGame = ()=>{
        console.log('game reset')
        const newRows = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
        const row = Math.floor(Math.random()*10)%4 // 0-3
        const col = Math.floor(Math.random()*10)%4 // 0-3 
        newRows[row][col] = (Math.floor(Math.random()*10)%2+1)*2 // 2|4
        this.props.updateRows(newRows)
        this.props.resetScore()
    }

    render() {
        const {score, bestScore} = this.props

        return (
            <div className="gameheader">
                <span className="title">2048</span>
                <Score title="SCORE" number={`${score}`} />
                <Score title="BEST" number={`${bestScore}`} />
                <button onClick={this.resetGame}>NEW GAME</button>
            </div>
        )
    }
}

export default connect(
    state=>({
        score: state.score,
        bestScore: state.bestScore
    }),
    {
        resetScore,
        updateRows
    }
)(Gameheader)