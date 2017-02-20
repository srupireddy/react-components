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
import merge from 'lodash/merge';
import Immutable from 'immutable';
import SlideManager from '../containers/SlideManager'

const initialState = {};

const addAttribute = function(state, action) {
    switch (action.type) {
        case 'ADD_ATTRIBUTE':
            var current = Immutable.Map(state);

            // data model
            var dataObj = {};
            dataObj[action.name] = action.data;
            var dataModelMap = Immutable.Map(dataObj);

            var modified = current.merge(dataModelMap);

            return modified.toJS();
        case 'LOAD_SLIDE':
            var viewState = SlideManager.firstSlide(state);
            var current = Immutable.Map(state);
            var viewStateMap = Immutable.Map(viewState);
            var modified = current.merge(viewStateMap);
            return modified.toJS();
        case 'NEXT_SLIDE':
            var current = Immutable.Map(state);

            //view model
            var viewState = SlideManager.moveSlide(state, action.name, 'next');
            var viewStateMap = Immutable.Map(viewState);

            var modified = current.merge(viewStateMap);

            return modified.toJS();
        case 'PREVIOUS_SLIDE':
            var current = Immutable.Map(state);

            //view model
            var viewState = SlideManager.previous();
            var viewStateMap = Immutable.Map(viewState);

            var modified = current.merge(viewStateMap);

            return modified.toJS();
        default:
            return state;
    }
}

export {addAttribute};

