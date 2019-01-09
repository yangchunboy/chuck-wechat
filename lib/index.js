'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _xml2js = require('xml2js');

var _utility = require('./utility');

var _config = require('./config');

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wechat = function () {
	function Wechat(_ref) {
		var appid = _ref.appid,
		    mch_id = _ref.mch_id,
		    partnerKey = _ref.partnerKey,
		    appSecret = _ref.appSecret;
		(0, _classCallCheck3.default)(this, Wechat);

		this.appid = appid;
		this.mch_id = mch_id;
		this.partnerKey = partnerKey;
		this.appSecret = appSecret;
	}

	// 微信扫码支付


	(0, _createClass3.default)(Wechat, [{
		key: 'codePay',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(params) {
				var obj, data, sign, xml, result, wechatObj;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								obj = {
									nonce_str: (0, _utility.generateRandomStr)(),
									trade_type: 'NATIVE',
									appid: this.appid,
									mch_id: this.mch_id
								};
								data = params;

								Object.assign(data, obj);
								sign = (0, _utility.generateSign)({ data: data, partnerKey: this.partnerKey });

								Object.assign(data, { sign: sign });
								xml = (0, _utility.generateXml)(data);
								_context.next = 8;
								return (0, _requestPromiseNative2.default)({
									method: 'post',
									uri: _config.unifiedorderUrl,
									body: xml
								});

							case 8:
								result = _context.sent;
								wechatObj = null;

								(0, _xml2js.parseString)(result.toString(), function (err, xml) {
									wechatObj = xml.xml;
								});
								return _context.abrupt('return', wechatObj);

							case 12:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function codePay(_x) {
				return _ref2.apply(this, arguments);
			}

			return codePay;
		}()
		// 微信扫码登录 

	}, {
		key: 'codeLogin',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(code) {
				var getUserInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
				var obj, accesstokenUrl, accessTokenResult, accessTokenObj, access_token, openid, userParams, userInfo, userObj;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								obj = {
									appid: this.appid,
									secret: this.secret,
									code: code,
									grant_type: 'authorization_code'
								};
								accesstokenUrl = '' + _config.getAccessTokenUrl + (0, _utility.generateParams)(obj);
								_context2.next = 4;
								return (0, _requestPromiseNative2.default)({
									method: 'get',
									uri: '' + _config.getAccessTokenUrl + (0, _utility.generateParams)(obj)
								});

							case 4:
								accessTokenResult = _context2.sent;
								accessTokenObj = JSON.parse(accessTokenResult.content);

								if (getUserInfo) {
									_context2.next = 8;
									break;
								}

								return _context2.abrupt('return', accessTokenObj);

							case 8:
								access_token = accessTokenObj.access_token, openid = accessTokenObj.openid;
								userParams = {
									access_token: access_token,
									openid: openid
								};
								_context2.next = 12;
								return (0, _requestPromiseNative2.default)({
									method: 'get',
									uri: '' + _config.userInfoUrl + (0, _utility.generateParams)(userParams)
								});

							case 12:
								userInfo = _context2.sent;
								userObj = JSON.parse(userInfo.content);
								return _context2.abrupt('return', Object.assign(userObj, accessTokenObj));

							case 15:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function codeLogin(_x2) {
				return _ref3.apply(this, arguments);
			}

			return codeLogin;
		}()
	}]);
	return Wechat;
}();

exports.default = Wechat;