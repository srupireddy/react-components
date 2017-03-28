export const ActionType = {
    STORE_DATA_AND_MOVE_ACTION: 'STORE_DATA_AND_MOVE_ACTION',
};

export const storeDataAndMoveToNextSlide = (data) => {
    return {type: ActionType.STORE_DATA_AND_MOVE_ACTION, data};
}
