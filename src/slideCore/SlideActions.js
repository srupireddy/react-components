export const ActionType = {
    AUGMENT_ACTIVE_MODEL: 'AUGMENT_ACTIVE_MODEL',

    MOVE_SLIDE_FORWARD: 'MOVE_SLIDE_FORWARD',
    MOVE_SLIDE_BACKWARD: 'MOVE_SLIDE_BACKWARD',
};

export const augmentActiveModel = (key, payload) => {
    return {type: ActionType.AUGMENT_ACTIVE_MODEL, key, payload};
}

export const moveSlideForward = (model, slideManager) => {
    return {type: ActionType.MOVE_SLIDE_FORWARD, model, slideManager};
}

export const moveSlideBackward = () => {
    return {type: ActionType.MOVE_SLIDE_BACKWARD};
}

export const updateModelAndShowNextSlide = (key, payload, slideManager) => {
    return (dispatch, getGlobalState) => {
        dispatch(augmentActiveModel(key, payload));
        dispatch(moveSlideForward(getGlobalState().slide.activeModel, slideManager));
    }
}

export const goBackToPreviousSlide = (slideManager) => {
    return (dispatch, getGlobalState) => {
        dispatch(moveSlideBackward());
    }
}