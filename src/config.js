/**
 * @author yangchunboy
 * @date 2018.05.16
 * 
 */

// 微信同意下单请求链接
export const unifiedorderUrl = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

// 微信请求accessToken和openid和unionid的链接
export const getAccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?';

// 通过accessToken请求
export const userInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?';

// 获取小程序授权接口
export const miniUserUrl = 'https://api.weixin.qq.com/sns/jscode2session?';

// 微信退款的域名
export const refundUrl = 'https://api.mch.weixin.qq.com/secapi/pay/refund';

// 微信企业付款到零钱的请求路径
export const businessToUserUrl = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers';
