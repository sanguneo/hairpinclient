import React from 'react';
import {connect} from 'react-redux';

import {NavLink} from 'react-router-dom';

import * as appAction from '../redux/actions/app';

import '../css/header.scss';

class Menu extends React.Component {
	constructor(props) {
		super(props);
	}

	menuclose() {
		this.props.dispatch(appAction.shadowmenuout());
	}

	render() {
		let classList = 'nav';
		classList += window.location.pathname !== '/' ? ' thin' : '';
		classList += this.props.app.menuopened ? ' opened' : ''
		return (<ul className={classList}>
			<li className="item">
				<NavLink to="/" className="link" exact activeClassName="active" onClick={()=> this.menuclose()}>
					메인
				</NavLink>
			</li>
			<li className="item">
				<NavLink to="/features" className="link" activeClassName="active" onClick={()=> this.menuclose()}>
					기능
				</NavLink>
			</li>
			<li className="item">
				<NavLink to="/notice" className="link" activeClassName="active" onClick={()=> this.menuclose()}>
					공지사항
				</NavLink>
			</li>
		</ul>);
	}
}



const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (Menu);
