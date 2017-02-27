import React from 'react';
import BaseComponent from './BaseComponent';
import Slider from 'react-rangeslider';

export default class Duration extends BaseComponent{
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
        //TODO: Programatically determine the background image to be rendered for the ruler.
        let ruler = "slide slideHorizontal";
        return (
            <div>
                {this.props.allowGranularValue &&
                    <div style={{...this.props.style, width: '300px', margin:'0 auto'}}> <input type="text" value={this.state.value} onChange={this.handleTextFieldValueChange}/> </div>
                }
                <div className={ruler}>
                    <Slider value={this.state.value} min={this.props.min} max={this.props.max} step={this.props.step} onChange={this.handleSliderValueChange}/>
                </div>
            </div>
        )
    }

    handleTextFieldValueChange = (event) => {
        let value = event.target.value;
        if (isNaN(value)) {
            value = this.props.min;
        }
        value = Math.max(value, this.props.min);
        value = Math.min(value, this.props.max);
        this.setState({value: parseInt(value)});
    }

    handleSliderValueChange = (value) => {
        this.setState({value: value});
    }
}