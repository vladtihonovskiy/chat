import { createAction } from "redux-act";

import { firebaseAuth, firebaseApp } from "../../config/firebase";

import { loader } from "../../components/Loader/Loader";


// user
export const setCurrentUser = createAction("set current user");

export const getCurrentUserIfExist = () => (dispatch) => {
	loader.show();
	firebaseAuth.onAuthStateChanged((user) => {
		loader.show();
		if (user) {
			dispatch(setCurrentUser(user));
			loader.hide();
		} else {
			dispatch(currentUserUnset());
			loader.hide();
		}
	});
};

export const userLogin = () => (dispatch) => {
	loader.show();

	const googleProvider = new firebaseApp.auth.GoogleAuthProvider();
	googleProvider.setCustomParameters({
		prompt: 'select_account'
	});

	firebaseAuth.signInWithPopup(googleProvider).then((result)=> {
		dispatch(setCurrentUser(result.user));
		loader.hide();
	}).catch(function(error) {
		loader.hide();
		console.log(error);
	});
}

export const currentUserUnset = createAction("current user unset / logout user");
