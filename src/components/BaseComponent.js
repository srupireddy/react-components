import React from 'react';
import ActionHandler from './ActionHandler.js';

export default class BaseComponent extends React.Component {
    static propTypes = {
        modelKey: React.PropTypes.string.isRequired,
        handler: React.PropTypes.instanceOf(ActionHandler).isRequired
    }

}