export const ActionType = {
    REPLACE_ACTIVE_MODEL: 'REPLACE_ACTIVE_MODEL',
    TRACK_COMPONENT_DATA: 'TRACK_COMPONENT_DATA',
    SLIDE_MOVED_FORWARD: 'SLIDE_MOVED_FORWARD',
    SLIDE_MOVED_BACKWARD: 'SLIDE_MOVED_BACKWARD',
    UPDATE_PREFILL_DATA: 'UPDATE_PREFILL_DATA'
};

export const replaceActiveModel = (replacingModel) => {
    return {type: ActionType.REPLACE_ACTIVE_MODEL, replacingModel};
}

export const trackComponentData = (key, payload) => {
    return {type: ActionType.TRACK_COMPONENT_DATA, key, payload};
}

export const slideMovedForward = (fsmState, model) => {
    return {type: ActionType.SLIDE_MOVED_FORWARD, fsmState, model};
}

export const slideMovedBackward = () => {
    return {type: ActionType.SLIDE_MOVED_BACKWARD};
}

export const updatePrefillDataTable = (key, payload) => {
    return {type: ActionType.UPDATE_PREFILL_DATA, key, payload};
}

export const completeComponentDataCollectionAndConsequences = (key, payload, slideManager) => {
    return (dispatch, getGlobalState) => {
        let prevSlide = slideManager.currentSlide();

        // Merge the new changes with the Active Model tracked in Redux
        dispatch(trackComponentData(key, payload));
        let activeModelAfterPrevSlide = getGlobalState().slide.activeModel;

        // Move the State Machine forward
        slideManager.nextSlide(activeModelAfterPrevSlide);
        
        // Track the Slide Transition History along with the ActiveModel state at that point in time.
        dispatch(slideMovedForward(prevSlide, activeModelAfterPrevSlide));
        dispatch(updatePrefillDataTable(key, payload));        
    }
}

export const goBackToPreviousSlide = (slideManager) => {
    return (dispatch, getGlobalState) => {
        let prevSlide = getGlobalState().slide.transitionHistory.slice(-1).pop();
        dispatch(replaceActiveModel(prevSlide.model));
        slideManager.setCurrentSlide(prevSlide.state);

        dispatch(slideMovedBackward());
        dispatch(updatePrefillDataTable('1', '2'));        
    }
}