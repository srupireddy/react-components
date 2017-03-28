import React from 'react';
import ActionHandler from './ActionHandler.js';
import CollectionUtils from '../utils/CollectionUtils';

export default class BaseComponent extends React.Component {
    static propTypes = {
        modelKey: React.PropTypes.string.isRequired,
        value: React.PropTypes.any,
        handler: React.PropTypes.instanceOf(ActionHandler).isRequired
    }

    validate() {
        // Since Javascript doesnt have Abstract Methods, returning FALSE always so that concrete Component
        // developers do forcefully extend this.
        return false;
    }

    getData() {
        // Since Javascript doesnt have Abstract Methods, returning {} always so that concrete Component
        // developers do forcefully extend this.
        return {};
    }

    notifyCompletion = () => {
        this.props.handler.onCompletion(this.getData());
    }

    static configurableProperties() {
        let baseUnwantedProperties = CollectionUtils.everythingExceptKey(BaseComponent.propTypes, 'modelKey');
        return CollectionUtils.differenceBetween(this.propTypes, baseUnwantedProperties);
    }
}