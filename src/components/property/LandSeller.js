import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import LandSellerStyle from './LandSeller.scss';

export default class SellerDetail extends BaseComponent {
    static options = [
        {value:'LAND_OWNER', label: 'Land Owner', imageStyle: LandSellerStyle.iconseller1},
        {value:'GOVT_DEVELOPMENT_AUTHORITY', label: 'Govt. Development Authority', imageStyle: LandSellerStyle.iconseller3},
        {value:'BUILDER_DEVELOPER', label: 'Builder / Developer', imageStyle: LandSellerStyle.iconseller3}
    ];

    state = {
        selectedValue: this.props.value
    }
    
    render() {
        let radioItems = SellerDetail.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-2 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.value} name='sellerDetail' onChange={this.handleSellerDetailSelection} checked={this.state.selectedValue === option.value}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div className= {LandSellerStyle.landSellerContainer}>
                {radioItems}
            </div>            
        )
    }

    handleSellerDetailSelection = (event) => {
        let value = event.target.value;
        this.setState({selectedValue: value}, () => {this.notifyCompletion()});
    }

    getData() {
        return this.state.selectedValue;
    }

    validate() {
        if (this.state.selectedValue) {
            return true;            
        } else {
            this.props.handler.showError("Uh-oh! Please pick any one option to proceed");
            return false;
        }
    }
}