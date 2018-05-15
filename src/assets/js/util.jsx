/*
*担保系统使用的工具类
*
* */
import * as $ from "jquery";
import state from "../../store"

const Util=Object.create({
  clientInfo:()=>{
    const engine={
      ie:0,
      gecko:0,
      webkit:0,
      khtml:0,
      opera:0,
      ver:null
    };
    const browser={
      ie:0,
      firefox:0,
      safari:0,
      konq:0,
      opera:0,
      chrome:0,
      ver:null
    };
    const system={
      win:false,
      mac:false,
      xl1:false,
      iphone:false,
      ipod:false,
      ipad:false,
      ios:false,
      android:false,
      nokiaN:false,
      winMobile:false,
      //游戏系统
      wii:false,
      pas:false
    };

    let ua=window.navigator.userAgent;
    if(window.opera){
      engine.ver=browser.ver=window.opera.version();
      engine.opera=browser.opera=parseFloat(engine.ver);
    }else if(/AppleWebkit\/(\S+)/.test(ua)){
      engine.ver=RegExp["$1"];
      engine.webkit=parseFloat(engine.ver);

      if(/Chrome\/(\S+)/.test(ua)){
        browser.ver=RegExp["$1"];
        browser.chrome=parseFloat(browser.ver);
      }else if(/Version\/(\S+)/.test(ua)){
        browser.ver=RegExp["$1"];
        browser.safari=parseFloat(browser.ver);
      }else{
        var safariVersion=1;
        if(engine.webkit<100){
          safariVersion=1
        }else if(engine.webkit<312){
          safariVersion=1.2;
        }else if(engine.webkit<412){
          safariVersion=1.3;
        }else{
          safariVersion=2;
        }
        browser.safari=browser.ver=safariVersion;
      }
    }else if(/KHTML\/(\S+)/.test(ua)||/Konqueror\/([^;]+)/.test(ua)){
      engine.ver=browser.ver=RegExp["$1"];
      engine.khtml=browser.konq=parseFloat(engine.ver);
    }else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
      engine.ver=RegExp["$1"];
      engine.gecko=parseFloat(engine.ver);
      if(/Firefox\/(\S+)/.test(ua)){
        browser.ver=RegExp["$1"];
        browser.firefox=parseFloat(browser.ver);
      }
    }else if(/MSIE ([^;]+)/.test(ua)){
      engine.ver=browser.ver=RegExp["$1"];
      engine.ie=browser.ie=parseFloat(engine.ver);
    }

    //检测浏览器
    browser.ie=engine.ie;
    browser.opera=engine.opera;

    //检测平台
    var p=navigator.platform;
    system.win=p.indexOf("Win")==0;
    system.mac=p.indexOf("Mac")==0;
    system.xl1=(p=="xl1")||(p.indexOf("Linux")==0);

    //检测window操作系统
    if(system.win){
      if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
        if(RegExp["$1"]=="NT"){
          switch (RegExp["$2"]){
            case "5.0":
              system.win="2000";
              break;
            case "5.1":
              system.win="XP";
              break;
            case "6.0":
              system.win="Vista";
              break;
            case "6.1":
              system.win="7";
              break;
            default:
              system.win="NT";
              break;
          }
        }else if(RegExp["$1"]=="9x"){
          system.win="ME";
        }else {
          system.win = RegExp["$1"];
        }
      }
    }

    //移动设备
    system.iphone=ua.indexOf("iPhone")>-1;
    system.ipod=ua.indexOf("iPod")>-1;
    system.ipad=ua.indexOf("iPad")>-1;
    system.nokiaN=ua.indexOf("NokiaN")>-1;

    //windows mobile
    if(system.win=="CE"){
      system.winMobile=system.win;
    }else if(system.win="Ph"){
      if(/Windows Phone OS (\d+.\d+)/.test(ua)){
        system.win="Phone";
        system.winMobile=parseFloat();RegExp["$1"];
      }
    }

    //检测ios版本
    if(system.mac&&ua.indexOf("Mobile")>-1){
      if(/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
        system.ios=parseFloat(RegExp["$1"].replace("_","."));
      }else{
        system.ios=2;//不能真正检测出版本号,只能猜测
      }
    }

    //检测android版本
    if(/Android (\d+.\d+)/.test(ua)){
      system.android=parseFloat(RegExp["$1"]);
    }

    //游戏系统
    system.wii=ua.indexOf("Wii")>-1;
    system.ps=/playstation/i.test(ua);

    return{
      engine,
      browser,
      system
    }
  },
  checkObjectIsEmpty:function(obj){
    /*检查对象是否为空*/
    if(obj){
      var key;
      for(key in obj){
        return false;
      }
      return true;
    }
    return true;
  },
  analyzetpl:function(url,json){
    //格式化字符串
    if(typeof url=="undefined"||typeof json=="undefined"){
      return url;
    }

    return url.replace(/\{(.*?)\}/ig,function(){
      if(typeof json[arguments[1]]=="undefined"){
        return ""
      }
      return json[arguments[1]];
    });
  },
  sendRequest:({method="GET",url="",urlParam={},data={},actionList={isFetching:null,didInvalidate:null,lastUpdated:null},success,fail})=>{
    //isFetching行为第一个参数必须为抓取状态，didInvalidate(该行为暂未想到合适的过期时间)行为第一个参数必须为Boolean型过期时间，lastUpdated第一个参数接受日期型字符串
    if(url&&url.length==0){
      console.error("请传递请求地址!");
      return;
    }else if(/\{(.*?)\}/ig.test(url)&&this.checkObjectIsEmpty(urlParam)){
      console.error("请传递api地址中所需要的参数！");
      return;
    }
    let keys=Object.keys(data);
    for(let key of keys){
      if(Object.prototype.toString.call(data[key])==="[object Array]"){
        data[key]=JSON.stringify(data[key]);
      }
    }
    let dispatch=state.dispatch;
    if(Object.prototype.toString.call(actionList.isFetching)==="[object Function]"){
      //是否在抓取数据
      dispatch(actionList.isFetching(true));
    }

    $.ajax({
      url:this.analyzetpl(url,urlParam),
      method:method,
      dataType:"json",
      data:data,
      success(data){
        if(Object.prototype.toString.call(actionList.lastUpdated)==="[object Function]"){
          //表示上一次更新时间
          dispatch(actionList.lastUpdated(new Date().getTime()));
        }
        if(Object.prototype.toString.call(success)==="[object Function]"){
          success();
        }
        if(Object.prototype.toString.call(actionList.isFetching)==="[object Function]"){
          //是否在抓取数据
          dispatch(actionList.isFetching(false));
        }
      },
      error(err){
        if(Object.prototype.toString.call(actionList.lastUpdated)==="[object Function]"){
          //表示上一次更新时间
          dispatch(actionList.lastUpdated(new Date().getTime()));
        }
        if(Object.prototype.toString.call(fail)==="[object Function]"){
          fail(err);
        }
        if(Object.prototype.toString.call(actionList.isFetching)==="[object Function]"){
          //是否在抓取数据
          dispatch(actionList.isFetching(false));
        }
      }
    })
  },
  formatTime(time,format="yyyy/MM/dd"){
    if(!time||Object.prototype.toString.call(time)==="[Object Date]"){
      console.error("Please provide date type data.");
      return;
    }
    let year=[...(time.getFullYear()+"")].reverse();
    let month=[...("0"+(time.getMonth()+1))].reverse();
    let date=[...("0"+(time.getDate()))].reverse();
    let yLen=0,MLen=0,dLen=0;
    for(let str of format){
      if(str==="y"){
        yLen++;
      }else if(str==="M"){
        MLen++;
      }else if(str==="d"){
        dLen++;
      }
    }

    year=year.slice(0,yLen).reverse().join("");
    month=month.slice(0,MLen).reverse().join("");
    date=date.slice(0,dLen).reverse().join("");
    format=format.replace(/y+/,year);
    format=format.replace(/M+/,month);
    format=format.replace(/d+/,date);
    return format;
  }

});

export default Util;
