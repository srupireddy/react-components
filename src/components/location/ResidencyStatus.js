import React from 'react';

import Country from './Country.js';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';
import ResidencyStatusStyle from './ResidencyStatus.scss';

export default class ResidencyStatus extends BaseComponent {
    static options = [
        {value: 'NRI', label: 'Non Resident Indian', imageStyle: ResidencyStatusStyle.iconNRI},
        {value: 'PIO', label: 'Holder of PIO Card', imageStyle: ResidencyStatusStyle.iconPIOCardHolder},
        {value: 'INDIAN_PARENTS', label: 'Parents are Indian citizens', imageStyle: ResidencyStatusStyle.iconIndianParents}
    ];

    state = {
        type: this.props.value ? this.props.value.residencyStatus: '',
        residentCountry: this.props.value ? this.props.value.residentCountry: ''
    }

    render() {
        let radioItems = ResidencyStatus.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-2 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.value} name='residencyStatus' onChange={this.handleResidencyStatusSelection} checked={this.state.type === option.value}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div className= {ResidencyStatusStyle.container}>
                {radioItems}
                <div className="slideSecondHeader" style={{margin: "10px auto"}}>Residence Country</div>
                <Country value={this.state.residentCountry} onChange={this.handleResidentCountrySelection}/>
            </div>
        );
    }

    handleResidencyStatusSelection = (event) => {
        let value = event.target.value;
        this.setState({type: value}, () => {this.notifyCompletionIfAllPopulated()});
    }

    handleResidentCountrySelection = (value) => {
        this.setState({residentCountry: value}, () => {this.notifyCompletionIfAllPopulated()});
    }

    notifyCompletionIfAllPopulated = () => {
        if (this.isAllCollected()) {
            this.notifyCompletion();
        }
    }

    getData() {
        return {[this.props.modelKey]: this.state.type, 'residentCountry': this.state.residentCountry};
    }

    isAllCollected() {
        return this.state.type && this.state.residentCountry;
    }

    validate() {
        if (this.isAllCollected()) {
            return true;
        } else {
            this.props.handler.showError("Uh-oh! Please select an option to proceed");
            return false;
        }
    }
}