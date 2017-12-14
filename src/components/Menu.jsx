import React from 'react';
import {connect} from 'react-redux';

import {NavLink} from 'react-router-dom';

import * as appAction from '../redux/actions/app';

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.menuclose = this.menuclose.bind(this);
	}

	menuclose() {
		this.props.dispatch(appAction.shadowmenuout());
	}

	render() {
		let classList = 'nav';
		classList += window.location.pathname !== '/' ? ' thin' : '';
		classList += this.props.app.menuopened ? ' opened' : '';
		return (<ul className={classList}>
			<li className="item">
				<NavLink to="/" className="link" exact activeClassName="active" onClick={this.menuclose}>
					메인
				</NavLink>
			</li>
			<li className="item">
				<NavLink to="" className="link" activeClassName="active" onClick={(e) => {e.preventDefault();alert('준비중입니다!');}/*this.menuclose*/}>
					디자인찾기
				</NavLink>
			</li>
			<li className="item">
				<NavLink to="/tagcloud" className="link" activeClassName="active" onClick={this.menuclose}>
					태그찾기
				</NavLink>
			</li>
			<li className="item">
				<NavLink to="/vuserlist" className="link" activeClassName="active" onClick={this.menuclose}>
					회원찾기
				</NavLink>
			</li>
			<li className="item">
				<NavLink to="/notice" className="link" activeClassName="active" onClick={this.menuclose}>
					공지사항
				</NavLink>
			</li>
		</ul>);
	}
}



const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (Menu);
