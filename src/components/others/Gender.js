import React from 'react';
import titleCase from 'title-case';

import BaseComponent from '../BaseComponent.js';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import GenderStyle from './Gender.scss';

export default class Gender extends BaseComponent {
    static options = ['MALE', 'FEMALE'];

    state = {
        selectedGender: this.props.value
    }

    render() {
        let radioItems = Gender.options.map(
            (option) => {
                let label = titleCase(option);
                let icon = GenderStyle['icon' + label];
                return (
                    <DecorateWithImageAndLabel key={option} imageStyle={icon} label={label} containerStyle="col-md-5 col-xs-5 radio-col" >
                        <input type="radio" value={option}
                            name='gender' onChange={this.handleGenderSelection} checked={this.state.selectedGender === option}/>
                    </DecorateWithImageAndLabel>
                );
            }
        );

        return (
            <div className= {GenderStyle.container}>
                {radioItems}
            </div>
        );
    }

    handleGenderSelection = (event) => {
        let value = event.target.value;
        this.setState({selectedGender: value}, () => {this.notifyCompletion()});
    }

    getData() {
        return {[this.props.modelKey]: this.state.selectedGender};
    }

    validate() {
        if (this.state.selectedGender) {
            return true;            
        } else {
            this.props.handler.showError("Aww! C’mon! It’s easy! Pick one!");
            return false;
        }
    }
}
