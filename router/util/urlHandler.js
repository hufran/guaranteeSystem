/**
 * Created by Administrator on 2018/2/2.
 */

let url={
  baseUrl:(function(){
    return process.env.NODE_ENV==="production"?"http://10.139.36.223:9999":"http://10.4.33.251:8888";
  })(),
  extraUrl:{
    articleUrl:(function(){
      return process.env.NODE_ENV==="production"?"http://127.0.0.1:8000":"http://10.4.33.251";
    })()
  },
  apiUrl:{
    "login":'{baseUrl}/api/v2/deposit/login',//POST GET 登录接口
    "openAccount":'{baseUrl}/api/v2/lccbweb/bindCard/{userId}',//POST 廊坊银行 web页面开户
    "lccbId":'{baseUrl}/api/v2/lccb/getLccbId/{userId}',//POST 获取廊坊银行开户状态
    "userfundNew":'{baseUrl}/api/v2/user/{userId}/userfundNew',//GET 获取用户信息
    "onlineRecharge":'{baseUrl}/api/v2/lccbweb/onlineBankDeposit/{userId}',//POST 廊坊银行 web页面网银充值
    "fasterRecharge":'{baseUrl}/api/v2/lccbweb/deposit/{userId}',//POST 廊坊银行 web页面快捷充值
    "withdraw":'{baseUrl}/api/v2/lccbweb/withdraw/{userId}',//POST 廊坊银行 web页面提现
    "corporation":"{baseUrl}/api/v2/corporation/{userId}",//GET 获取企业基本信息
    "banks":"{baseUrl}/api/v2/lccb/banks",//GET 获取银行卡列表
    "userActivate":"{baseUrl}/api/v2/lccbweb/userActivate/{userId}",//POST 激活
    "userAuth":"{baseUrl}/api/v2/lccbweb/userAuth/{userId}",//POST 授权
    "userAuthCancel":"{baseUrl}/api/v2/lccbweb/userAuthCancel/{userId}",//POST 取消授权
    "setPaymentPassword":"{baseUrl}/api/v2/user/{userId}/setPaymentPassword",//POST 重置用户密码
    "captcha":"{baseUrl}/api/v2/register/captcha?timestamp={timestamp}",//GET 重置用户密码

  }

};

module.exports=url;
