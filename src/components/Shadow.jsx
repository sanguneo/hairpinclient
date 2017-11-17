import React from 'react';
import {connect} from 'react-redux';

import * as appAction from '../redux/actions/app';

class Shadow extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let classList = 'shadow';
		classList += this.props.app.shadow ? " showed" : "";
		return <div className={classList} onClick={()=> this.props.dispatch(appAction.shadowmenuout())} />
	}
}

const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (Shadow);
