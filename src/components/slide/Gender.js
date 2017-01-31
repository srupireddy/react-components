import React from 'react';
import RichRadioGroup from '../../widgets/RichRadioGroup.js'
import GenderStyle from './Gender.css';

class Gender extends React.Component {
  constructor(props) {
    super(props);
    this.handleGenderSelection = this.handleGenderSelection.bind(this);
  }

  selectedValue() {
    // By default React expects the value of a Form Element to be undefined or null for it to be uncontrolled.
    // We shouldnt change a uncontrolled element to controlled (Refer https://github.com/facebook/react/issues/6779)
    // Therefore explicitly setting it as ''
    return this.props.data || ''
  }

  isInValidState() {
    return this.selectedValue() != '';
  }

  handleGenderSelection(value) {
    this.props.onCompletionOfAction(value);
  }

  render() {
    let genderRadioItemsConfig = [
      {value: 'Male', imageStyle: GenderStyle.iconMale},
      {value: 'Female', imageStyle: GenderStyle.iconFemale}
    ];

    return (
      <RichRadioGroup
          name='gender'
          selectedValue={this.selectedValue()}
          onChange={this.handleGenderSelection}
          items={genderRadioItemsConfig}
          itemContainerStyle='col-xs-6 col-sm-6 col-md-6 text-center'
        />
    );
  }
}

export default Gender;
