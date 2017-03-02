import React from 'react';
import Slider from 'react-rangeslider';
import BaseComponent from './BaseComponent';

import Duration from './Duration.js';
import Calendar from './Calendar.js';

export default class Experience extends BaseComponent {
    render() {
        return (
            <div >
                <Calendar variant='Last5Years' titleSuffix="Joining"/>
                <div className="font-xlg">Your total work experience</div>
                <Duration min={0} max={7} step={1} allowGranularValue={false}/>
            </div>
        )
    }
}