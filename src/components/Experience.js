import React from 'react';
import Slider from 'react-rangeslider';

import Duration from './Duration.js';
import Calendar from './Calendar.js';

import ExperienceStyle from './Experience.scss';
import TextFieldStyle from '../widgets/TextField.scss';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
    }

    isInValidState() {
        return true;
    }
    
    render() {
        return (
            <div>
                <Calendar variant='YearAndMonthOnly' headerSuffix='Joining'/>
                <Duration min={0} max={120000} value={5000} step={1000}/>
            </div>
        )
    }
}