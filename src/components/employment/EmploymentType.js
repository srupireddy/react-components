import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import EmploymentTypeStyle from './EmploymentType.scss';

const titleCase = require('title-case');

export default class EmploymentType extends BaseComponent {
    static options = ['SALARIED', 'SALARIED_PROFESSIONAL', 'SELF_EMPLOYED_BUSINESS', 'SELF_EMPLOYED_PROFESSIONAL', 'STUDENT', 'RETIRED', 'HOMEMAKER'];

    state = {
        selectedType: this.props.value
    }

    render() {
        let radioItems = EmploymentType.options.map(
            (option) => {
                let label = titleCase(option);
                let icon = EmploymentTypeStyle['icon' + label.replace(/ /g, '')];
                return (
                    <DecorateWithImageAndLabel key={option} imageStyle={icon} label={label} selected={this.state.selectedType === option} containerStyle="col-md-3 col-xs-5 col-sm-3 radio-col">
                        <input type="radio" value={option}
                            name='employmentType' onChange={this.handleEmploymentTypeSelection} checked={this.state.selectedType === option}/>
                    </DecorateWithImageAndLabel>
                );
            }
        );

        return (
            <div className={EmploymentTypeStyle.empTypeContainer}>
                {radioItems}
            </div>            
        )
    }

    handleEmploymentTypeSelection = (event) => {
        let value = event.target.value;
        this.setState({selectedType: value}, () => {this.notifyCompletion()});
    }

    getData() {
        return {[this.props.modelKey]: this.state.selectedType};
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