
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import 'normalize.css/normalize.css';
// import '@blueprintjs/core/lib/css/blueprint.css';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();