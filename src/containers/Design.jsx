import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import * as userAction from '../redux/actions/user';
import * as appAction from '../redux/actions/app';
import * as designAction from '../redux/actions/design';

import Util from '../services/util_svc';

class Design extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			designHash: null,
			designRegdate: null,
			designLeftImageSrc: null,
			designRightImageSrc: null,
			designTitle: '',
			designTag: [],
			designRecipe: '',
			designComment: ''
		}
	}


	getDesign(signhash, designHash) {
		console.log(signhash, designHash);
		this.props.dispatch(appAction.loading());
		axios.post(
			`http://hpserver.sanguneo.com/design/getdesign`,
			{signhash, designHash},
			{
				headers : {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					nekotnipriah: this.props.user.token ? this.props.user.token : 'none'
				}
			}
		).then((response) => {
			if (response.data.message === 'success') {
				const {designHash, title, recipe, comment, publish, upDate, regDate, tags} = response.data.design;
				this.setState({
					designHash: designHash,
					designRegdate: regDate,
					designLeftImageSrc: null,
					designRightImageSrc: null,
					designTitle: title,
					designTag: tags,
					designRecipe: recipe,
					designComment: comment
				});
			}
			this.props.dispatch(appAction.loaded());
		}).catch(e => {
			console.log('error', e);
			this.props.dispatch(appAction.loaded());
		});
	}

	componentWillMount() {
		// this.props.dispatch(appAction.loading());
		if(this.props.design.signhash && this.props.design.designHash &&  this.props.design.signhash !=='' &&  this.props.design.designHash  !=='') {
			window.sessionStorage.setItem('design', JSON.stringify({signhash: this.props.design.signhash, designHash: this.props.design.designHash}))
			this.getDesign(this.props.design.signhash, this.props.design.designHash);
		} else {
			const {design} = window.sessionStorage;
			if (design && design !== ''){
				const designObj = JSON.parse(design);
				this.props.dispatch(designAction.designset(designObj));
				this.getDesign(designObj.signhash, designObj.designHash);
			}
		}
	}

	render() {
		const ORG = `http://hpserver.sanguneo.com/upload/designs/${this.props.design.signhash}_${this.props.design.designHash}_ORG.scalb`;
		const tags = this.state.designTag.map((tag, idx) => <input key={idx} type="button" value={'#' + tag} onClick={()=> {console.log(tag)}}/>);
		return (
			<div className="design">
				<div className="container">
					<img className="photo" src={ORG} alt="profile" />
					<div className="formLabel">기본정보</div>
					<div className="formWrapper wrap">
						<div className="column">
							<div className="clabel">제목</div>
							<div className="ccontent">{this.state.designTitle || this.state.designTitle !== '' ? this.state.designTitle : Util.isoFormatter(this.state.designRegdate)}</div>
						</div>
						<div className="column">
							<div className="clabel">태그</div>
							<div className="ccontent" style={{marginTop: -5, marginBottom: -5}}>
								{tags}
							</div>
						</div>
					</div>
					<div className="formLabel">레시피</div>
					<div className="formWrapper">
						{this.state.designRecipe || '레시피가 없습니다'}
					</div>
					<div className="formLabel">코멘트</div>
					<div className="formWrapper">
						{this.state.designComment || '코멘트가 없습니다'}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({user: state.user, app: state.app, design: state.design});

export default connect (mapStateToProps) (Design);
