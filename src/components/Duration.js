import React from 'react';
import Slider from 'react-rangeslider';

import TextFieldStyle from '../widgets/TextField.scss';

export default class Duration extends React.Component {
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

    constructor(props) {
        super(props);
        this.state = {value: this.props.value || 0};
    }

    isInValidState() {
        return true;
    }
    
    render() {
        //TODO: Programatically determine the background image to be rendered for the ruler.
        let ruler = "slide slideHorizontal";
        return (
            <div>
                {this.props.allowGranularValue &&
                    <input type="text" value={this.state.value} onChange={this.handleTextFieldValueChange} className={TextFieldStyle.bbInput}/>
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