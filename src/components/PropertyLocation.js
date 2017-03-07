import React from 'react';
import BaseComponent from './BaseComponent';
import {DecorateWithImageAndLabel} from '../widgets/Decorator';
import PropertyLocationStyle from './PropertyLocation.scss';

export default class PropertyLocation extends BaseComponent {
    static options = [
        {label: 'Inside City Limits', imageStyle: PropertyLocationStyle.iconlimitinside},
        {label: 'Outside City Limits', imageStyle: PropertyLocationStyle.iconlimitoutside}
    ];
    render() {
        let radioItems = PropertyLocation.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-3 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.label} name='transactionType' onChange={this.handlePropertyLocationSelection} checked={this.props.value === option.label}/>
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