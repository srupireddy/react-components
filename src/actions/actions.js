/*
  Action types
 */

export const ActionTypes  = {
    NEXT_SLIDE:'NEXT_SLIDE',
    PREVIOUS_SLIDE:'PREVIOUS_SLIDE',
    COLLECT_DATA:'COLLECT_DATA'
};


/**
 * Action creators
 */

export function collectData(name, payload) {
    return {type: ActionTypes.COLLECT_DATA, modelPath: name, data: payload};
}

export function previousSlide(name, payload) {
    return {type: ActionTypes.PREVIOUS_SLIDE, modelPath: name, data: payload};
}

export function loadSlide(name, payload) {
    return {type: ActionTypes.LOAD_SLIDE, modelPath: name, data: payload};
}

export function nextSlide(name, payload) {
    return {type: ActionTypes.NEXT_SLIDE, modelPath: name, data: payload};
}
