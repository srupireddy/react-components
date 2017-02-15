import React, {Component} from 'react';

import {TextField, IconTextField} from '../widgets/TextField.js'

import ExperienceStyle from './Experience.scss';

class Experience extends Component {
  isInValidState() {
    return true;
  }
  
  render() {
    return (
        <div className={ExperienceStyle.container}>
        <TextField />
        </div>
    )
  }
}

export default Experience;
