import React from 'react';
import titleCase from 'title-case';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import CoAppRelationshipStyle from './CoAppRelationship.scss';

export default class CoAppRelationship extends BaseComponent {
    static options = ['FATHER', 'MOTHER', 'SPOUSE', 'CHILDREN'];

    state = {
        selectedRelationship: this.props.value
    }

    render() {
        let radioItems = CoAppRelationship.options.map(
            (option) => {
                let label = titleCase(option);
                let icon = CoAppRelationshipStyle['icon' + label];
                return (
                    <DecorateWithImageAndLabel key={option} imageStyle={icon} label={label} containerStyle="col-md-3 col-xs-3 col-sm-3 radio-col">
                        <input type="radio" value={option} name='coAppRelationship' onChange={this.handleCoAppRelationshipSelection} checked={this.state.selectedRelationship === option}/>
                    </DecorateWithImageAndLabel>
                );
            }
        );

        return (
            <div style={{...this.props.style, width: '900px'}}>
                {radioItems}
            </div>            
        )
    }

    handleCoAppRelationshipSelection = (event) => {
        let value = event.target.value;
        this.setState({selectedRelationship: value}, () => {this.notifyCompletion()});
    }

    getData() {
        return this.state.selectedRelationship;
    }

    isStateValid() {
        return this.state.selectedRelationship ? true : false;
    }    
}