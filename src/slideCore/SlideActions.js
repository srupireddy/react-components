export const ActionType = {
    COMPONENT_COMPLETE_DATA_COLLECTED: 'COMPONENT_COMPLETE_DATA_COLLECTED'
};

export const componentCompleteDataCollectedAction = (key, payload) => {
    return {type: ActionType.COMPONENT_COMPLETE_DATA_COLLECTED, modelKey: key, value: payload};
}
