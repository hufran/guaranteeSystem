/**
 * Created by Administrator on 2018/2/1.
 */
let express = require('express');
let router=express.Router();
var os=require("os");
var fs=require("fs");
global.urlHandle=require("../util/urlHandler");
let formatReq=require("../util/formatReq");
let rest=require('../model/rest');
let secret=require('../util/secret');
let util=require('../util/util');
let oauth=require("../util/oauth");
let oauthAuthentication=new oauth();
let event=require('../util/event');
let {apiUrl,extraUrl}=global.urlHandle;
let first=0;

router.all("*", formatReq(),function(req,res,next){
  if(process.env.NODE_ENV==="production"&&first==0){
    var netWork=os.networkInterfaces();
    for(var key in netWork){
      for(var i= 0,len=netWork[key].length;i<len;i++){
        if(netWork[key][i]["family"]==="IPv4"){
          console.log('netWork[key][i]["family"]:',netWork[key][i]["family"]==="IPv4"&&netWork[key][i]["address"]==="10.4.33.251");
        }
        if(netWork[key][i]["family"]==="IPv4"&&netWork[key][i]["address"]==="10.4.33.251"){
          global.urlHandle.baseUrl="http://127.0.0.1:9998/";
        }
      }
    }
    first=1;
  }
  next();
});

router.post("/getSessionInfo",oauthAuthentication.user(),function(req,res,next){
  rest.sendSessionInfo(req,res,next);
});

router.post("/deposit/login",oauthAuthentication.pass(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.login},function(req,res,next,resValue){
    if(resValue.status==0){
      req.session.user=resValue.data.user;
      if(resValue.data){
        req.session.access_token=secret.createAccessToken(resValue.data.id);
      }
      const body=req.body;
      console.log("body:",body);
      console.log("remember type:",typeof body.remember);
      if(body.remember==1){
        res.cookie('ccat',escape(secret.createAccessToken(encodeURIComponent(body.loginName)+encodeURIComponent(body.password))),{expires:new Date(new Date().getTime() + 43200000),Secure:true});
      }
    }
  });
});

router.post("/lccbweb/bindCard/:userId",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.openAccount,urlParam:{baseUrl:urlHandle.baseUrl,userId:req.params.userId}})
});

router.post("/lccb/getLccbId/:userId",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.lccbId,urlParam:{baseUrl:urlHandle.baseUrl,userId:req.params.userId},method:"GET"});
});

router.post("/user/:userId/userfundNew",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.userfundNew,urlParam:{baseUrl:urlHandle.baseUrl,userId:req.params.userId},method:"GET"});
});

router.post("/corporation/:userId",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.corporation,urlParam:{baseUrl:urlHandle.baseUrl,userId:req.params.userId},method:"GET"});
});

router.get("/lccb/banks",oauthAuthentication.pass(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.banks,urlParam:{baseUrl:urlHandle.baseUrl},method:"GET"});
});

//激活
router.post("/lccbweb/userActivate/:userId",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.userActivate,urlParam:{baseUrl:urlHandle.baseUrl,userId:req.params.userId}});
});

//快捷充值
router.post("/lccbweb/deposit/:userId",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.fasterRecharge,urlParam:{baseUrl:urlHandle.baseUrl,userId:req.params.userId}})
});

//网银充值
router.post("/lccbweb/onlineBankDeposit/:userId",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.onlineRecharge,urlParam:{baseUrl:urlHandle.baseUrl,userId:req.params.userId}})
});

//提现
router.post("/lccbweb/withdraw/:userId",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.withdraw,urlParam:{baseUrl:urlHandle.baseUrl,userId:req.params.userId}});
});

//授权
router.post("/lccbweb/userAuth/:userId",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.userAuth,urlParam:{baseUrl:urlHandle.baseUrl,userId:req.params.userId}});
});

//取消授权
router.post("/lccbweb/userAuthCancel/:userId",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.userAuthCancel,urlParam:{baseUrl:urlHandle.baseUrl,userId:req.params.userId}});
});

//获取重置密码验证码
router.get("/register/captcha",oauthAuthentication.user(),function(req,res,next){
  var timestamp=new Date().getTime();
  rest.sendRequest(req,res,next,{url:apiUrl.captcha,urlParam:{baseUrl:extraUrl.articleUrl,timestamp:timestamp},method:"GET"});
});

//验证验证码是否有效
router.post("/register/captcha",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.captcha,urlParam:{baseUrl:extraUrl.articleUrl,userId:req.params.userId}});
});

//重置密码操作
router.get("/user/:userId/setPaymentPassword",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.captcha,urlParam:{baseUrl:extraUrl.articleUrl,userId:req.params.userId}});
});




router.post("/userInfo/save",oauthAuthentication.pass(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.register},function(req,res,next,resValue){
    if(resValue.status==0){
      console.log("resValue:",resValue);
      req.session.user=resValue.data;
      req.session.access_token=secret.createAccessToken(resValue.data.id);
    }
  });
});





router.post("/loginOut",oauthAuthentication.pass(),function(req,res,next){
  rest.loginOut(req,res,next);
});




router.all('*',function (req,res,next) {
  res.send(new event.eventError(404,"Invalid request",null,"Invalid request"));
});

module.exports = router;
