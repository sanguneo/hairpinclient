/* eslint-disable no-underscore-dangle */
import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import WordCloud from '../ext/react-d3-cloud';

import * as appAction from '../redux/actions/app';

import Searchbox from '../components/Searchbox';

const fontSizeMapper = word => Math.log2(word.value) * 10;


class Tagcloud extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			queryString: '',
			lastQueryString: '#undefined',
			items: [],
			width: 200,
			height: 200,
			goToLogin: false
		}
		this.resizeTimer = null;
		this.zeroLength = this.zeroLength.bind(this);
		this.resize = this.resize.bind(this);
	}

	zeroLength(event) {
		const {name, value} = event.target;
		if(name === 'queryString' && value === '') this.searchTag();
	}

	searchTag(queryarg) {
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
			`http://hpserver.sanguneo.com/design/tag/${query}`,
			{
				headers : {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					nekotnipriah: this.props.user.token ? this.props.user.token : 'none'
				}
			}
		).then((response) => {
			if (response.data.message === 'success') {
				// this.setState({
				// 	items: response.data.tags.map((itemSrc) => ({text: itemSrc._id, value: itemSrc.count*5, signhash: itemSrc.signhash}))
				// }, () => {
					setTimeout(() => {this.props.dispatch(appAction.loaded());},500);
				// });
				console.log(response.data.tags);
				this.resize();
			} else {
				setTimeout(() => {this.props.dispatch(appAction.loaded());},500);
				console.log('error', response.data);
			}
		}).catch(e => {
			console.log('error', e);
		});
	}

	resize(){
		clearTimeout(this.resizeTimer);
		this.resizeTimer = setTimeout(() => {
			this.setState({
				height: window.innerHeight - 160,
				width: window.innerWidth
			})
		}, 100);
	}

	componentWillMount() {
		this.searchTag();
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
			<div className="tagcloud">
				<div className="container">

					<Searchbox ref={ref => this.tagsearch = ref}
							   name="queryString" placeholder="검색어를 입력해주세요."
							   defaultValue={this.state.queryString}
							   onZeroLength={this.zeroLength}
							   onChange={(e) => {this.tagsearch.setState({[e.target.name] : e.target.value});this.zeroLength(e)}}
							   onSearch={() => {this.searchTag(this.tagsearch.state.queryString)}}
					/>
					<WordCloud
						data={this.state.items}
						font='Noto Sans KR'
						fontSizeMapper={fontSizeMapper}
						width={this.state.width}
						height={this.state.height}
						onClickWord={(e) => console.log(e.signhash)}
					/>
					{this.state.items.length <= 0 ? <div className="noresult">검색결과가 없습니다.</div> : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({user: state.user});

export default connect (mapStateToProps) (Tagcloud);
