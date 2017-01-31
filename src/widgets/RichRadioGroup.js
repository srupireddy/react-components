import React from 'react';
import {RadioGroup, Radio} from 'react-radio-group';

class RichRadioGroup extends React.Component {
  render() {
    let radioItems = this.props.items.map(
      (item) => (
        <div key={item.value} className={this.props.itemContainerStyle}>
          <span className={item.imageStyle}/>
          <div/>
          {item.label || item.value}
          <div/>
          <Radio value={item.value} />
        </div>
      )
    );

    return (
      <RadioGroup name={this.props.name} selectedValue={this.props.selectedValue} onChange={this.props.onChange} className="row">
        {radioItems}
      </RadioGroup>
    );
  }
}

export default RichRadioGroup;
