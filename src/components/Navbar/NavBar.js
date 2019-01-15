import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { string } from 'prop-types';

const styles = {
	root: {
		display: "flex",
		padding: "10px"
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
		width: 50,
		height: 50,
		marginRight: "15px"
	},
};

class NavBar extends React.Component {
	static propTypes = {
		avatarUrl: string,
		userName: string
	}

	render() {
		const { classes, avatarUrl, userName } = this.props;

		return (
			<div className={`${classes.root} navbar`}>
				<div className={classes.nameWrapper}>
					<Avatar
						alt="Avatar"
						src={avatarUrl}
						className={classes.bigAvatar}
					/>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						{ userName }
					</Typography>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(NavBar);
