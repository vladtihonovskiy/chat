import React, { Component } from 'react';
import { func } from "prop-types";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import * as roomActions from "../../modules/room/room.actions";
import "./HomePage.css";

class HomePage extends Component {
	static propTypes = {
		createNewRoomIfNotExist: func
	}

	state = {
		newRoomId: "",
		connectToRoomId: ""
	}

	onInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	onCreateNewRoom = () => {
		this.props.createNewRoomIfNotExist(this.state.newRoomId);
	}

	onConnectToRoomBtnClick = () => {
		this.props.getCurrentRomIfExist(this.state.connectToRoomId);
	}

	render() {
		return (
			<div className="home-page">
				<div className="form">
					<div className="button-wrapper">
						<TextField
							label="Создать комноту с Id"
							onChange={this.onInputChange}
							margin="normal"
							name="newRoomId"
							fullWidth
							variant="outlined"
						/>

						<Button onClick={this.onCreateNewRoom} variant="contained" color="primary">
							Создать
						</Button>
					</div>

					<div className="button-wrapper">
						<TextField
							label="Подключится к комноте"
							onChange={this.onInputChange}
							margin="normal"
							name="connectToRoomId"
							fullWidth
							variant="outlined"
						/>

						<Button onClick={this.onConnectToRoomBtnClick} variant="contained" color="secondary">
							Подключится
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { ...roomActions })(HomePage);
