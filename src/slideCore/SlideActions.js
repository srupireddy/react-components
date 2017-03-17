export const ActionType = {
    COLLECT_DATA_ACTION: 'COLLECT_DATA_ACTION',
};

export const collectDataAndMoveToNextSlide = (key, value) => {
    return {type: ActionType.COLLECT_DATA_ACTION, key, value};
}
