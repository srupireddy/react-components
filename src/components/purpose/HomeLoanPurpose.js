import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import HomeLoanPurposeStyle from './HomeLoanPurpose.scss';

export default class HomeLoanPurpose extends BaseComponent {
    static options = [
        {label: 'Purchase or construct on property I have already chosen', imageStyle: HomeLoanPurposeStyle.iconpurpose1},
        {label: 'Transfer my existing home loan', imageStyle: HomeLoanPurposeStyle.iconpurpose2},
        {label: 'I haven’t yet identified the property I’d like to purchase', imageStyle: HomeLoanPurposeStyle.iconpurpose3}
    ];
    render() {
        let radioItems = HomeLoanPurpose.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-3 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.label} name='purpose' onChange={this.handlePurposeSelection} checked={this.props.value === option.label}/>
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