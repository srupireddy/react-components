import React from 'react';
import Slider from 'react-rangeslider';
import BaseComponent from './BaseComponent';

import Duration from './Duration.js';
import Calendar from './Calendar.js';

export default class Experience extends BaseComponent {
    render() {
        return (
            <div style={{...this.props.style, width: '300px'}}>
                <Calendar variant='YearAndMonthOnly' headerSuffix='Joining'/>
                <Duration min={0} max={120000} value={5000} step={1000}/>
            </div>
        )
    }
}