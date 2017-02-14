import React, {Component} from 'react';

import {Inputfield, InputfieldGroup} from '../widgets/Inputfield.js'

import ExperienceStyle from './Experience.scss';

class Experience extends Component {
  isInValidState() {
    return true;
  }
  
  render() {
    return (
        <div className={ExperienceStyle.container}>
        <Inputfield />
        </div>
    )
  }
}

export default Experience;
