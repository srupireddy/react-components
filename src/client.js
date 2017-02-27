import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {combineReducers, createStore } from 'redux';

import Slide from './containers/SlideManager.js';
import {slideStateReducer} from './containers/SlideStateReducer';

/*BB Global Style*/
import './styles/bootstrap.css';
import './styles/bbglobal.css';

/*React Component Style*/
import './styles/react-tooltip.css';
import './styles/react-rangeslider.css';
import './styles/react-datepicker.css';

let rootReducer = combineReducers({slide: slideStateReducer});
let globalStore = createStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <Provider store={globalStore}>
        <Slide />
    </Provider>,
    document.getElementById('root')
);