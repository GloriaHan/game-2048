import React, { Component } from 'react'
import './index.css'

export default class Score extends Component {
    render() {
        const {title, number} = this.props
        return (
            <div className="score">
                <span className="score-title">{title}</span>
                <span className="score-number">{number}</span>
            </div>
        )
    }
}
