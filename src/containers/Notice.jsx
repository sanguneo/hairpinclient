import React from 'react';
import axios from 'axios';

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

	getNotices = () => {
		axios.get('http://calbum.sanguneo.com/notice/list').then((response) => {
			if(response.data.code === 310) {
				this.setState({
					rows: response.data.notice.map((e) => <span key={e._id}>{e.title}</span>)
				});
			} else {
				console.log('error');
			}
		}).catch(e => {console.log(e)})
	}

	render() {
		return (
			<div className="notice">
				{this.state.rows}
			</div>
		);
	}
}

export default Notice;
