import React from 'react';
import {connect} from 'react-redux';

class Vuseritem extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (<div className="vuseritem">
			<img className="photo" src={this.props.src} alt="profile" />
			<div className="username">{'noname'}</div>
		</div>)
	}
}

const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (Vuseritem);