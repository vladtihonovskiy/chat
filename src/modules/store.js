import createSagaMiddleware from 'redux-saga';
import { compose, createStore, combineReducers, applyMiddleware } from "redux";

const sagaMiddleware = createSagaMiddleware();

import { watchPosts } from "./posts/posts.saga";

import app from "./app/app.reducer";
import basket from "./basket/basket.reducer";
import posts from "./posts/posts.reducer";

const rootReducer = combineReducers({ app, basket, posts });

const store = createStore(rootReducer, undefined, compose(
	applyMiddleware(sagaMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

sagaMiddleware.run(watchPosts);
// store.dispatch(initialize());


export default store;
