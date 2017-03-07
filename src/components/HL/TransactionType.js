import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';
import TransactionTypeStyle from './TransactionType.scss';

export default class TransactionType extends BaseComponent {
    static options = [
        {label: 'Direct Allotment', imageStyle: TransactionTypeStyle.icontransactiontype1},
        {label: 'Resale', imageStyle: TransactionTypeStyle.icontransactiontype2}
    ];
    render() {
        let radioItems = TransactionType.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-2 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.label} name='transactionType' onChange={this.handleTransactionTypeSelection} checked={this.props.value === option.label}/>
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