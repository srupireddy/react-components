import {Map, List} from 'immutable';
import {combineReducers} from 'redux';
import undoable from 'redux-undo'

import {ActionType} from './SlideActions.js';

const mainReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.STORE_DATA_AND_MOVE_ACTION:
            let newModel = Map(state.model).merge(action.data).toJS();
            let nextSlide = state.slideManager.peekIntoNextSlide(newModel, state.activeSlide);
            return {...state, model: newModel, activeSlide: nextSlide};
        default:
            return state;
    }
}

const prefillDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.STORE_DATA_AND_MOVE_ACTION:
            let modelDelta = action.data;       
            return Map(state).merge(modelDelta).toJS();
        default:
            return state;
    }
}

export default combineReducers({
    main: undoable(mainReducer),
    prefillData: prefillDataReducer
});
