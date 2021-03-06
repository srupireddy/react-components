import React from 'react';
import titleCase from 'title-case';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import CoApplicantRelationshipStyle from './CoApplicantRelationship.scss';

export default class CoApplicantRelationship extends BaseComponent {
    static options = ['FATHER', 'MOTHER', 'SPOUSE', 'CHILDREN'];

    state = {
        selectedRelationship: this.props.value
    }

    render() {
        let radioItems = CoApplicantRelationship.options.map(
            (option) => {
                let label = titleCase(option);
                let icon = CoApplicantRelationshipStyle['icon' + label];
                return (
                    <DecorateWithImageAndLabel key={option} imageStyle={icon} label={label} checked={this.state.selectedRelationship === option} containerStyle="col-md-2 col-xs-3 col-sm-3 radio-col">
                        <input type="radio" value={option} name='coAppRelationship' onChange={this.handleCoAppRelationshipSelection} checked={this.state.selectedRelationship === option}/>
                    </DecorateWithImageAndLabel>
                );
            }
        );

        return (
            <div className= {CoApplicantRelationshipStyle.coApplicantRSContainer}>
                {radioItems}
            </div>            
        )
    }

    handleCoAppRelationshipSelection = (event) => {
        let value = event.target.value;
        this.setState({selectedRelationship: value}, () => {this.notifyCompletion()});
    }

    getData() {
        return {[this.props.modelKey]: this.state.selectedRelationship};
    }

    validate() {
        if (this.state.selectedRelationship) {
            return true;            
        } else {
            this.props.handler.showError("Uh-oh! Please pick any one option to proceed");
            return false;
        }
    }    
}