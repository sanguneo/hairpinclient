import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import * as designAction from '../redux/actions/design';
import Util from '../services/util_svc';

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
			<Link to="/design" className="link" onClick={()=> this.props.dispatch(designAction.designset({signhash: this.props.signhash, designHash: this.props.designHash}))}>
				<img className="thumb" src={`http://hpserver.sanguneo.com/upload/designs/${this.props.signhash}_${this.props.designHash}_THUMB.scalb`} alt="profile" />
				<div className="nickname">{this.props.nickname}</div>
				<div className="title">{this.props.title || this.props.title !== '' ? this.props.title : Util.isoFormatter(this.props.regDate)}</div>
			</Link>
		</li>)
	}
}

const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (Designitem);