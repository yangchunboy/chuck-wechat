'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.generateParams = exports.generateXml = exports.generateRandomStr = exports.generateSign = undefined;

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 生成签名
var generateSign = exports.generateSign = function generateSign(_ref) {
	var partnerKey = _ref.partnerKey,
	    data = _ref.data;

	var str = '';
	for (var key in data) {
		str = str + '&' + key + '=' + data[key];
	}
	str = str.substring(1, str.length);
	str = str.split('&').sort().join('&');
	var stringSignTemp = str + '&key=' + partnerKey;
	var sign = (0, _md2.default)(stringSignTemp).toUpperCase();
	return sign;
};

// 得到一个两数之间的随机整数，包括两个数在内
var getRandomIntInclusive = function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 随机生成一个24位的字符串
var generateRandomStr = exports.generateRandomStr = function generateRandomStr() {
	var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var randomStr = '';
	for (var i = 0; i < 24; i++) {
		randomStr = '' + randomStr + str[getRandomIntInclusive(0, str.length - 1)];
	}
	return randomStr;
};

// 生成xml字符串
var generateXml = exports.generateXml = function generateXml(data) {
	var xmlStr = '';
	for (var key in data) {
		xmlStr = xmlStr + ('<' + key + '>' + data[key] + '</' + key + '>');
	}
	return '<xml>' + xmlStr + '</xml>';
};

// 生成域名后面带的参数
var generateParams = exports.generateParams = function generateParams(params) {
	var str = '';
	for (var key in params) {
		str = str + '&' + key + '=' + params[key];
	}
	str = str.substr(1, str.length);
	return str;
};