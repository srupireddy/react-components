import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';
import LandTransactionTypeStyle from './LandTransactionType.scss';

export default class LandTransactionType extends BaseComponent {
    static options = [
        {value:'DIRECT_ALLOTMENT', label: 'Direct Allotment', imageStyle: LandTransactionTypeStyle.icontransactiontype1},
        {value:'RESALE', label: 'Resale', imageStyle: LandTransactionTypeStyle.icontransactiontype2}
    ];
    render() {
        let radioItems = LandTransactionType.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-2 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.value} name='transactionType' onChange={this.handleTransactionTypeSelection} checked={this.props.value === option.label}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div style={{...this.props.style}}>
                {radioItems}
            </div>            
        )
    }

    handleTransactionTypeSelection = (event) => {
        let value = event.target.value;
        this.notifyCompletion(value);
    }
}