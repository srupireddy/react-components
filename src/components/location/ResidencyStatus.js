import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';
import ResidencyStatusStyle from './ResidencyStatus.scss';

export default class ResidencyStatus extends BaseComponent {
    static options = [
        {value: 'CONSTRUCTED', label: 'Non Resident Indian', imageStyle: ResidencyStatusStyle.iconNRI},
        {value: 'UNDER_CONSTRUCTION', label: 'Holder of PIO Card', imageStyle: ResidencyStatusStyle.iconPIOCardHolder},
        {value: 'PURCHASE_LAND_AND_CONSTRUCT', label: 'Parents are Indian citizens', imageStyle: ResidencyStatusStyle.iconIndianParents}
    ];

    state = {
        selectedType: this.props.value
    }

    render() {
        let radioItems = ResidencyStatus.options.map(
            (option) => (
            <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-2 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.value} name='residencyStatus' onChange={this.handleResidencyStatusSelection} checked={this.state.selectedType === option.value}/>
            </DecorateWithImageAndLabel>
        )
    );

return (
    <div className= {ResidencyStatusStyle.container}>
        {radioItems}
        <div className="slideSecondHeader" style={{margin: "10px auto"}}>Residence Country</div>
    </div>
)
}

handleResidencyStatusSelection = (event) => {
    let value = event.target.value;
    this.setState({selectedType: value}, () => {this.notifyCompletion()});
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