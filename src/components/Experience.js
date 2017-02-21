import React from 'react';
import Slider from 'react-rangeslider';

import ExperienceStyle from './Experience.scss';
import TextFieldStyle from '../widgets/TextField.scss';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.data || 10};
    }

    isInValidState() {
        return true;
    }
    
    render() {
        return (
            <div>
                <div className={ExperienceStyle.container}>
                    <input type="text" value={this.state.value} placeholder="Enter your Experience" onChange={this.handleTextFieldValueChange} className={TextFieldStyle.bbInput}/>
                </div>
                <div className="slide slideHorizontal">
                    <Slider min={0} max={120000} step={1000} value={this.state.value} onChange={this.handleSliderValueChange}/>
                </div>
            </div>
        )
    }

    handleTextFieldValueChange = (event) => {
        let value = parseInt(event.target.value);
        this.setState({value: value});
    }

    handleSliderValueChange = (value) => {
        this.setState({value: value});
    }
}