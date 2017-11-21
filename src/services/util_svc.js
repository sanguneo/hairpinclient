/**
 * Created by 나상권 on 2017-05-19.
 */
'use strict';

export default {
	pad: (num, size = 2) => {
		let s = '0000' + num;
		return s.substr(s.length - size);
	},
	formatter: function(date, format = 'Y-M-D h:i') {
		if (date.getTimezoneOffset() === 0) {
			date.setHours(date.getHours() + 9);
		}
		return format
			.replace('Y', this.pad(date.getFullYear(), 4))
			.replace('M', this.pad(date.getMonth() + 1))
			.replace('D', this.pad(date.getDate()))
			.replace('h', this.pad(date.getHours()))
			.replace('i', this.pad(date.getMinutes()))
			.replace('s', this.pad(date.getSeconds()));
	},
	dateFormatter: function(timestamp, format = 'Y-M-D h:i') {
		let date = new Date(parseInt(timestamp));
		return this.formatter(date, format);
	},
	isoFormatter: function(isodate, format = 'Y-M-D h:i') {
		let date = new Date(isodate);
		return this.formatter(date, format);
	},
	emailcheck: (email) =>{
		let regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		return (typeof(email) !== 'undefined' && email !== '' && regex.test(email));
	},
	readablized(number) {
		if(number < 1000) return number;
		const s = ['', 'k', 'm', 'g'];
		let e = Math.floor(Math.log(number) / Math.log(1000));
		return (number / (1000 ** e)).toFixed(1) + " " + s[e];
	}
};
