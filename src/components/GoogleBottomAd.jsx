import React from 'react';
import {connect} from 'react-redux';

import * as appAction from '../redux/actions/app';

import '../css/@googlead.scss';

class GoogleBottomAd extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		(adsbygoogle = window.adsbygoogle || []).push({});
	}
	hide() {
		this.props.dispatch(appAction.bottomadhide());
		setTimeout(() => {
			this.props.dispatch(appAction.bottomadshow());
		}, 30000);
	}
	render() {
		let classList = 'googlebottomad';
		classList += this.props.app.bottomad ? ' showed' : '';
		return (<div className={classList}>
			<div className="closeBtn" onClick={() => {this.hide()}} />
			<ins className="adsbygoogle"
				 style={{display:'inline-block', width: `320px`, height: `50px`}}
				 data-ad-client="ca-pub-4210320191405594"
				 data-ad-slot="7313477468" />
		</div>);
	}
}
const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (GoogleBottomAd);