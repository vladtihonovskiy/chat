import thunk from "redux-thunk";
import { compose, createStore, combineReducers, applyMiddleware } from "redux";

import auth from "./auth/auth.reducer";

const rootReducer = combineReducers({ auth });

const store = createStore(rootReducer, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
))


export default store;
