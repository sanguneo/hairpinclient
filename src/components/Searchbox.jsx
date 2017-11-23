import React from 'react';
import PropTypes from 'prop-types';
import '../css/@searchbox.scss';

class Searchbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			queryString: this.props.defaultValue || ''
		}
	}

	keyPress(e){
		if(e.keyCode === 13){
			this.props.onSearch();
		}
	}

	render() {
		return (<div className="searchbox">
			{this.props.defaultValue ? <input type="text" name={this.props.name} placeholder={this.props.placeholder} defaultValue={this.props.defaultValue}
				   onChange={this.props.onChange} onKeyDown={(e) => {this.keyPress(e)}}
			/> : <input type="text" name={this.props.name} placeholder={this.props.placeholder} value={this.props.value}
						onChange={this.props.onChange} onKeyDown={(e) => {this.keyPress(e)}}
			/>}
			<div className="searchBtn" onClick={this.props.onSearch}></div>
		</div>)
	}
}

Searchbox.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	defaultValue: PropTypes.string,
	placeholder: PropTypes.string.isRequired,
	onSearch: PropTypes.func.isRequired,
	onChange: PropTypes.func
}

export default Searchbox;