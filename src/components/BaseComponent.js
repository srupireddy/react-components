import React from 'react';
import ActionHandler from './ActionHandler.js';
import CollectionUtils from '../utils/CollectionUtils';

export default class BaseComponent extends React.Component {
    static propTypes = {
        modelKey: React.PropTypes.string.isRequired,
        handler: React.PropTypes.instanceOf(ActionHandler).isRequired
    }

    notifyCompletion = (value) => {
        this.props.handler.onCompletion(this.props.modelKey, value);
    }

    static configurableProperties() {
        let baseUnwantedProperties = CollectionUtils.everythingExceptKey(BaseComponent.propTypes, 'modelKey');
        return CollectionUtils.differenceBetween(this.propTypes, baseUnwantedProperties);
    }
}