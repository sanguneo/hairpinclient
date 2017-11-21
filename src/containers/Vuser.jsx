import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';


import * as appAction from '../redux/actions/app';
import Util from '../services/util_svc';
import user from '../img/profile.png';

class Vuser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signhash: '',
			nickname : 'noname',
			amIfollowing: false,
			designsize: 0,
			followersize: 0,
			followingsize: 0,
			_id: null,
			goToLogin: false
		}
	}

	getUserInfo(signhash){
		if (!this.props.user.token || this.props.user.token === ''){
			alert('로그인 되어있지 않습니다.\n로그인페이지로 이동합니다.');
			this.setState({
				goToLogin: true
			});
			return;
		}
		this.props.dispatch(appAction.loading());
		axios.get(
			`http://hpserver.sanguneo.com/user/vuser/${signhash}`,
			{
				headers : {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					nekotnipriah: this.props.user.token ? this.props.user.token : 'none'
				}
			}
		).then((response) => {
			if (response.data.message === 'success') {
				this.setState({
					signhash: response.data.signhash,
					nickname : response.data.nickname,
					amIfollowing : response.data.amIfollowing,
					designsize: response.data.designsize,
					followersize: response.data.followersize,
					followingsize: response.data.followingsize,
					_id: response.data._id
				},() => {
					setTimeout(() => {this.props.dispatch(appAction.loaded());},500);
					//this.forceUpdate();
				});
			} else if (response.data.message === 'noaccount')  {
				setTimeout(() => {this.props.dispatch(appAction.loaded());},500);
				alert('사용자 정보가 존재하지 않습니다.')
			}
		}).catch(e => {
			console.log('error', e);
		});
	}

	sendFollow(){
		this.props.dispatch(appAction.loading());
		axios.post(
			`http://hpserver.sanguneo.com/user/${(!this.state.amIfollowing ? 'follow' : 'unfollow')}`,
			{signhash: this.state.signhash},
			{
				headers : {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					nekotnipriah: this.props.user.token ? this.props.user.token : 'none'
				}
			}
		).then((response) => {
			if (response.data.message === 'success') {
				const stateQuery =
					! this.state.amIfollowing
					? {followersize: this.state.followersize + 1}
					: {followersize: this.state.followersize - 1};
				stateQuery.amIfollowing = !this.state.amIfollowing;
				this.setState(stateQuery, () => {
					this.props.dispatch(appAction.loaded());
				});
			}
		}).catch(e => {
			console.log('error', e);
		});
	}

	componentWillMount() {
		const vuserhashOnSession = window.sessionStorage.getItem('vuserhash');
		if(this.props.vuser.signhash && this.props.vuser.signhash !== '') {
			window.sessionStorage.setItem('vuserhash' ,this.props.vuser.signhash);
			this.getUserInfo(this.props.vuser.signhash);
		} else if(vuserhashOnSession && vuserhashOnSession !== '') {
			this.getUserInfo(vuserhashOnSession);
		}
	}

	render() {
		if(this.state.goToLogin) {
			return <Redirect push to="/login" />;
		}
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
								<div className="indi">{Util.readablized(this.state.designsize)}</div>
								<div className="label">designs</div>
							</div>
							<div className="follower">
								<div className="indi">{Util.readablized(this.state.followersize)}</div>
								<div className="label">follower</div>
							</div>
							<div className="following">
								<div className="indi">{Util.readablized(this.state.followingsize)}</div>
								<div className="label">following</div>
							</div>
						</div>
						<input type="button" value={this.state.amIfollowing ? 'Unfollow' : 'Follow'} onClick={()=> {this.sendFollow()}}/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({vuser: state.vuser, user: state.user});

export default connect (mapStateToProps) (Vuser);
