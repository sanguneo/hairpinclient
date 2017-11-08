import React from 'react';
import axios from 'axios';

import Util from '../services/util_svc';

class Notice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: []
		}
	}
	componentWillMount() {
		this.getNotices();
	}

	getNotices() {
		axios.get('http://calbum.sanguneo.com/notice/list').then((response) => {
			if(response.data.code === 310) {
				this.setState({
					rows: response.data.notice.map((e) => {
						return <li key={e._id}><div>{e.title}</div><div>{Util.isoFormatter(e.regDate)}</div></li>;
					})
				});
			} else {
				console.log('error');
			}
		}).catch(e => {console.log(e)})
	}

	render() {
		return (
			<div className="notice">
				<ul className="container">
					{this.state.rows}
				</ul>
			</div>
		);
	}
}

export default Notice;