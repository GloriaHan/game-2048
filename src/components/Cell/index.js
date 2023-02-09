import React, { Component } from 'react'
import './index.css'

export default class Cell extends Component {
    render() {
        const bkColors = {
            '0': '#CABEB2',
            '2': '#EEEEEE',
            '4': '#EFEDCC',
            '8': '#FEBC89',
            '16': '#FB9B68',
            '32': '#FF7656',
            '64': '#FF5731',
            '128': '#F1D269',
            '256': '#F0CF5F',
            '512': '#ECC84E',
            '1024': '#ECC84E',
            '2048': '#ECBC34'
        }

        const value = parseInt(this.props.value)
        const bkColor = bkColors[value]
        const color = value>4? 'white': '#7D7662'

        return (
            <div className="cell" style={{backgroundColor: bkColor, color}}>
                {value>0? value: null}
            </div>
        )
    }
}
