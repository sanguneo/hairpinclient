import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import * as vuserAction from '../redux/actions/vuser';

class Vuseritem extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (<li className="vuseritem">
			<Link to="/vuser" className="link" onClick={()=> {
				this.props.dispatch(vuserAction.vuserset({signhash: this.props.signhash}));
			}}>
				<img className="photo" src={`http://${location.host}/upload/profiles/${this.props.signhash}`} alt="profile" />
				<div className="username">{this.props.name}</div>
			</Link>
		</li>)
	}
}
Vuseritem.propTypes = {
	name: PropTypes.string.isRequired,
	signhash: PropTypes.string.isRequired
}

const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (Vuseritem);