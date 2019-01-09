'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @author yangchunboy
 * @date 2018.05.16
 * 
 */

// 微信同意下单请求链接
var unifiedorderUrl = exports.unifiedorderUrl = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

// 微信请求accessToken和openid和unionid的链接
var getAccessTokenUrl = exports.getAccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?';

// 通过accessToken请求
var userInfoUrl = exports.userInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?';

// 获取小程序授权接口
var miniUserUrl = exports.miniUserUrl = 'https://api.weixin.qq.com/sns/jscode2session?';