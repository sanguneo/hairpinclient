import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import * as vuserAction from '../redux/actions/vuser';

import user from '../img/profile.png';

class Vuser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signhash: '',
			nickname : 'noname',
			followersize: 0,
			followingsize: 0,
			designsize: 0,
			_id: null
		}
	}

	getUserInfo(signhash){
		axios.get(
			`http://hpserver.sanguneo.com/user/vuser/${signhash}`,
			{},
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		).then((response) => {
			if (response.data.message === 'success') {
				this.setState({
					signhash: response.data.signhash,
					nickname : response.data.nickname,
					followersize: response.data.followersize,
					followingsize: response.data.followingsize,
					_id: response.data._id
				},() => {
					this.forceUpdate();
				});
			} else if (response.data.message === 'noaccount')  {
				alert('사용자 정보가 존재하지 않습니다.')
			}
		}).catch(e => {
			console.log('error', e);
		});
	}

	componentWillMount() {
		let vuserhashonsession = window.sessionStorage.getItem('vuserhash');
		if(this.props.vuser.signhash && this.props.vuser.signhash !== ''){
			window.sessionStorage.setItem('vuserhash' ,this.props.vuser.signhash);
			this.getUserInfo(this.props.vuser.signhash);
		} else if(vuserhashonsession && vuserhashonsession !== ''){
			this.getUserInfo(vuserhashonsession);
		}
	}

	render() {
		const userIcon = (this.state.signhash && this.state.signhash !== ''
				? `http://hpserver.sanguneo.com/upload/profiles/${this.state.signhash}`
				: user
		);
		return (
			<div className="vuser">
				<div className="container">
					<img className="photo" src={userIcon} alt="profile" />
					<div className="info">
						<div className="username">{this.state.nickname ? this.state.nickname : 'noname'}</div>
						<div className="myCounts">
							<div className="designcnt">
								<div className="indi">{this.state.designsize}</div>
								<div className="label">designs</div>
							</div>
							<div className="follower">
								<div className="indi">{this.state.followersize}</div>
								<div className="label">follower</div>
							</div>
							<div className="following">
								<div className="indi">{this.state.followingsize}</div>
								<div className="label">following</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({vuser: state.vuser, user: state.user});

export default connect (mapStateToProps) (Vuser);
