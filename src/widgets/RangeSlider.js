import React from 'react';

import Slider from 'react-rangeslider';

//import RangeSliderStyle from './RangeSlider.scss';


class Rangeslider extends React.Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            value: 5000
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            value: value
        })
    }

    render () {
        const {value} = this.state
        return (
            <div className="slide slideHorizontal">
                <Slider min={0} max={120000} step={1000} value={value} onChange={this.handleChange}/>
            </div>
        )
}
}

export default Rangeslider;