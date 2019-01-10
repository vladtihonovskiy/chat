import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from './App';
//import store from "./modules/store";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import store from "./modules/store";

import history from "./constans/history";
const theme = createMuiTheme({
});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<Router history={history}>
				<App />
			</Router>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root'));
