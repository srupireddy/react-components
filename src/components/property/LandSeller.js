import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import LandSellerStyle from './LandSeller.scss';

export default class SellerDetail extends BaseComponent {
    static options = [
        {label: 'Land Owner', imageStyle: LandSellerStyle.iconseller1},
        {label: 'Govt. Development Authority', imageStyle: LandSellerStyle.iconseller3},
        {label: 'Builder / Developer', imageStyle: LandSellerStyle.iconseller3}
    ];
    render() {
        let radioItems = SellerDetail.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-2 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.label} name='sellerDetail' onChange={this.handleSellerDetailSelection} checked={this.props.value === option.label}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div style={{...this.props.style}}>
                {radioItems}
            </div>            
        )
    }

    handleSellerDetailSelection = (event) => {
        let value = event.target.value;
        this.notifyCompletion(value);
    }
}