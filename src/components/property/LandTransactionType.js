import React from 'react';
import titleCase from 'title-case';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';
import LandTransactionTypeStyle from './LandTransactionType.scss';

export default class LandTransactionType extends BaseComponent {
    static options = ['DIRECT_ALLOTMENT', 'RESALE'];

    state = {
        selectedType: this.props.value
    }

    render() {
        let radioItems = LandTransactionType.options.map(
            (option) => {
                let label = titleCase(option);
                let icon = LandTransactionTypeStyle['icon' + label.replace(/ /g, '')];
                return (
                    <DecorateWithImageAndLabel key={option} imageStyle={icon} label={label} containerStyle="col-md-2 col-xs-3 col-sm-3 radio-col">
                        <input type="radio" value={option} name='transactionType' onChange={this.handleTransactionTypeSelection} checked={this.state.selectedType === option}/>
                    </DecorateWithImageAndLabel>
                );
            }
        );

        return (
            <div className= {LandTransactionTypeStyle.landTransactionContainer}>
                {radioItems}
            </div>            
        )
    }

    handleTransactionTypeSelection = (event) => {
        let value = event.target.value;
        this.setState({selectedType: value}, () => {this.notifyCompletion();});
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