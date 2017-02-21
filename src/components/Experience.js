import React from 'react';

import RangeSliderNew from '../widgets/RangeSliderNew.js'

import ExperienceStyle from './Experience.scss';
import TextFieldStyle from '../widgets/TextField.scss';

export default class Experience extends React.Component {
    isInValidState() {
        return true;
    }
    
    render() {
        return (
            <div>
                <div className={ExperienceStyle.container}>
                    <input type="text" value={this.props.value} placeholder="Enter your details"  className={TextFieldStyle.bbInput}/>
                </div>
                <RangeSliderNew/>
            </div>
        )
    }
}