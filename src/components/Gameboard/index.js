import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateRows, addScore, updateBestScore, resetScore } from '../../redux/actions'
import Row from '../Row'
import './index.css'

class Gameboard extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.handleOnKeydown)
        // 从localStorage中读取最高分
        const bestScore = parseInt(localStorage.getItem('bestScore') || '0')
        // 更新最高分
        this.props.updateBestScore(bestScore)

        // 随机产生一个位置的2或4
        const newRows = this.randomNumber(this.props.rows)
        // 然后更新rows
        this.props.updateRows(newRows)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleOnKeydown)
    }

    // 随机在一个空的区域（value=0）产生2或4
    randomNumber = (rows)=>{
        let row, col, value
        const newRows = [...rows]

        if(this.gameboardIsFull()){
            return newRows
        }

        do{
            row = Math.floor(Math.random()*10)%4 // 0-3
            col = Math.floor(Math.random()*10)%4 // 0-3 
            
        }while(newRows[row][col]!==0)

        value = (Math.floor(Math.random()*10)%2+1)*2 // 2|4
        newRows[row][col] = value
        return newRows
    }

    // 判断棋盘是否已满
    gameboardIsFull = ()=>{
        const {rows} = this.props

        for(let i=0;i<4;i++){
            for(let j=0;j<4;j++){
                if(rows[i][j]===0){
                    return false
                }
            }
        }
        return true
    }

    handleGameWinOver = ()=>{
        let win = false
        let over = true
        const {rows} = this.props
        // 判断是否出现了1024
        for(let i=0;i<4;i++){
            if(rows[i].some(col=>col>=1024)){
                win = true
                break
            }
        }
        // 竖直方向判断是否可以走
        vertical:
        for(let i=0;i<4;i++){
            for(let j=0;j<3;j++){
                if(rows[j][i]===rows[j+1][i]){
                    over = false
                    break vertical
                }
            }
        }
        // 判断水平方向是否可以走
        level:
        for(let i=0;i<4;i++){
            for(let j=0;j<3;j++){
                if(rows[i][j]===rows[i][j+1]){
                    over = false
                    break level
                }
            }
        }
        // 看棋盘是否已满
        over = this.gameboardIsFull() && over

        if(win){
            setTimeout(()=>{
                alert(`You win! Your score is ${this.props.score}. Please replay or quit`)
            }, 0)
            if(this.props.score>this.props.bestScore){
                this.props.updateBestScore(this.props.score)
                localStorage.setItem('bestScore', `${this.props.bestScore}`)
            }

            this.props.resetScore()
            const newRows = this.randomNumber([...this.props.rows])
            this.props.updateRows(newRows)
        }else if(over){
            setTimeout(()=>{
                alert(`You lost! Your score is ${this.props.score}. Please replay or quit`)   
            }, 0)
            if(this.props.score>this.props.bestScore){
                this.props.updateBestScore(this.props.score)
                localStorage.setItem('bestScore', `${this.props.bestScore}`)
            }
        }
    }

    handleOnKeydown = (event) => {
        const newRows = [...this.props.rows]

        switch (event.keyCode) {
            case 37://left
                console.log('left')
                for(let i=0;i<4;i++){
                    for(let j=1;j<4;j++){
                        // 如果左一个元素为0，移动过去，还是0就一直移动
                        for(let k=j;k>=1;k--){
                            if(newRows[i][k-1]!==0 && newRows[i][k-1]===newRows[i][k]){
                                newRows[i][k-1] = newRows[i][k-1]*2
                                newRows[i][k] = 0
                                this.props.addScore(newRows[i][k-1])
                                break
                            }else if(newRows[i][k-1]===0){
                                newRows[i][k-1] = newRows[i][k]
                                newRows[i][k] = 0
                            }
                        }   
                    }
                }
                // 然后更新rows
                this.props.updateRows(this.randomNumber(newRows))
                break
            case 38:// up
                console.log('up')
                for(let i=1;i<4;i++){
                    for(let j=0;j<4;j++){
                        // 如果上一个元素为0，移动过去，还是0就一直移动
                        for(let k=i;k>=1;k--){
                            if(newRows[k-1][j]!==0 && newRows[k-1][j]===newRows[k][j]){ 
                                newRows[k-1][j] = newRows[k-1][j]*2
                                newRows[k][j] = 0
                                this.props.addScore(newRows[k-1][j])
                                break
                            }else if(newRows[k-1][j]===0){
                                newRows[k-1][j] = newRows[k][j]
                                newRows[k][j] = 0
                            }
                        }
                    }
                }
                // 然后更新rows
                this.props.updateRows(this.randomNumber(newRows))
                break
            case 39:// right
                console.log('right')
                for(let i=0;i<4;i++){
                    for(let j=2;j>=0;j--){
                        // 如果下一个元素为0，移动过去，还是0就一直移动
                        for(let k=j;k<=2;k++){
                            if(newRows[i][k+1]!==0 && newRows[i][k+1]===newRows[i][k]){
                                newRows[i][k+1] = newRows[i][k+1]*2
                                newRows[i][k] = 0
                                this.props.addScore(newRows[i][k+1])
                                break
                            }else if(newRows[i][k+1]===0){
                                newRows[i][k+1] = newRows[i][k]
                                newRows[i][k] = 0
                            }
                        }                       
                    }
                }
                // 然后更新rows
                this.props.updateRows(this.randomNumber(newRows))
                break
            case 40:// down
                console.log('down')
                for(let i=2;i>=0;i--){
                    for(let j=0;j<4;j++){
                        // 如果下一个元素为0，移动过去，还是0就一直移动
                        for(let k=i;k<=2;k++){
                            if(newRows[k+1][j]!==0 && newRows[k+1][j]===newRows[k][j]){
                                newRows[k+1][j] = newRows[k+1][j]*2
                                newRows[k][j] = 0
                                this.props.addScore(newRows[k+1][j])
                                break
                            }else if(newRows[k+1][j]===0){
                                newRows[k+1][j] = newRows[k][j]
                                newRows[k][j] = 0                           
                            }
                        }                       
                    }
                }
                // 然后更新rows
                this.props.updateRows(this.randomNumber(newRows))
                break
            default:
                break
        }
        // 判断胜利或者失败
        this.handleGameWinOver()
    }

    render() {
        return (
            <div className="gameboard">
                {
                    this.props.rows.map((row, index) => <Row key={index} cells={row} />)
                }
            </div>
        )
    }
}

export default connect(
    // mapStateToProps
    state => ({
        rows: state.rows,// key的名字需要和reducers中的一致才行，否则为undefined
        score: state.score,
        bestScore: state.bestScore
    }),
    // mapDispatchToProps
    {
        updateRows,
        addScore,
        resetScore,
        updateBestScore
    }
)(Gameboard)