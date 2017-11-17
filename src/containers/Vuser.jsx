import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import * as vuserAction from '../redux/actions/vuser';

import user from '../img/profile.png';

class Vuser extends React.Component {
	constructor(props) {
		super(props);
	}

	getUserInfo(signhash) {
		/*axios.post(
			'https://hpserver.sanguneo.com/user/login',
			userinfo,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		).then((response) => {
			precallback();
			if (response.data.message === 'success') {
				const resUserinfo = {
					token: response.data.token,
					// eslint-disable-next-line no-underscore-dangle
					_id: response.data._id,
					email: response.data.email,
					signhash: response.data.signhash,
					name: response.data.nickname,
					status: true
				};
				window.sessionStorage.setItem('hairpinToken', JSON.stringify(resUserinfo));
				dispatch(login(resUserinfo));
			} else if (response.data.message === 'noaccount')  {
				alert('사용자 정보가 존재하지 않습니다.\n가입하시겠습니까?')
			} else if (response.data.message === 'invalidpw')  {
				alert('패스워드를 다시 확인해주세요.');
			}
		}).catch(e => {
			console.log('error', e);
		});*/
	}

	componentWillMount() {

	}

	render() {
		const userIcon = (this.props.vuser.signhash !== ''
				? `http://hpserver.sanguneo.com/upload/profiles/${this.props.vuser.signhash}`
				: user
		);
		return (
			<div className="vuser">
				<div className="container">
					<img className="photo" src={userIcon} alt="profile" />
					<div className="info">
						<div className="username">{this.props.vuser.signhash ? this.props.vuser.signhash : 'noname'}</div>
						<div className="myCounts">
							<div className="follower">
								<div className="indi">19</div>
								<div className="label">designs</div>
							</div>
							<div className="following">
								<div className="indi">19</div>
								<div className="label">following</div>
							</div>
							<div className="designcnt">
								<div className="indi">19</div>
								<div className="label">follower</div>
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
