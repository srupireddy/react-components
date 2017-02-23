import React from 'react';

import {DecorateInputFieldWithSymbol} from '../widgets/Decorator.js'
import BaseComponent from './BaseComponent';

import SpriteStyle from '../widgets/Sprite.scss'
import TextFieldStyle from '../widgets/TextField.scss';

export default class Salary extends BaseComponent {
    render() {
        return (
            <div>
                <div style={{...this.props.style, width: '300px'}}>
                    <DecorateInputFieldWithSymbol iconStyle={SpriteStyle.symbolRupee}>
                        <input type="text" value={this.props.value} placeholder="Enter the details" className={TextFieldStyle.bbInput}/>
                    </DecorateInputFieldWithSymbol>
                </div>
            </div>
        )
    }
}
