export const augmentToModel = (key, payload) => {
    return {
        type: 'AUGMENT_MODEL', 
        modelKey: name, 
        value: payload
    };
}

export const previousSlide = () => {
    return {
        type: 'PREVIOUS_SLIDE'
    };
}

export const nextSlide = () => {
    return {
        type: 'NEXT_SLIDE'
    };
}
