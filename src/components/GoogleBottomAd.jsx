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
	render() {
		let classList = 'googlebottomad';
		classList += this.props.app.bottomad ? ' showed' : '';
		return (<div className={classList}>
			<ins className="adsbygoogle"
				 style={{display:'inline-block',width:320 + 'px',height:50 + 'px'}}
				 data-ad-client="ca-pub-4210320191405594"
				 data-ad-slot="7313477468"></ins>
		</div>);
	}
}
const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (GoogleBottomAd);