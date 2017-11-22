import React from 'react';
import {connect} from 'react-redux';

import * as appAction from '../redux/actions/app';

import '../css/@googlead.scss';

class GoogleBottomAd extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let classList = 'googlebottomad';
		classList += this.props.app.bottomad ? ' showed' : '';
		return (<div className={classList}>
			<script type='text/javascript'>
				google_ad_client = 'ca-pub-4210320191405594';
				google_ad_slot = '7313477468';
				google_ad_width = 320;
				google_ad_height = 50;
			</script>
			<script type='text/javascript' src='//pagead2.googlesyndication.com/pagead/show_ads.js'></script>
		</div>);
	}
}
const mapStateToProps = state => ({app: state.app});

export default connect (mapStateToProps) (GoogleBottomAd);