
/* eslint-disable react/prefer-stateless-function,react/jsx-no-bind,react/forbid-prop-types,react/sort-prop-types,react/no-unused-prop-types */
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, withRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { object, string, bool, func, any } from "prop-types";

import routes from "./constans/routes";


import { LoaderContainer, loader } from "./components/Loader/Loader";

import PrivateRoute from "./components/PrivateRouter/PrivateRouter";
import Header from "./components/Header/Header";

import HomePage from "./containers/HomePage/HomePage";
import LoginPage from "./containers/LoginPage/LoginPage";
import NotFoundPage from "./containers/NotFoundPage/NotFoundPage";


import * as authActions from "./modules/auth/auth.actions";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {

	componentDidMount() {
		this.props.getCurrentUserIfExist();
	}

	// componentDidMount() {
	// 	loader.show();
	// }

	render() {
		return (
			<div>
				<ToastContainer />
				<LoaderContainer />
				{ this.props.user && <Header avatarUrl={this.props.user.photoURL} userName={this.props.user.displayName}  /> }
				<Switch>
					<PrivateRoute
						exact
						path={routes.homePage}
						state={this.props.user}
						to={routes.login}
						component={HomePage}
					/>

					<PrivateRoute
						exact
						path={routes.login}
						state={!this.props.user}
						to={routes.homePage}
						component={LoginPage}
					/>
					<PrivateRoute
						exact
						path={""}
						state={this.props.user}
						to={routes.login}
						component={NotFoundPage}
					/>
				</Switch>
			</div>
		);
	}
}


function mapStateToProps({ auth }) {
	return {
		user: auth.user,
		userStatus: auth.userStatus,
	};
}

export default withRouter(connect(mapStateToProps, { ...authActions })(App));
