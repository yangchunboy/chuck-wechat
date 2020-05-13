# chuck-wechat
一个用于微信支付和微信授权的npm包（还在逐步完善当中）
## 安装
npm的安装方式

```
npm install chuck-wechat
```


## 微信扫码登录

> 具体参考文档：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=&lang=zh_CN
> 首先在微信开放平台配置好授权回调域名，用户扫码成功后就会跳回这个授权域名并在域名后面带上code参数，拿到这个code参数，然后调用codeLogin方法，这个方法有两个参数，第一个参数就是code，第二个参数默认是false，如果想拿到微信用户的个人信息，例如：微信昵称，微信头像等就将这个参数传true


    const { default: Wechat } = require('chuck-wechat');

    const params = {
        appid: 'wx1111111111',
        mch_id: '1111111111',
        partnerKey: 'xxxxxxxxx',
        appSecret: 'xxxxxxxx',
    };
    const wechat = new Wechat(params);
    const code = 'xxxxxxxxxx';
    const promise = wechat.codeLogin(code, true);
    promise.then((result) => { console.log(result) });

> 如果调用成功的返回结果是:

    {
        "openid":"OPENID",
        "nickname":"NICKNAME",
        "sex":1,
        "province":"PROVINCE",
        "city":"CITY",
        "country":"COUNTRY",
        "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
        "privilege":[
        "PRIVILEGE1",
        "PRIVILEGE2"
        ],
        "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL"

    }
## 扫码支付
> 具体传入的参数参考：https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1 其中nonce_str和trade_type这两个参数，我已经在包里加了，所以可以不传这两个参数。

```javascript
const { default: Wechat } = require('chuck-wechat');

const params = {
    appid: 'wx1111111111',
    mch_id: '1111111111',
    partnerKey: 'xxxxxxxxx',
    appSecret: 'xxxxxxxx',
};
const wechat = new Wechat(params);
const data = {
    appid: 'wx1111111111',
    mch_id: '1111111111',
    body: '扫码支付',
    out_trade_no: 'DD2018051401',
    total_fee: 1,
    notify_url,
    attach,
    spbill_create_ip: '127.0.0.1',
};
const promise = wechat.codePay(data);
promise.then((result) => { console.log(result) });
```

## 微信退款

> 微信退款需要多传一个退款证书的路径，不同支付的参数不一定一致，请根据不同支付传不同的参数，以下例子举的是公众号退款[请求参数参考链接](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_4)

```javascript
const { default: Wechat } = require('chuck-wechat');

const params = {
    appid: 'wx1111111111',
    mch_id: '1111111111',
    partnerKey: 'xxxxxxxxx',
    appSecret: 'xxxxxxxx',
};
const wechat = new Wechat(params);
const data = {
    out_trade_no: 'DD2018051401',
    out_refund_no: 'TK0000001',
    total_fee: 1,
    refund_fee: 1,        
}
const certUrl = '/etc/cert/refund_cert.p12'
const promise = wechat.refund(data, certUrl);
promise.then((result) => { console.log(result) });

```

## 小程序登录

> [请求参数参考链接](https://developers.weixin.qq.com/miniprogram/dev/api/code2Session.html)

```javascript
    const { default: Wechat } = require('chuck-wechat');

    const params = {
        appid: 'wx1111111111',
        appSecret: 'xxxxxxxx',
    };
    const wechat = new Wechat(params);
    const code = 'xxxxxxxxxx';
    const promise = wechat.miniLogin(code);
    promise.then((result) => { console.log(result) });
```

## 小程序支付

>[请求参数参考链接](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1)

```javascript
    const { default: Wechat } = require('chuck-wechat');

    const params = {
        appid: 'wx1111111111',
        mch_id: '1111111111',
        partnerKey: 'xxxxxxxxx',
    };
    const wechat = new Wechat(params);
    const data = {
        appid: 'wx1111111111',
        mch_id: '1111111111',
        body: '扫码支付',
        out_trade_no: 'DD2018051401',
        total_fee: 1,
        notify_url,
        attach,
        spbill_create_ip: '127.0.0.1',
        openid: 'xxxxxxx',
    };
    const promise = wechat.miniPay(data);
    promise.then((result) => { console.log(result) });

> 如果调用成功的返回结果是:

    {
        return_code: [ 'SUCCESS' ],
        return_msg: [ 'OK' ],
        appid: [ 'wx1111111111' ],
        mch_id: [ '1111111111' ],
        nonce_str: [ 'bfVr6Do1oU74o1iZ' ],
        sign: [ 'B112A7790273FC9E55D6CF6803EB80D0' ],
        result_code: [ 'SUCCESS' ],
        prepay_id: [ 'wx111111111111111111111111111111' ],
    }
```

## 企业付款到用户零钱

调用付款给用户的参数和证书的获取方式见下面链接：

> [请求参数参考链接](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2)

```javascript
    const { default: Wechat } = require('chuck-wechat');

    const params = {
        appid: 'wx1111111111',
        mch_id: '1111111111',
        partnerKey: 'xxxxxxxxx',
        appSecret: 'xxxxxxxx',
    };
    const wechat = new Wechat(params);
    const data = {
        partner_trade_no: 'DD2018051401',
        openid: 'xxxxx',
        check_name: "FORCE_CHECK",
        amount: 1,
        desc: '付款备注'    
    }
    const certUrl = '/etc/cert/cert.p12'
    const promise = wechat.transfer(data, certUrl);
    promise.then((result) => { console.log(result) });
```
