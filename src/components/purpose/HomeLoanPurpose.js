import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import HomeLoanPurposeStyle from './HomeLoanPurpose.scss';

export default class HomeLoanPurpose extends BaseComponent {
    static options = [
        {value: 'PURCHASE_IDENTIFIED_PROPERTY', label: 'Purchase or construct on property I have already chosen', imageStyle: HomeLoanPurposeStyle.iconIdentifiedProperty},
        {value: 'TRANSFER_EXISTING_HOME_LOAN', label: 'Transfer my existing home loan', imageStyle: HomeLoanPurposeStyle.iconTransferExistingLoan},
        {value: 'PURCHASE_NOT_YET_IDENTIFIED_PROPERTY', label: 'I haven’t yet identified the property I’d like to purchase', imageStyle: HomeLoanPurposeStyle.iconNotYetIdentifiedProperty}
    ];

    state = {
        selectedPurpose: this.props.value
    }

    render() {
        let radioItems = HomeLoanPurpose.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-2 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.value} name='purpose' onChange={this.handlePurposeSelection} checked={this.state.selectedPurpose === option.value}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div className= {HomeLoanPurposeStyle.loanPurposeContainer}>
                {radioItems}
            </div>            
        )
    }

    handlePurposeSelection = (event) => {
        let value = event.target.value;
        this.setState({selectedPurpose: value}, () => {this.notifyCompletion()});
    }

    getData() {
        return {[this.props.modelKey]: this.state.selectedPurpose};
    }

    validate() {
        if (this.state.selectedPurpose) {
            return true;            
        } else {
            this.props.handler.showError("Uh-oh! Please pick any one option to proceed");
            return false;
        }
    }
}