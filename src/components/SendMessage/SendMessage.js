import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';

import TextField from '@material-ui/core/TextField';

import { func } from 'prop-types';
import * as roomActions from "../../modules/room/room.actions";
import * as authCation from "../../modules/auth/auth.actions";
import { connect } from "react-redux";

const styles = {
	root: {
		display: "flex",
		position: "fixed",
		bottom: "0",
		left: "0",
		right: "0",
		width: "calc(100% - 350px)",
		marginLeft:"350px"
	},
	textField: {
		width: "80%"
	}
};

class SendMessage extends React.Component {
	static propTypes = {
		sendButtonClick: func
	}

	state = {
		message: ""
	}

	componentDidMount() {

	}

	onMessageChange = (event) => {
		this.setState({
			message: event.target.value
		})
	}

	onSendMessageBtnClick = () => {
		debugger;
		if(this.state.message.length !== 0) {
			this.props.sendMessage(this.state.message);
			this.props.sendButtonClick();
			this.setState({
				message: ""
			})
		}
	}

	onEnterKeyPress = (e) => {
		debugger;
		if (e.key === 'Enter') {
			this.onSendMessageBtnClick();
		}
	}

	render() {

		const { classes } = this.props;

		const { message } = this.state;

		return (
			<div className={classes.root}>
				<TextField
					onKeyPress={this.onEnterKeyPress}
					id="standard-multiline-flexible"
					label="Multiline"
					// multiline
					rowsMax="4"
					margin="normal"
					className={classes.textField}
					value={message}
					onChange={this.onMessageChange}
				/>

				<Button onClick={this.onSendMessageBtnClick} variant="fab" color="primary" aria-label="Edit">
					<Send />
				</Button>
			</div>
		);
	}
}

function mapStateToProps({ auth, room }) {
	return {
		roomId: room.roomId,
		roomUser: room.roomUser,
		user: auth.user,
	};
}
export default connect( mapStateToProps, { ...authCation ,...roomActions })(withStyles(styles,  { withTheme: true })(SendMessage));
