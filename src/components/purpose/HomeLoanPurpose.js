import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import HomeLoanPurposeStyle from './HomeLoanPurpose.scss';

export default class HomeLoanPurpose extends BaseComponent {
    static options = [
        {value:'PURCHASE_IDENTIFIED_PROPERTY', label: 'Purchase or construct on property I have already chosen', imageStyle: HomeLoanPurposeStyle.iconpurpose1},
        {value:'TRANSFER_EXISTING_HOME_LOAN', label: 'Transfer my existing home loan', imageStyle: HomeLoanPurposeStyle.iconpurpose2},
        {value:'PURCHASE_NOT_YET_IDENTIFIED_PROPERTY', label: 'I haven’t yet identified the property I’d like to purchase', imageStyle: HomeLoanPurposeStyle.iconpurpose3}
    ];
    render() {
        let radioItems = HomeLoanPurpose.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-3 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.value} name='purpose' onChange={this.handlePurposeSelection} checked={this.props.value === option.label}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div style={{...this.props.style, width: '900px'}}>
                {radioItems}
            </div>            
        )
    }

    handlePurposeSelection = (event) => {
        let value = event.target.value;
        this.notifyCompletion(value);
    }
}