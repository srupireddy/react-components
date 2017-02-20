import React from 'react';

import {TextField, IconTextField} from '../widgets/HTMLInputElements'

import RangeSlider from '../widgets/RangeSliderNew.js'

import ExperienceStyle from './Experience.scss';

export default class Experience extends React.Component {
    isInValidState() {
        return true;
    }
    
    render() {
        return (
                <div>
            <div className={ExperienceStyle.container}>
                <IconTextField/>

            </div>

         <RangeSlider/>

        </div>
)
    }
}