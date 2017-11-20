import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import * as appAction from '../redux/actions/app';

import Util from '../services/util_svc';

class Notice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: [],
			showNotice: false,
			title: '',
			regDate: '',
			content: '',
		}
	}
	componentDidMount() {
		this.getNotices();
		document.getElementsByClassName('shadow')[0].onclick = () => {
			this.setState({showNotice: false});
		}
	}
	componentWillUnmount() {
		document.getElementsByClassName('shadow')[0].onclick = () => {}
	}

	getNotices() {
		this.props.dispatch(appAction.loading());
		axios.get('http://hpserver.sanguneo.com/notice/list').then((response) => {
			if(response.data.code === 310) {
				this.setState({
					rows: response.data.notice.map((e) => <li key={e._id} onClick={()=> {this.getNotice(e._id)}}><div>{e.title}</div><div>{Util.isoFormatter(e.regDate)}</div></li>)
				}, () => {
					this.props.dispatch(appAction.loaded());
				});
			} else {
				console.log('error');
			}
		}).catch(e => {console.log(e)})
	}
	getNotice(_id) {
		axios.get(`http://hpserver.sanguneo.com/notice/${_id}`).then((response) => {
			if(response.data.code === 340) {
				const res = response.data.notice;
				res.regDate = Util.isoFormatter(res.regDate);
				res.content = res.content.replace(/\\n/g, '<br />');
				this.props.dispatch(appAction.shadowin());
				this.setState({
					showNotice: true,
					...res
				});
			} else {
				console.log('error');
			}
		}).catch(e => {console.log(e)})
	}
	close() {
		this.setState({showNotice: false});
		this.props.dispatch(appAction.shadowout());
	}

	render() {
		return (
			<div className="notice">
				<ul className="container">
					{this.state.rows}
				</ul>
				<div className={this.state.showNotice ? 'viewer opened' : 'viewer'}>
					<div className="closeBtn" onClick={() => this.close()}></div>
					<div className="title">{this.state.title}</div>
					<div className="regdate">{this.state.regDate}</div>
					<div className="content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (Notice);