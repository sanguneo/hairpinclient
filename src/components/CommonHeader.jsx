import React from 'react';
import {NavLink} from 'react-router-dom';
import hairpinLogo from './../img/logo.png';

const CommonHeader = () => (
	<header className="commonHeader">
		<img className="logo" src={hairpinLogo} alt="hairpin"/>
		{/*<h1 className="title"></h1>*/}
		<ul className="nav">
			<li className="item">
				<NavLink to="/" className="link" exact activeClassName="active">
					{' '}Home{' '}
				</NavLink>
			</li>
			<li className="item">
				<NavLink to="/features" className="link" activeClassName="active">
					{' '}Features{' '}
				</NavLink>
			</li>
		</ul>
	</header>
);

export default CommonHeader;
