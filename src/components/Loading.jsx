import React from 'react';
import {connect} from 'react-redux';

import * as appAction from '../redux/actions/app';

import loading from '../img/loading.svg';

class Loading extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let classList = 'loading';
		classList += this.props.app.loading ? ' showed' : '';
		return (<div className={classList} onClick={()=> this.props.dispatch(appAction.shadowmenuout())}>
			<img src={loading} />
		</div>)
	}
}

const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (Loading);