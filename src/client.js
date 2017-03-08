import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';

import Slide from './slideCore/SlideManager.js';
import SlideStateReducer from './slideCore/SlideStateReducer';

/*BB Global Style*/
import './styles/bootstrap.css';
import './styles/bbglobal.css';

/*React Component Style*/
import './styles/react-tooltip.css';
import './styles/react-rangeslider.scss';
import './styles/react-datepicker.css';
import './styles/react-autosuggest.css';

let rootReducer = combineReducers({slide: SlideStateReducer});
let preloadedState = {}

const reduxToolEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const globalStore = createStore(rootReducer, preloadedState, reduxToolEnhancer);

ReactDOM.render(
    <Provider store={globalStore}>
        <Slide />
    </Provider>,
    document.getElementById('elig-slide-content')
);
