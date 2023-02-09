import {combineReducers} from 'redux'
import {UPDATE_ROWS, ADD_SCORE, RESET_SCORE, UPDATE_BEST_SCORE} from './actions'
import initialState from './state'

const rowsReducer = (rows=initialState.rows, action)=>{
    switch(action.type){
        case UPDATE_ROWS:
            return [...action.data]
        default: 
            return rows
    }
}

const scoreReducer = (score=initialState.score, action)=>{
    switch(action.type){
        case ADD_SCORE:
            return score+action.data
        case RESET_SCORE: 
            return 0
        default:
            return score
    }
}

const bestScoreReducer = (bestScore=initialState.bestScore, action)=>{
    switch(action.type){
        case UPDATE_BEST_SCORE:
            return action.data
        default: 
            return bestScore
    }
}

export default combineReducers({
    rows: rowsReducer,
    score: scoreReducer,
    bestScore: bestScoreReducer
})