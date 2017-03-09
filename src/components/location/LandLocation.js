import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import LandLocationStyle from './LandLocation.scss';

export default class LandLocation extends BaseComponent {
    static options = [
        {value:'INSIDE_CITY_LIMITS', label: 'Inside City Limits', imageStyle: LandLocationStyle.iconlimitinside},
        {value:'OUTSIDE_CITY_LIMITS', label: 'Outside City Limits', imageStyle: LandLocationStyle.iconlimitoutside}
    ];
    render() {
        let radioItems = LandLocation.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-3 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.value} name='transactionType' onChange={this.handlePropertyLocationSelection} checked={this.props.value === option.label}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div style={{...this.props.style, width: '900px'}}>
                {radioItems}
            </div>            
        )
    }

    handlePropertyLocationSelection = (event) => {
        let value = event.target.value;
        this.notifyCompletion(value);
    }
}