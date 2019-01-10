import { createReducer } from "redux-act";

import * as actions from "./auth.actions";


const initialState = {
	user: null,
	userStatus: "pending"
};

const reducer = {
	[actions.setCurrentUser]: (state, user) => ({
		...state,
		user:user,
		userStatus: "success"
	}),
	[actions.currentUserUnset]: (state) => ({
		...state,
		user:null,
		userStatus: "success"
	})
};


export default createReducer(reducer, initialState);
