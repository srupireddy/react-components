import React from 'react';
import Slider from 'react-rangeslider';
import moment from 'moment';

import BaseComponent from '../BaseComponent';
import ActionHandler from '../ActionHandler.js';
import Calendar from '../others/Calendar.js';

export default class ExistingloanYear extends BaseComponent {
    state = {
        loanStartDate: this.props.value
    }

    constructor(props) {
        super(props);

        this.calendarHandler = new class extends ActionHandler {
            constructor(props) {
                super(props);
                this.props = props;
            }

            onCompletion = (modelKey, payload) => {
                this.handleLoanStartDateChanged(payload);
            }
        }();
    }

    render() {
        return (
            <div >
                <Calendar value={this.state.loanStartDate} handler={this.calendarHandler} modelKey='@@IAmNotUsed@@' variant='Last5Years' titleSuffix="Loan"/>
            </div>
        )
    }

    handleLoanStartDateChanged = (value) => {
        this.setState({loanStartDate: value});
    }

    getData() {
        return this.loanStartDate;
    }

    validate() {
        if (this.state.loanStartDate) {
            return true;
        } else {
            this.props.handler.showError("Uh-oh! Please pick any one option to proceed");
            return false;
        }
    }
}