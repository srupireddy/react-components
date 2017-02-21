import React from 'react';

import Slider from 'react-rangeslider';

//import RangeSliderStyle from './RangeSlider.scss';


class Negative extends React.Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            value: 10
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
            <div className="slide slideHorizontalnew">
                <Slider min={0} max={120000} value={value} onChange={this.handleChange}/>
            </div>
        )
}
}

export default Negative;