import React from 'react';
import {RadioGroup, Radio} from 'react-radio-group';
import richstyle from './RichRadioGroup.css';

class RichRadioGroup extends React.Component {
  render() {
    let radioItems = this.props.items.map(
      (item) => (
        <div key={item.value} className={this.props.itemContainerStyle}>
         <label className={richstyle.eformColSection}>
          <span className={item.imageStyle}/>
          <span className={richstyle.richinfo}>{item.label || item.value}</span>
          <Radio value={item.value} />
        </label>
        </div>
      )
    );

    return (
      <RadioGroup name={this.props.name} selectedValue={this.props.selectedValue} onChange={this.props.onChange} className= {richstyle.oneRow}>
        {radioItems}
      </RadioGroup>
    );
  }
}

export default RichRadioGroup;
