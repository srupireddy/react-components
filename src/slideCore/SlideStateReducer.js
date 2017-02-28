import {Map, List} from 'immutable';
import {combineReducers} from 'redux';

import {ActionType} from './SlideActions.js';

const activeModelReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.AUGMENT_ACTIVE_MODEL:
            return Map(state).merge(Map().set(action.key, action.payload)).toJS();
        case ActionType.REPLACE_ACTIVE_MODEL:
            return action.replacingModel;
        default:
            return state;
    }
}

const transitionsReducer = (state = {activeSlide: null, history: []}, action) => {
    switch (action.type) {
        case ActionType.MOVE_SLIDE_FORWARD:
            let currentModel = action.model;
            let currentSlide = state.activeSlide || action.slideManager.initialSlide();
            let prevHistoricalData = List(state.history).last() || {slidesVisited: []};

            let nextSlide = action.slideManager.peekIntoNextSlide(currentSlide, currentModel);
            let previouslyVisitedSlides = List(prevHistoricalData.slidesVisited).push(currentSlide);

            let history = List(state.history).push({slidesVisited: previouslyVisitedSlides, modelPointInTime: currentModel});
            return Map(state).merge(Map({activeSlide: nextSlide, history: history})).toJS();
        case ActionType.MOVE_SLIDE_BACKWARD:
            let prevHistory = List(state.history);
            let prevData = List(prevHistory).last();
            prevHistory.pop();

            let previousSlide = List(prevData.slidesVisited).last();
            let modelPointInTime = prevData.modelPointInTime;

            return Map(state).merge(Map({activeSlide: previousSlide, history: prevHistory})).toJS();
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
    transitions: transitionsReducer,
    prefillData:  prefillDataReducer
});