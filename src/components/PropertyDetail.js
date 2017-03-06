import React from 'react';
import BaseComponent from './BaseComponent';
import {DecorateWithImageAndLabel} from '../widgets/Decorator';
import PropertyDetailStyle from './PropertyDetail.scss';

export default class PropertyDetail extends BaseComponent {
    static options = [
        {label: 'Completed project', imageStyle: PropertyDetailStyle.iconpropertydetail1},
        {label: 'Under-construction project', imageStyle: PropertyDetailStyle.iconpropertydetail2},
        {label: 'Land/Plot only', imageStyle: PropertyDetailStyle.iconpropertydetail3},
        {label: 'Built/building on land I own', imageStyle: PropertyDetailStyle.iconpropertydetail4},
        {label: 'Looking to buy land and build on it', imageStyle: PropertyDetailStyle.iconpropertydetail5}
    ];
    render() {
        let radioItems = PropertyDetail.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-2 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.label} name='propertyDetail' onChange={this.handlePropertyDetailSelection} checked={this.props.data === option.label}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div style={{...this.props.style}}>
                {radioItems}
            </div>            
        )
    }

    handlePropertyDetailSelection = (event) => {
        let value = event.target.value;
        this.notifyCompletion(value);
    }
}