import React from 'react';

import {DecorateInputFieldWithSymbol} from '../widgets/Decorator.js'

import Negative from '../widgets/RangeSlider.js'

import SpriteStyle from '../widgets/Sprite.scss'
import TextFieldStyle from '../widgets/TextField.scss';
import SalaryStyle from './Salary.scss';

export default class Salary extends React.Component {
    isInValidState() {
        return true;
    }

    render() {
        return (
            <DecorateInputFieldWithSymbol iconStyle={SpriteStyle.symbolRupee}>
                <input type="text" value={this.props.value} placeholder="Enter the details" className={TextFieldStyle.bbInput}/>
            </DecorateInputFieldWithSymbol>
        )
    }
}
