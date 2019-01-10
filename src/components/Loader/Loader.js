/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles/index";
import { any }  from "prop-types";
import * as ee from 'event-emitter';
import "./Loader.css";

const styles = ({
	root: {
		height: '100vh',
		width: '100vw',
		boxSizing: 'border-box',
		zIndex: 999,
		overflow: 'hidden',
		position: 'fixed',
		top: 0,
		left: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.7)'
	}
});

class LoaderContainer1 extends Component {
	static propTypes = {
		classes: any
	}

	state = {
		visible: false
	};

	componentWillMount() {
		if (!window.LoaderEmitter) {
			window.LoaderEmitter = ee();
		}
		window.LoaderEmitter.on('show', this.onShow);
		window.LoaderEmitter.on('hide', this.onHide);
	}

	componentWillUnmount() {
		window.LoaderEmitter.off('show', this.onShow);
		window.LoaderEmitter.off('hide', this.onHide);
	}

	onShow = () => {
		this.setState({ visible: true });
	};

	onHide = () => {
		this.setState({ visible: false });
	};

	render() {
		if (!this.state.visible) {
			return null;
		}
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div className="lds-roller"><div /><div /><div /><div /><div /><div /><div /><div /></div>
			</div>
		);
	}
}

class Loader1 {
	static getEmitter() {
		if (!window.LoaderEmitter) {
			return null;
		}

		return window.LoaderEmitter;
	}

	static show() {
		const em = Loader1.getEmitter();
		if (em) {
			em.emit('show');
		}
	}

	static hide() {
		const em = Loader1.getEmitter();
		if (em) {
			em.emit('hide');
		}
	}
}

export const LoaderContainer = withStyles(styles)(LoaderContainer1);
export const loader = Loader1;
