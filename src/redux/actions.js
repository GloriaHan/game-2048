// rows
export const UPDATE_ROWS = 'UPDATE_ROWS'
export const updateRows = rows=>({type: UPDATE_ROWS, data: rows})

// scores action
export const ADD_SCORE = 'ADD_SCORE'// add scores
export const RESET_SCORE = 'RESET_SCORE'// reset scores

export const addScore = score=>({type: ADD_SCORE, data: score})
export const resetScore = ()=>({type: RESET_SCORE, data: 0})

// the highest scores action
export const UPDATE_BEST_SCORE = 'UPDATE_BEST_SCORE'// update the highest scores
export const updateBestScore = score=>({type: UPDATE_BEST_SCORE, data: score})