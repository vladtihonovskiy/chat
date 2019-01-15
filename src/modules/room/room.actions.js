import { createAction } from "redux-act";

import { firebaseApp } from "../../config/firebase";

import { loader } from "../../components/Loader/Loader";

import customToastify from "../../customFunction/customToastify";

import history from "../../constans/history";

export const setCurrentRoom = createAction("set current room");
export const roomNotExist = createAction("room not exist");
export const roomPendingStart = createAction("room pending start");

export const setAllUsersInRoom = createAction("set all users in room");
export const setAllMessageInRoom = createAction("set all message in room");

export const createNewRoomIfNotExist = (id) =>(dispatch, getState) => {
	loader.show()
	firebaseApp.database().ref(`rooms/${id}`).once('value',
		(snapshot) => {
			if (snapshot.val()) {
				customToastify("Данная комната уже сущетствует", "error");
				loader.hide();
			}else {
				const currentUser = getState().auth.user;
				firebaseApp.database().ref(`rooms/${id}/users/${currentUser.uid}`).set({
					displayName: currentUser.displayName,
					photoURL: currentUser.photoURL,
					state: "online"
				});
				dispatch(setCurrentRoom(id));

				history.push(`/room/${id}`);
				loader.hide();
			}
		});
}

export const getAllUserInRom = (id) => (dispatch) => {
	firebaseApp.database().ref(`rooms/${id}/users`).on('value',
		(snapshot) => {
			if (snapshot.val()) {
				let users = [];
				Object.keys(snapshot.val()).map(key => {
					let userData = snapshot.val()[key];
					userData.id = key;
					users.push(userData);
				});
				dispatch(setAllUsersInRoom(users));
			}
		});
}


export const getCurrentRoomMessage = () => (dispatch, getState) => {
	const roomId = getState().room.roomId;

	firebaseApp.database().ref(`rooms/${roomId}/message`).on('value',
		(snapshot) => {
			if (snapshot.val()) {
				let message = [];
				Object.keys(snapshot.val()).map(key => {
					let messageData = snapshot.val()[key];
					messageData.id = key;
					message.push(messageData);
				});
				dispatch(setAllMessageInRoom(message));
			}
		});
}

export const getCurrentRomIfExist = (id) => (dispatch, getState) => {
	loader.show();
	dispatch(roomPendingStart());
	firebaseApp.database().ref(`rooms/${id}`).on('value',
		(snapshot) => {
			if (snapshot.val()) {
				const currentUser = getState().auth.user;
				firebaseApp.database().ref(`rooms/${id}/users/${currentUser.uid}`).set({
					displayName: currentUser.displayName,
					photoURL: currentUser.photoURL,
					state: "online"
				});

				dispatch(setCurrentRoom(id));

				history.push(`/room/${id}`);
				loader.hide();

			} else {
				customToastify("Данной комнаты не сущетствует", "error");
				dispatch(roomNotExist());
				loader.hide();
			}
		});
};


export const sendMessage = (messageText) => (dispatch, getState) => {
	const roomId = getState().room.roomId;
	const currentUser = getState().auth.user;

	firebaseApp.database().ref(`rooms/${roomId}/message/${Date.now()}`).set({
		displayName: currentUser.displayName,
		photoURL: currentUser.photoURL,
		messageText: messageText,
		uid: currentUser.uid,
	});
}
