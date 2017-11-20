import React from 'react';
import {connect} from 'react-redux';

import * as appAction from '../redux/actions/app';
import Vuseritem from '../components/Vuseritem';

import user from '../img/profile.png';

class Vuserlist extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
	}

	render() {
		return (
			<div className="vuserlist">
				<div className="container">
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
					<Vuseritem src={user} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({vuser: state.vuser, user: state.user});

export default connect (mapStateToProps) (Vuserlist);
