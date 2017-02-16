import React, {Component} from 'react';

import CityModal from '../widgets/Modal.js'

import {TextField, IconTextField} from '../widgets/TextField.js'

import ExperienceStyle from './Experience.scss';

class Experience extends Component {
  isInValidState() {
    return true;
  }
  
  render() {
    return (
        <div className={ExperienceStyle.container}>
             <CityModal />
        </div>
    )
  }
}

export default Experience;
