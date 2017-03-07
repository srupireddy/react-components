import React from 'react';
import Slider from 'react-rangeslider';
import moment from 'moment';

import BaseComponent from '../BaseComponent';
import ActionHandler from '../ActionHandler.js';
import Calendar from './Calendar.js';

export default class Experience extends BaseComponent {
    state = {
        dateOfJoiningCurrentOrg: this.props.joiningDate,
        numberOfYearsInCurrentOrg: moment().diff(this.props.joiningDate, 'years'),
        totalWorkExperience: this.props.totalWorkExperience
    }

    constructor(props) {
        super(props);

        this.calendarHandler = new class extends ActionHandler {
            constructor(props) {
                super(props);
                this.props = props;
            }

            onCompletion = (modelKey, payload) => {
                this.handleJoiningDateChanged(payload);
            }
        }();
    }

    render() {
        return (
            <div >
                <Calendar value={this.state.dateOfJoiningCurrentOrg} handler={this.calendarHandler} modelKey='IAmNotUsed' variant='Last5Years' titleSuffix="Joining"/>
                <div className="font-xlg">Your total work experience</div>
                <div className="slider-horizontal-ruler ruler-0-7">
                    <Slider value={this.state.totalWorkExperience} min={0} max={7} step={1} onChange={this.handleTotalExperienceValueChanged} onChangeComplete={this.validate}/>
                </div>
            </div>
        )
    }

    handleJoiningDateChanged = (value) => {
        this.setState({dateOfJoiningCurrentOrg: value, numberOfYearsInCurrentOrg: moment().diff(value, 'years')});
        console.log(this.state);
    }

    handleTotalExperienceValueChanged = (value) => {
        this.setState({totalWorkExperience: value});
    }

    validate = () => {
        if (this.state.numberOfYearsInCurrentOrg > this.state.totalWorkExperience) {
            this.props.handler.onError("Hi! Your total work experience should be more than time with your current company");
        }        
    }
}