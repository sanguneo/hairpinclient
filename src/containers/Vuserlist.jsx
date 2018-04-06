import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';

import * as appAction from '../redux/actions/app';

import Vuseritem from '../components/Vuseritem';
import Searchbox from '../components/Searchbox';

class Vuserlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			queryString: '',
			lastQueryString: '#undefined',
			items: [],
			fillers: [],
			goToLogin: false
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.resize = this.resize.bind(this);
	}

	handleInputChange(event) {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		}, ((name === 'queryString' && value === '') ? this.searchUser() : ()=>{}));
	}

	searchUser(queryarg) {
		if (!this.props.user.token || this.props.user.token === ''){
			alert('로그인 되어있지 않습니다.\n로그인페이지로 이동합니다.')
			this.setState({
				goToLogin: true
			});
			return;
		}
		const query = queryarg || '';
		if (this.state.lastQueryString !== query) {
			this.setState({lastQueryString : query});
		} else return;
		this.props.dispatch(appAction.loading());
		axios.get(
			`http://${location.host}/user/searchuser/${query}`,
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
					items: response.data.user.map(
						(itemSrc) => <Vuseritem key={itemSrc._id} name={itemSrc.nickname} signhash={itemSrc.signhash} />
					)
				}, () => {
					setTimeout(() => {this.props.dispatch(appAction.loaded());},500);
				});
				this.resize();
			} else {
				setTimeout(() => {this.props.dispatch(appAction.loaded());},500);
				console.log('error')
			}

		}).catch(e => {
			console.log('error', e);
		});
	}

	resize(){
		const ele = document.querySelector('.vuserresults');
		const columns = Math.ceil(ele.offsetWidth / ele.querySelector('.vuseritem:first-child').offsetWidth) - 1;
		if (this.state.items.length < columns) return;
		const remains = columns - (this.state.items.length % columns);
		const fillers = [];
		for (let fillerIdx = 0; fillerIdx < remains; fillerIdx++)
			fillers.push(<li key={`fake_${fillerIdx}`} className="vuseritemfill" />);
		this.setState({fillers});
	}

	componentWillMount() {
		this.searchUser();
		window.addEventListener('resize', this.resize);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.resize);
	}

	render() {
		if(this.state.goToLogin) {
			return <Redirect push to="/login" />;
		}
		return (
			<div className="vuserlist">
				<div className="container">
					<Searchbox name="queryString" placeholder="검색어를 입력해주세요. (닉네임, 이메일)"
							   value={this.state.queryString}
							   onChange={this.handleInputChange}
							   onSearch={() => {this.searchUser(this.state.queryString)}}
					/>
					<ul className="vuserresults">
						{this.state.items}
						{this.state.fillers}
					</ul>
					{this.state.items.length <= 0 ? <div className="noresult">검색결과가 없습니다.</div> : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({vuser: state.vuser, user: state.user});

export default connect (mapStateToProps) (Vuserlist);
