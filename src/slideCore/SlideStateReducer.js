import {Map, List} from 'immutable';
import {combineReducers} from 'redux';

import {ActionType} from './SlideActions.js';

const activeModelReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.TRACK_COMPONENT_DATA:
            return Map(state).merge(Map().set(action.key, action.payload)).toJS();
        case ActionType.REPLACE_ACTIVE_MODEL:
            return action.replacingModel;
        default:
            return state;
    }
}

const historyReducer = (state = [], action) => {
    switch (action.type) {
        case ActionType.SLIDE_MOVED_FORWARD:
            return List(state).push({state: action.fsmState, model: action.model}).toJS();
        case ActionType.SLIDE_MOVED_BACKWARD:
            return List(state).pop().toJS();
        default:
            return state;
    }
}

const prefillDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.UPDATE_PREFILL_DATA:
            return Map(state).merge(Map().set(action.key, action.payload)).toJS();
        default:
            return state;
    }

    return state;
}

export const slideStateReducer = combineReducers({
    activeModel: activeModelReducer,
    transitionHistory: historyReducer,
    prefillData:  prefillDataReducer
});