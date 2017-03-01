import {Map, List} from 'immutable';
import {combineReducers} from 'redux';
import undoable from 'redux-undo'

import {ActionType} from './SlideActions.js';

const slideReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.NEXT_SLIDE_ACTION:
            let modelDelta = {[action.key]: action.payload};
            let newModel = Map(state.model).merge(modelDelta).toJS();
            let nextSlide = action.slideManager.peekIntoNextSlide(state.activeSlide, newModel);
            return {model: newModel, activeSlide: nextSlide};
        default:
            return state;
    }
}

export default undoable(slideReducer);
