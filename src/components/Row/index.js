import React, { Component } from 'react'
import Cell from '../Cell'
import './index.css'

export default class Row extends Component {
    render() {
        return (
            <div className="row">
                {
                    this.props.cells.map((cell, index)=><Cell key={index} value={cell}/>)
                }
            </div>
        )
    }
}
