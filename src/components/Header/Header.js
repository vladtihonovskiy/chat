import React from 'react';
import PropTypes from 'prop-types';
import { string } from 'prop-types';

import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { firebaseAuth } from "../../config/firebase";

const styles = {
	root: {
		flexGrow: 1,
		position: "fixed",
		width: "100%",
		zIndex: "999",
		top: "0"
	},
	headerWrapper: {
		display: "flex",
		justifyContent: "space-between",
	},
	nameWrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	bigAvatar: {
		width: 60,
		height: 60,
	},
	linkStyle: {
		textDecoration: "none",
		color: "#fff"
	}
};

class MenuAppBar extends React.Component {
	static propTypes = {
		avatarUrl: string,
		userName: string
	}

	state = {
		auth: true,
		anchorEl: null,
	};

	handleMenu = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};


	onLogoutBtnClick = () => {
		this.handleClose();
		firebaseAuth.signOut().then(() => {
		}).catch((error) => {
			// An error happened.
		});
	}

	render() {
		const { classes, avatarUrl, userName } = this.props;
		const { anchorEl } = this.state;
		console.log(classes);
		const open = Boolean(anchorEl);

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar className={classes.headerWrapper}>
						<Link className={classes.linkStyle} to={"/"}>
							<Typography variant="h6" color="inherit" className={classes.grow}>
							Telegram Killer )
							</Typography>
						</Link>
						<div className={classes.nameWrapper}>
							<Typography variant="h6" color="inherit" className={classes.grow}>
								{ userName }
							</Typography>
							<IconButton
								aria-owns={open ? 'menu-appbar' : null}
								aria-haspopup="true"
								onClick={this.handleMenu}
								color="inherit"
							>
								<Avatar
									alt="Avatar"
									src={avatarUrl}
									className={classes.bigAvatar}
								/>
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={this.handleClose}
							>
								<MenuItem onClick={this.onLogoutBtnClick}>LOGOUT</MenuItem>
							</Menu>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

MenuAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
