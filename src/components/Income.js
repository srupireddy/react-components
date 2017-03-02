import React from 'react';
import BaseComponent from './BaseComponent';
import Slider from 'react-rangeslider';

export default class Income extends BaseComponent{
    static propTypes = {
        min: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        value: React.PropTypes.number.isRequired,
        step: React.PropTypes.number,
        allowGranularValue: React.PropTypes.bool
    };

    static defaultProps = {
        min: 0,
        max: 100,
        value: 0,
        step: 1,
        allowGranularValue: true
    };

    state = {
        value: this.props.value || 0
    }

    render() {
        return (
            <div>
                {this.props.allowGranularValue &&
                    <div style={{...this.props.style, width: '300px', margin:'0 auto'}}>
                        <input type="text" value={this.state.value} onChange={this.handleTextFieldValueChange}/>
                    </div>
                }
                <div className={["slider-horizontal-ruler", this.rulerToBeUsed()].join(' ')}>
                    <Slider value={this.state.value} min={this.props.min} max={this.props.max} step={this.props.step} onChange={this.handleSliderValueChange} onChangeComplete={this.handleSliderValueChangeCompleted}/>
                </div>
            </div>
        )
    }

    rulerToBeUsed() {
        //TODO: Programatically generate the background image to be rendered for the ruler.
        switch (this.props.max) {
            case 7: return "ruler-0-7";
            case 70: return "ruler-18-70";
            case 120000: return "ruler-0-120000";
            default: return "ruler-blank";
        }
    }

    handleTextFieldValueChange = (event) => {
        let value = event.target.value;
        if (isNaN(value)) {
            value = this.props.min;
        }
        value = Math.max(value, this.props.min);
        value = Math.min(value, this.props.max);
        this.setState({value: parseInt(value)});
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    handleSliderValueChange = (value) => {
        this.setState({value: value});
    }

    handleSliderValueChangeCompleted = (event) => {
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
}