import React from 'react';
import Slider from 'react-rangeslider';
import moment from 'moment';

import BaseComponent from '../BaseComponent';
import ActionHandler from '../ActionHandler.js';
import Calendar from '../others/Calendar.js';

export default class WorkExperience extends BaseComponent {
    state = {
        dateOfJoiningCurrentOrg: this.props.joiningDate,
        totalWorkExperience: this.props.totalWorkExperience
    }

    constructor(props) {
        super(props);

        this.calendarHandler = new class extends ActionHandler {
            constructor(props) {
                super(props);
                this.props = props;
            }

            onCompletion = (modelKey, value) => {
                this.handleJoiningDateChanged(value);
            }
        }();
    }

    render() {
        return (
            <div >
                <Calendar value={this.state.dateOfJoiningCurrentOrg} handler={this.calendarHandler} modelKey='@@IAmNotUsed@@' variant='Last5Years' titleSuffix="Joining"/>
                <div className="font-xxlg">Your total work experience</div>
                <div className="slider-horizontal-ruler ruler-0-7">
                    <Slider value={this.state.totalWorkExperience}
                            min={0} max={7} step={1} 
                            onChange={this.handleTotalExperienceValueChanged} onChangeComplete={this.validateTotalExperienceAgainstJoiningDate}
                    />
                </div>
            </div>
        )
    }

    handleJoiningDateChanged = (value) => {
        this.setState({dateOfJoiningCurrentOrg: value});
    }

    handleTotalExperienceValueChanged = (value) => {
        this.setState({totalWorkExperience: value});
    }

    validateTotalExperienceAgainstJoiningDate = (event) => {
        if (this.validate()) {
            this.notifyCompletion();
        }
    }

    getData() {
        //TODO: Fix this so that we dont need to hardcode the totalWorkExperience attribute name
        return {[this.props.modelKey]: this.state.dateOfJoiningCurrentOrg, 'totalWorkExperience': this.state.totalWorkExperience};
    }

    validate() {
        let status = true;
        let errorMessages = [];
        let numberOfYearsInCurrentOrg = this.state.dateOfJoiningCurrentOrg ? moment().diff(this.state.dateOfJoiningCurrentOrg, 'years') : 0;

        if (!this.state.dateOfJoiningCurrentOrg) {
            status = false;
            errorMessages.push("Hi! Please select an input to proceed");
        } else if (!this.state.totalWorkExperience) {
            status = false;
            errorMessages.push("And your total years of experience please!!");
        } else if (numberOfYearsInCurrentOrg > this.state.totalWorkExperience) {
            status = false;
            errorMessages.push("Hi! Your total work experience should be more than time with your current company");
        }

        if (status) {
            this.props.handler.clearError();
            return true;
        } else {
            this.props.handler.showError(errorMessages.join('\n'));
            return false;
        }
    }
}