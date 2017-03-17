/*BB Global Style*/
import './styles/bootstrap.css';
import './styles/bbglobal.css';

/*React Component Style*/
import './styles/react-tooltip.css';
import './styles/react-rangeslider.scss';
import './styles/react-datepicker.css';
import './styles/react-autosuggest.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';

import SlideManager from './slideCore/SlideManager.js';
import SlideViewContainer from './slideCore/SlideView.js';
import SlideStateReducer from './slideCore/SlideStateReducer';

let slideManager = new SlideManager(slideManagerConfig);
let rootReducer = combineReducers({slide: SlideStateReducer});
let preloadedState = {
    slide: {
        main: {
            past: [], 
            present: {
                slideManager: slideManager, 
                activeSlide: slideManager.activeSlide(),
                model: {}
            }, 
            future: []
        }
    }
}

const reduxToolEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const globalStore = createStore(rootReducer, preloadedState, reduxToolEnhancer);

ReactDOM.render(
    <Provider store={globalStore}>
        <SlideViewContainer slideManager={slideManager}/>
    </Provider>,
    document.getElementById('elig-slide-content')
);
