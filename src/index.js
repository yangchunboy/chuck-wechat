
import { parseString } from 'xml2js';
import { generateSign, generateRandomStr, generateXml, generateParams } from './utility';
import { unifiedorderUrl, getAccessTokenUrl, userInfoUrl, miniUserUrl, refundUrl, businessToUserUrl } from './config';
import request from 'request-promise-native';

class Wechat {
	constructor({ appid, mch_id, partnerKey, appSecret }) {
		this.appid = appid;
		this.mch_id = mch_id;
		this.partnerKey = partnerKey;
		this.appSecret = appSecret;
	}

	// 微信扫码支付
	async codePay(params) {
		const obj = {
			nonce_str: generateRandomStr(),
			trade_type: 'NATIVE',
			appid: this.appid,
			mch_id: this.mch_id,
		};
		const data = params;
		Object.assign(data, obj);
		const sign = generateSign({ data, partnerKey: this.partnerKey });
		Object.assign(data, { sign });
		const xml = generateXml(data);
		const result = await request({
			method: 'post',
			uri: unifiedorderUrl,
			body: xml,
		});
		let wechatObj = null;
		parseString(result.toString(), (err, xml) => {
			wechatObj = xml.xml;
		});
		return wechatObj;
	}
	// 微信扫码登录 
	async codeLogin(code, getUserInfo = false) {
		const obj = {
			appid: this.appid,
			secret: this.secret,
			code,
			grant_type: 'authorization_code',
		};
		const accesstokenUrl = `${getAccessTokenUrl}${generateParams(obj)}`;
		const accessTokenResult = await request({
			method: 'get',
			uri: `${getAccessTokenUrl}${generateParams(obj)}`,
		});
		const accessTokenObj = JSON.parse(accessTokenResult.content);
		if (!getUserInfo) {
			return accessTokenObj;
		}
		const { access_token, openid } = accessTokenObj;
		const userParams = {
			access_token,
			openid,
		};
		const userInfo = await request({
			method: 'get',
			uri: `${userInfoUrl}${generateParams(userParams)}`,
		});
		const userObj = JSON.parse(userInfo.content);
		return Object.assign(userObj, accessTokenObj );
	}

	// 小程序登录
	async miniLogin(code) {
		const obj = {
			appid: this.appid,
			secret: this.appSecret,
			js_code: code,
			grant_type: 'authorization_code',
		};
		const userInfo = await request({
			method: 'get',
			uri: `${miniUserUrl}${generateParams(obj)}`,
		});
		return userInfo;
	}

	// 小程序支付
	async miniPay(params) {
		// const { appid, mch_id, partnerKey } = wechatParams;
		const obj = {
			nonce_str: generateRandomStr(),
			trade_type: 'JSAPI',
			appid: this.appid,
			mch_id: this.mch_id,
		};
		const data = params;
		Object.assign(data, obj);
		const sign = generateSign({ data, partnerKey: this.partnerKey });
		Object.assign(data, { sign });
		const xml = generateXml(data);
		const result = await request({
			method: 'post',
			uri: unifiedorderUrl,
			body: xml,
		});
		let wechatObj = null;
		parseString(result.toString(), (err, xml) => {
			wechatObj = xml.xml;
		});
		return wechatObj;
	}
	// 退款
	async refund(params, certUrl) {
		const appid = this.appid;
		const mch_id = this.mch_id;
		const obj = {
			nonce_str: generateRandomStr(),
			appid,
			mch_id: this.mch_id,			
		};
		const data = params;
		Object.assign(data, obj);
		const sign = generateSign({ data, partnerKey: this.partnerKey });
		Object.assign(data, { sign });
		const xml = generateXml(data);
		// console.log(data);
		const result = await request({
			method: 'post',
			uri: refundUrl,
			body: xml,
			agentOptions: {
				// formal
				pfx: require('fs').readFileSync(certUrl),
				// test
				passphrase: mch_id,
			},
		});
		let wechatObj = null;
		parseString(result.toString(), (err, xml) => {
			wechatObj = xml.xml;
		});
		return wechatObj;
	}

	// 企业付款到零钱
	async transfer(params, certUrl) {
		const { appid, mch_id } = this;
		const obj = {
			nonce_str: generateRandomStr(),
			mch_appid: appid,
			mchid: mch_id,			
		};
		const data = params;
		Object.assign(data, obj);
		const sign = generateSign({ data, partnerKey: this.partnerKey });
		Object.assign(data, { sign });
		const xml = generateXml(data);
		const result = await request({
			method: 'post',
			uri: businessToUserUrl,
			body: xml,
			agentOptions: {
				// formal
				pfx: require('fs').readFileSync(certUrl),
				// test
				passphrase: mch_id,
			},
		});
		try{
			let wechatObj = null;
			parseString(result.toString(), (err, xml) => {
				wechatObj = xml.xml;
			});
			return wechatObj;
		} catch(error) {
			return error;
		}
	}

}

export default Wechat;
