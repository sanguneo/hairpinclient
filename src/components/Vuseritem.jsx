import React from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import * as vuserAction from '../redux/actions/vuser';

class Vuseritem extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (<li className="vuseritem">
			<Link to="/vuser" className="link" onClick={()=> { this.props.dispatch(vuserAction.vuserset({signhash: this.props.signhash}));}}>
				<img className="photo" src={`http://hpserver.sanguneo.com/upload/profiles/${this.props.signhash}`} alt="profile" />
				<div className="username">{this.props.name}</div>
			</Link>
		</li>)
	}
}

const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (Vuseritem);