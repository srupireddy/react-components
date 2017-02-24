import {Map, List} from 'immutable';
import {combineReducers} from 'redux';

import {ActionType} from './SlideActions.js';

const activeModelReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.COMPONENT_COMPLETE_DATA_COLLECTED:
            if (!action.modelKey) {
                return state;
            }

            return Map(state).merge(Map().set(action.modelKey, action.value)).toJS();
        default:
            return state;
    }
}

const historyReducer = (state = {}, action) => {
    return state;
}

const flattenReducer = (state = {}, action) => {
    return state;
}

export const slideStateReducer = combineReducers({
    activeModel: activeModelReducer,
    modelsHistory: historyReducer,
    historyFlattened:  flattenReducer
});