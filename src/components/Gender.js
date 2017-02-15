import React from 'react';
import {RadioGroup} from 'react-radio-group';

import Radio from '../widgets/Radio.js'
import GenderStyle from './Gender.scss';

class Gender extends React.Component {
  constructor(props) {
    super(props);
    this.handleGenderSelection = this.handleGenderSelection.bind(this);
  }

  isInValidState() {
    return this.props.data != '';
  }

  handleGenderSelection(value) {
    this.props.onCompletionOfAction(value);
  }

  render() {
    let genderRadioItemsConfig = [
      {value: 'Male', imageStyle: GenderStyle.iconMale},
      {value: 'Female', imageStyle: GenderStyle.iconFemale}
    ];

    let radioItems = genderRadioItemsConfig.map(
      (item) => (<Radio key={item.value} value={item.value} imageStyle={item.imageStyle} containerStyle='col-md-5 col-xs-5 float-none inline-block'/>)
    );

    return (
      <RadioGroup name='gender' selectedValue={this.props.data} onChange={this.handleGenderSelection} className={GenderStyle.container}>
        {radioItems}
      </RadioGroup>
    );
  }
}

export default Gender;
