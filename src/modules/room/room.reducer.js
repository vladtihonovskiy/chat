import { createReducer } from "redux-act";

import * as actions from "./room.actions";


const initialState = {
	roomId: null,
	roomUser: [],
	roomExisting: "pending",
	messages: []
};

const reducer = {
	[actions.setCurrentRoom]: (state, id) => ({
		...state,
		roomId:id,
		roomExisting: true
	}),

	[actions.roomNotExist]: (state) => ({
		...state,
		roomExisting: false
	}),

	[actions.roomPendingStart]: (state) => ({
		...state,
		roomExisting: "pending"
	}),
	[actions.setAllUsersInRoom]: (state, users) => ({
		...state,
		roomUser: users
	}),
	[actions.setAllMessageInRoom]: (state, messages) => ({
		...state,
		messages
	}),
};


export default createReducer(reducer, initialState);
