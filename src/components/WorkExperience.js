import React from 'react';
import Slider from 'react-rangeslider';

import BaseComponent from './BaseComponent';

import Calendar from './Calendar.js';

export default class Experience extends BaseComponent {
    state = {
        totalWorkExperience: this.props.totalWorkExperience

    }

    render() {
        return (
            <div >
                <Calendar variant='Last5Years' titleSuffix="Joining"/>
                <div className="font-xlg">Your total work experience</div>
                <div className="slider-horizontal-ruler ruler-0-7">
                    <Slider value={this.state.totalWorkExperience} min={0} max={7} step={1} onChange={this.handleTotalExperienceValueChanged}/>
                </div>
            </div>
        )
    }

    handleTotalExperienceValueChanged = (value) => {
        this.setState({totalWorkExperience: value})
    }
}