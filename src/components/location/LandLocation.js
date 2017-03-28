import React from 'react';
import titleCase from 'title-case';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import LandLocationStyle from './LandLocation.scss';

export default class LandLocation extends BaseComponent {
    static options = ['INSIDE_CITY_LIMITS', 'OUTSIDE_CITY_LIMITS'];

    state = {
        selectedValue: this.props.value
    }

    render() {
        let radioItems = LandLocation.options.map(
            (option) => {
                let label = titleCase(option);
                let icon = LandLocationStyle['icon' + label.replace(/ /g, '')];
                return (
                    <DecorateWithImageAndLabel key={option} imageStyle={icon} label={label} containerStyle="col-md-2 col-xs-3 col-sm-3 radio-col">
                        <input type="radio" value={option} name='transactionType' onChange={this.handlePropertyLocationSelection} checked={this.state.selectedValue === option}/>
                    </DecorateWithImageAndLabel>
                );
            }
        );

        return (
            <div className= {LandLocationStyle.landLocationContainer}>
                {radioItems}
            </div>            
        )
    }

    handlePropertyLocationSelection = (event) => {
        let value = event.target.value;
        this.setState({selectedValue: value}, () => {this.notifyCompletion()})
    }

    getData() {
        return {[this.props.modelKey]: this.state.selectedValue};
    }

    validate() {
        if (this.state.selectedValue) {
            return true;            
        } else {
            this.props.handler.showError("Uh-oh! Please pick any one option to proceed");
            return false;
        }
    }

}