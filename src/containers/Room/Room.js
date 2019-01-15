import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';

import { connect } from "react-redux";

import { func, array, any, object, string } from "prop-types";

import * as roomActions from "../../modules/room/room.actions";

import NavBar from "../../components/Navbar/NavBar";

import SendMessage from "../../components/SendMessage/SendMessage";
import ChatField from "../../components/ChatField/ChatField";

const styles = {
	mainWrapper: {
		display: "flex"
	},
	root: {
		height: "calc(100vh - 89px)",
		minWidth: "250px",
		border: "1px solid #000000",
		overflow: "scroll",
	},
	fullWidth: {
		width: "100%"
	},
	chatWrapper: {
		overflowY: "scroll",
		position: "fixed",
		width: "calc(100% - 255px)",
		height: "calc(100% - 215px)"
	}
};


class Room extends Component {
	constructor(props) {
		super(props);
		this.chatContainerHeight = React.createRef();
	}

	static propTypes = {
		classes: object,
		getAllUserInRom: func,
		getCurrentRomIfExist: func,
		getCurrentRoomMessage: func,
		messages: array,
		roomExisting: any,
		roomId: any,
		roomUser: array,
		userUid: string
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.roomId && nextProps.roomId) {
			this.props.getAllUserInRom(nextProps.roomId);
			this.props.getCurrentRoomMessage();
		}
	}

	componentDidMount() {
		if (!this.props.roomId) {
			this.props.getCurrentRomIfExist(this.props.match.params.id);
		} else {
			this.props.getAllUserInRom(this.props.roomId);
			this.props.getCurrentRoomMessage();
		}
	}

	onUserSendMessage = () => {
		// console.log(this.chatContainerHeight.current.scrollHeight);
		// this.chatContainerHeight.current.scrollTop = this.chatContainerHeight.current.scrollHeight
		// console.log("onUserSendMessage");
	}

	scrollToBottomElement = () => {
		//window.scrollTo({ top: this.state.contactRef.offsetTop, behavior: 'smooth' });
		this.chatContainerHeight.current.scrollTo({ top: this.chatContainerHeight.current.scrollHeight, behavior: 'smooth' });
		//this.chatContainerHeight.current.scrollTop = this.chatContainerHeight.current.scrollHeight
	}

	render() {
		const { roomExisting, classes, roomUser, messages, userUid } = this.props;

		let scrollBottomCheck;
		if (this.chatContainerHeight.current) {
			if (this.chatContainerHeight.current.scrollHeight - this.chatContainerHeight.current.scrollTop <= 1500) {
				scrollBottomCheck = true;
			}
		} else {
			scrollBottomCheck = false;
		}
		return (
			<div>
				{ (roomExisting !== "pending" && !roomExisting) &&
				<h1> Такой комнаты не сущетсвет </h1>
				}

				{ (roomExisting !== "pending" && roomExisting) &&
				<div className={classes.mainWrapper}>
					<div className={classes.root}>
						{ roomUser.map((user) => {
							return (<NavBar key={user.id} avatarUrl={user.photoURL} userName={user.displayName} />);
						}) }
					</div>

					<div className={classes.fullWidth}>
						<div ref={this.chatContainerHeight} className={classes.chatWrapper}>
							{ messages.map((message, index) => {
								if (messages.length === index + 1) {
									return (
										<ChatField
											key={message.id}
											avatarUrl={message.photoURL}
											userName={message.displayName}
											message={message.messageText}
											userUid={userUid}
											messageId={message.uid}
											scrollToBottom={this.scrollToBottomElement}
											selfUserMessage={message.uid === userUid || scrollBottomCheck}
											lastMessage
										/>);
								}
								return (
									<ChatField
										key={message.id}
										avatarUrl={message.photoURL}
										userName={message.displayName}
										message={message.messageText}
										userUid={userUid}
										messageId={message.uid}
									/>);
							})
							}
						</div>
					</div>
					<SendMessage sendButtonClick={this.onUserSendMessage} />
				</div>
				}

			</div>
		);
	}
}


function mapStateToProps({ room, auth }) {
	return {
		roomExisting: room.roomExisting,
		roomId: room.roomId,
		roomUser: room.roomUser,
		messages: room.messages,
		userUid: auth.user.uid
	};
}
export default connect(mapStateToProps, { ...roomActions })(withStyles(styles,  { withTheme: true })(Room));
