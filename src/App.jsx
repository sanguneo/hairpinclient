// @flow
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

/* eslint-disable */
import './favicon.ico?output=favicon.ico';
/* eslint-enable */
import './css/app.scss';

import Routes from './routes/routes';

const App = () => (
    <Router>
        <Routes />
    </Router>
);

export default App;
