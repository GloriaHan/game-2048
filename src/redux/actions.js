// 棋盘rows
export const UPDATE_ROWS = 'UPDATE_ROWS'
export const updateRows = rows=>({type: UPDATE_ROWS, data: rows})

// 当前分数action
export const ADD_SCORE = 'ADD_SCORE'// 增加分数
export const RESET_SCORE = 'RESET_SCORE'// 重置分数

export const addScore = score=>({type: ADD_SCORE, data: score})
export const resetScore = ()=>({type: RESET_SCORE, data: 0})

// 最高分action
export const UPDATE_BEST_SCORE = 'UPDATE_BEST_SCORE'// 更新最高分
export const updateBestScore = score=>({type: UPDATE_BEST_SCORE, data: score})