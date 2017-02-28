import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';

import Slide from './slideCore/SlideManager.js';
import {slideStateReducer} from './slideCore/SlideStateReducer';

/*BB Global Style*/
import './styles/bootstrap.css';
import './styles/bbglobal.css';

/*React Component Style*/
import './styles/react-tooltip.css';
import './styles/react-rangeslider.css';
import './styles/react-datepicker.css';

let rootReducer = combineReducers({slide: slideStateReducer});
let preloadedState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const globalStore = createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={globalStore}>
        <Slide />
    </Provider>,
    document.getElementById('root')
);