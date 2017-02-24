import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Slide, {slideStateReducer} from './containers/SlideManager.js';
import { createStore } from 'redux';

let globalStore = createStore(slideStateReducer);

ReactDOM.render(
    <Provider store={globalStore}>
        <Slide />
    </Provider>,
    document.getElementById('root')
);