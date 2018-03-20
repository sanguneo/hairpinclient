import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';

import * as appAction from '../redux/actions/app';

import Designitem from '../components/Designitem';

import Util from '../services/util_svc';

class DesignlistByTag extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			fillers: [],
			goToLogin: false,
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.resize = this.resize.bind(this);
	}

	handleInputChange(event) {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		}, ((name === 'queryString' && value === '') ? this.searchDesign() : ()=>{}));
	}

	searchDesign() {
		if(!this.props.design.tag) return;
		if (!this.props.user.token || this.props.user.token === ''){
			alert('로그인 되어있지 않습니다.\n로그인페이지로 이동합니다.');
			this.setState({ goToLogin: true });
			return;
		}
		this.props.dispatch(appAction.loading());
		axios.get(
			`http://hpserver.sanguneo.com/design/tagdesigns/${this.props.design.tag}`,
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
					items: response.data.designs.sort((a,b)=> Util.isoToTimestamp(b.regDate) - Util.isoToTimestamp(a.regDate)).map(
						(itemSrc, idx) => <Designitem key={idx} nickname={itemSrc.nickname} signhash={itemSrc.signhash}
						                              regDate={itemSrc.regDate} designHash={itemSrc.designHash} title={itemSrc.title} />
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
		const ele = document.querySelector('.designresults');
		if(!ele.querySelector('.designitem:first-child').offsetWidth) return;
		const columns = Math.ceil(ele.offsetWidth / ele.querySelector('.designitem:first-child').offsetWidth) - 1;
		if (this.state.items.length < columns) return;
		const remains = columns - (this.state.items.length % columns);
		const fillers = [];
		for (let fillerIdx = 0; fillerIdx < remains; fillerIdx++)
			fillers.push(<li key={`fake_${fillerIdx}`} className="designitemfill" />);
		this.setState({fillers});
	}

	componentWillMount() {
		this.searchDesign();
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
			<div className="designlist">
				<div className="container">
					<ul className="designresults">
						{this.state.items}
						{this.state.fillers}
					</ul>
					{this.state.items.length <= 0 ? <div className="noresult">검색결과가 없습니다.</div> : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({vuser: state.vuser, user: state.user, design: state.design});

export default connect (mapStateToProps) (DesignlistByTag);
