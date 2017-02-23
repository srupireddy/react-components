/**
 * Created by srikanth on 16/2/17.
 */

/*
 NEVER DO:
    * mutute the arguments
    * no api calls and routing transitions
    * no calls to non pure functions e.g. Date.now() or Math.random()
 */

import ActionTypes from '../actions/actions';
import Immutable from 'immutable';
import SlideManager from '../containers/SlideManager'

const reducer = function(state, action) {
    switch (action.type) {
        case 'COLLECT_DATA':
            var current = Immutable.Map(state);

            if(state.model == null || state.model == undefined) {
                var emptyModel = {model:{}};
                current = Immutable.Map(emptyModel).merge(current);
            }
            // construct data model from the action
            var dataObj = {};
            dataObj[action.modelPath] = action.data;
            var dataModelMap = Immutable.Map(dataObj);

            //merge model contents
            var modelContents = Immutable.Map(current.toJS().model).merge(dataModelMap);
            dataModelMap = Immutable.Map({model:modelContents.toJS()});

            //merge view and model
            var modified = Immutable.Map(current).merge(dataModelMap);
            var modifiedModel = modified.toJS();

            //determine the next slide
            var viewState = state.slideManager.moveSlide(modifiedModel.model, action.modelPath, 'next');
            var viewStateMap = Immutable.Map(viewState);
            modified = modified.merge(viewStateMap);

            return modified.toJS();
        case 'PREVIOUS_SLIDE':
            var current = Immutable.Map(state);

            //view model
            var viewState = state.slideManager.previous();
            var viewStateMap = Immutable.Map(viewState);

            var modified = current.merge(viewStateMap);

            return modified.toJS();
        default:
            return state;
    }
}

export {reducer};

