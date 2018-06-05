/**
 * Created by Administrator on 2018/2/1.
 */
let secret=require('../util/secret');
let util=require('../util/util');
let event=require('../util/event');
let urlHandle=global.urlHandle;
let {apiUrl}=urlHandle;


class rest{
  constructor(){

  }
  sendRequest(req,res,next,optionValue,fn,formData){
    let {url,urlParam,method="POST"}=optionValue;
    url=url||"{baseUrl}"+req.originalUrl;

    let param=method==="POST"?req.body:req.query;
    let options={
      url:url,
      urlParam:urlParam||{baseUrl:urlHandle.baseUrl},
      method:method,
      headers:req.headers,
      form:param,
    };
    if(formData){options.formData=formData;delete options.form;delete options.headers;};
    try{
      util.createRequest(options,(err,resp,datas)=>{
        if(err){
          next(new event.eventError(500,err,null,"Server exception"));
        }else{
          try{
            var resValue=JSON.parse(datas);
          }catch(err){
            var resValue=datas;
          }
          console.log("resValue111:",resValue);
          if(typeof fn =="function"){
            fn.call(this,req,res,next,resValue);
          }
          res.send(resValue);
          return;
        }
      });
    }catch(err){
      next(new event.eventError(500,err,null,"Server exception"));
    }
  }
  checkToken(req,res,next){
    if(!req.accessToken||req.accessToken.length<=0||!req.cookies.token){

      delete req.session.access_token;
      delete req.session.user;
      delete req.session.authInfo;
      delete req.accessToken;
      for(let key in req.cookies){
        if(key=="connect.sid"){
          break;
        }
        res.clearCookie(key);
      }
      next(new event.eventError(403,"Your auth information doesn't contain information of the client you are using.",null,"access_denied"));
    }else{
      let result=secret.decodeAccessToken(req.accessToken,req.user.id);
      if(result==true){
        return true;
      }else{
        next(result);
      }
    }
  }
  loginOut(req,res,next){
    delete req.session.access_token;
    delete req.session.user;
    delete req.session.authInfo;
    delete req.accessToken;
    for(let key in req.cookies){
      res.clearCookie(key);
    }
    res.send(new event.event("退出成功！"));
  }
  sendSessionInfo(req,res,next){
    if(!req.session.user&&req.cookies.ccat) {
      var userPass = secret.decodeString(req.cookies.ccat);
      var mobile = userPass.substring(0, 11);
      var pass = userPass.substring(11);
      var options = {
        url: apiUrl.login,
        urlParam: {baseUrl: urlHandle.baseUrl},
        method: "post",
        form: {
          loginName: mobile,
          password: pass,
        }
      };
      try {
        util.createRequest(options, (err, resp, datas) => {
          if (err) {
            next(new event.eventError(500, err, null, "Server exception"));
          } else {
            var resValue = JSON.parse(datas);
            console.log("用户数据:", resValue);
            req.session.user=datas.data;

            if (resValue.status == 0) {
              if(resValue.data){
                req.session.access_token=secret.createAccessToken(resValue.data.id);
              }
              res.send(new event.event("查询成功", {
                userinfo: req.user,
              }));
            } else {
              res.send(new event.event("查询成功", resValue));
            }
            return;
          }
        });
      } catch (err) {
        next(new event.eventError(500, err, null, "Server exception"));
      }
    }else{
      res.send(new event.event("查询成功",{userinfo:req.user}));
    }

  }
}

module.exports=new rest();
