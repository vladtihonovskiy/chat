import thunk from "redux-thunk";
import { compose, createStore, combineReducers, applyMiddleware } from "redux";

import auth from "./auth/auth.reducer";
import room from "./room/room.reducer";

const rootReducer = combineReducers({ auth, room });

const store = createStore(rootReducer, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
))


export default store;
