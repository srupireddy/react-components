import React from 'react';
import {RadioGroup} from 'react-radio-group';

import RichRadio from '../widgets/RichRadio.js'
import GenderStyle from './Gender.css';
import RadioStyle from '../widgets/RichRadio.css';

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
      (item) => (<RichRadio key={item.value} value={item.value} imageStyle={item.imageStyle} containerStyle='col-md-3 col-xs-3 float-none inline-block'/>)
    );

    return (
      <RadioGroup name='gender' selectedValue={this.props.data} onChange={this.handleGenderSelection} className={RadioStyle.oneRow}>
        {radioItems}
      </RadioGroup>
    );
  }
}

export default Gender;
