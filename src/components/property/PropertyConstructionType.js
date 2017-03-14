import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import PropertyConstructionTypeStyle from './PropertyConstructionType.scss';

export default class PropertyConstructionType extends BaseComponent {
    static options = [
        {value: 'CONSTRUCTED', label: 'Completed project', imageStyle: PropertyConstructionTypeStyle.iconConstructed},
        {value: 'UNDER_CONSTRUCTION', label: 'Under-construction project', imageStyle: PropertyConstructionTypeStyle.iconUnderConstruction},
        {value: 'PURCHASE_LAND', label: 'Land/Plot only', imageStyle: PropertyConstructionTypeStyle.iconLandOnly},
        {value: 'CONSTRUCT_ON_OWN_LAND', label: 'Built/building on land I own', imageStyle: PropertyConstructionTypeStyle.iconConstructOnOwnLand},
        {value: 'PURCHASE_LAND_AND_CONSTRUCT', label: 'Looking to buy land and build on it', imageStyle: PropertyConstructionTypeStyle.iconBuyLandAndConstruct}
    ];

    state = {
        selectedType: this.props.value
    }
    
    render() {
        let radioItems = PropertyConstructionType.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-2 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.value} name='propertyDetail' onChange={this.handlePropertyDetailSelection} checked={this.state.selectedType === option.value}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div className= {PropertyConstructionTypeStyle.propConstContainer}>
                {radioItems}
            </div>            
        )
    }

    handlePropertyDetailSelection = (event) => {
        let value = event.target.value;
        this.setState({selectedType: value}, () => {this.notifyCompletion()});
    }

    getData() {
        return this.state.selectedType;
    }

    validate() {
        if (this.state.selectedType) {
            return true;            
        } else {
            this.props.handler.showError("Uh-oh! Please pick any one option to proceed");
            return false;
        }
    }
}