/*
  Action types
 */

export const ActionTypes  = {
    LOAD_SLIDE:'LOAD_SLIDE',
    NEXT_SLIDE:'NEXT_SLIDE',
    PREVIOUS_SLIDE:'PREVIOUS_SLIDE',
    ADD_ATTRIBUTE:'ADD_ATTRIBUTE',
    VIEW_OFFERS: 'VIEW_OFFERS',
    AUTO_COMPLETE_CITY: 'AUTO_COMPLETE_CITY',
    AUTO_COMPLETE_EMPLOYER: 'AUTO_COMPLETE_EMPLOYER'
};


/**
 * Action creators
 */

export function addAttribute(name, payload) {
    return {type: ActionTypes.ADD_ATTRIBUTE, name: name, data: payload};
}

export function previousSlide(name, payload) {
    return {type: ActionTypes.PREVIOUS_SLIDE, name: name, data: payload};
}

export function loadSlide(name, payload) {
    return {type: ActionTypes.LOAD_SLIDE, name: name, data: payload};
}

export function nextSlide(name, payload) {
    return {type: ActionTypes.NEXT_SLIDE, name: name, data: payload};
}
