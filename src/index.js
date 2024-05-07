import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';

import './style/style.scss';

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )