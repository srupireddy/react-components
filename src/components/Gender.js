import React from 'react';
import BaseComponent from './BaseComponent.js';

import {DecorateWithImageAndLabel} from '../widgets/Decorator';

import GenderStyle from './Gender.scss';

export default class Gender extends BaseComponent {
    static options = ['Male', 'Female'];

    handleGenderSelection = (event) => {
        let value = event.target.value;
        this.notifyCompletion(value);
    }

    render() {
        let radioItems = Gender.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option} imageStyle={GenderStyle['icon' + option]} label={option} containerStyle="col-md-5 col-xs-5 float-none inline-block" >
                    <input type="radio" value={option}
                        name='gender' onChange={this.handleGenderSelection} checked={this.props.data === option}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div style={{...this.props.style, width: '600px'}}>
                {radioItems}
            </div>            
        )
    }
}