import React from 'react';

import {TextField, IconTextField} from '../widgets/HTMLInputElements'
import ExperienceStyle from './Experience.scss';

export default class Experience extends React.Component {
    isInValidState() {
        return true;
    }
    
    render() {
        return (
            <div className={ExperienceStyle.container}>
                <IconTextField/>
            </div>
        )
    }
}