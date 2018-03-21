/* eslint-disable no-underscore-dangle */
import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import WordCloud from '../ext/react-d3-cloud';

import * as appAction from '../redux/actions/app';
import * as designAction from '../redux/actions/design';

import Searchbox from '../components/Searchbox';

const fontSizeMapper = word => Math.log2(word.value) * 10;


class Tagcloud extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			queryString: '',
			lastQueryString: '#undefined',
			tags: [],
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
			`http://hpserver.sanguneo.com/design/tags/7`,
			{
				headers : {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					nekotnipriah: this.props.user.token ? this.props.user.token : 'none'
				}
			}
		).then((response) => {
			if (response.data.message === 'success') {
				const {tags} = response.data;
				const tagsArr = [];
				let key;
				let maxArr = []; for (key in tags) maxArr.push(tags[key]); let max = Math.max.apply(null, maxArr);let rate = 50/max;
				for (key in tags) tagsArr.push({text:key, value: tags[key]*rate});
				this.setState({
					tags: tagsArr
				}, () => {
					setTimeout(() => {this.props.dispatch(appAction.loaded());},500);
				});

				console.log(tagsArr);
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
				height: window.innerHeight - 260,
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

	goDesignListByTag(tag) {
		this.props.dispatch(designAction.tagset(tag));
		this.props.history.push('/designlistbytag');
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
					{this.state.tags.length <= 0 ?
						<div className="noresult" style={{height: this.state.height-100, lineHeight: this.state.height-100}}>검색결과가 없습니다.</div> :
						<WordCloud
							data={this.state.tags}
							font='Noto Sans KR'
							fontSizeMapper={fontSizeMapper}
							width={this.state.width}
							height={this.state.height}
							onClickWord={(e) => this.goDesignListByTag(e.text)}
						/>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({user: state.user});

export default connect (mapStateToProps) (Tagcloud);
