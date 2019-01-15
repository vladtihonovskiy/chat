import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';

import Avatar from '@material-ui/core/Avatar';

import { string, func, bool } from 'prop-types';
import customToastify from "../../customFunction/customToastify";
import classnames from "classnames";

import "./ChartField.css";

const styles = {
	root: {
		display: "flex",
		padding: "10px",
		borderStyle: "dashed",
		width: "90%",
		margin: "15px auto"

	},
	headerWrapper: {
		display: "flex",
		justifyContent: "space-between",
	},
	nameWrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		minWidth: "153px",
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	bigAvatar: {
		width: 50,
		height: 50,
		marginRight: "15px"
	},
	messageText: {
		margin: "0",
		marginLeft: "20px",
		fontSize: "18px"
	},
	ownMessage: {
		flexDirection: "row-reverse"
	}
};

class ChatField extends React.Component {
	static propTypes = {
		avatarUrl: string,
		userName: string,
		message: string,
		userUid: string,
		messageId: string,
		scrollToBottom: func,
		selfUserMessage: bool,
		lastMessage: bool
	}

	state = {
		onExitingAnimation: false,
		mounted: false
	}

	componentDidMount() {
		if(this.props.lastMessage) {
			this.setState({
				mounted: true
			})
			if (this.props.selfUserMessage) {
				this.props.scrollToBottom();
			}else {
				customToastify("Вам новое сообщение", "success");
			}
		}
	}

	render() {
		const { classes, avatarUrl, userName, message, messageId, userUid } = this.props;

		const { onExitingAnimation, mounted } = this.state;

		return (
			<div
				// className={showMenuClasses}
			>
			<CSSTransition
				in={mounted} timeout={300} classNames={"fade-up"} onEnter={() => {
				this.setState({
					onExitingAnimation: true
				});
			}} onExited={() => {
				this.setState({
					onExitingAnimation: false
				});
			}}
			>
			<div className={`${classes.root} ${messageId === userUid ? classes.ownMessage: ""}`}>
				<div className={classes.nameWrapper}>
					<Avatar
						alt="Avatar"
						src={avatarUrl}
						className={classes.bigAvatar}
					/>
					<p className={classes.grow}>
						{ userName }
					</p>
				</div>
				<div className={classes.messageText}>
					<p  className={classes.grow}>
						{ message }
					</p>
				</div>
			</div>
			</CSSTransition>
			</div>
		);
	}
}

export default withStyles(styles)(ChatField);
