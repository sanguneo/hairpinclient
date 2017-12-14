import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import * as vuserAction from '../redux/actions/vuser';

class Designitem extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		regDate: PropTypes.string.isRequired,
		nickname: PropTypes.string.isRequired,
		signhash: PropTypes.string.isRequired,
		designHash: PropTypes.string.isRequired
	}
	constructor(props) {
		super(props);
	}
	render() {
		return (<li className="designitem">
			{/*<Link to="/design" className="link" onClick={()=> {*/}
				// this.props.dispatch(vuserAction.vuserset({signhash: this.props.signhash}));
			// }}>
				<img className="thumb" src={`http://hpserver.sanguneo.com/upload/profiles/${this.props.signhash}`} alt="profile" />
				<div className="nickname">{this.props.name}</div>
				<div className="title">{this.props.name}</div>
			{/*</Link>*/}
		</li>)
	}
}

const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (Designitem);