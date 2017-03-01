export const ActionType = {
    NEXT_SLIDE_ACTION: 'NEXT_SLIDE_ACTION'
};

export const nextSlideAction = (key, payload, slideManager) => {
    return {type: ActionType.NEXT_SLIDE_ACTION, key, payload, slideManager};
}
