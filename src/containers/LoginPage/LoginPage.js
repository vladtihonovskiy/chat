/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/forbid-prop-types,react/jsx-no-bind */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import { func } from "prop-types";
import Grid from '@material-ui/core/Grid';
import Login from "../../components/Login/Login";
import * as authActions from "../../modules/auth/auth.actions";

import routes from "../../constans/routes";

class LoginPage extends Component {
	static propTypes = {
		userLogin: func,
	};

	onConfirmButtonClick = () => {
		this.props.userLogin();
	}

	render() {
		return (
			<Fragment>
				<Grid
					container
					direction="row"
					justify="center"
					spacing={24}
				>
					<Grid
						item
						lg={8}
						xs={10}
					>
						<h1>Login</h1>
						<Login
							onConfirmButtonClick={this.onConfirmButtonClick}
							redirectRoutes={routes.registration}
							redirectText="Do not have account ?"
							headerText="User Login"
						/>
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

export default connect(null, { ...authActions })(LoginPage);
