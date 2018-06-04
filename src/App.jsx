import React from "react";
import {Route,Redirect,Switch} from "react-router-dom"
import FootComponent from "./components/footer/footer.jsx"
import HeadComponent from "./components/header/headContainer.jsx"
import IndexComponent from "./components/index/indexContainer.jsx"
import guaranteeComponent from "./components/guarantee/guaranteeContainer.jsx"
import tradingRecordComponent from "./components/tradingRecord/tradingRecordContainer.jsx"
import CompanyInfoComponent from "./components/companyInfo/companyInfoContainer.jsx"
import AuthenticationComponent from './components/authentication/authenticationContainer.jsx'
import PassManagerComponent from './components/passManager/passManagerContainer.jsx'
import RechargeComponent from './components/recharge/rechargeContainer.jsx'
import WithdrawComponent from './components/withdraw/withdrawContainer.jsx'
import LoginComponent from "./components/login/loginContainer.jsx"
import Util from "./assets/js/util.jsx"
import state from "./store"
import {loginIsFetching,loginLastUpdata,loginRequestSuccess,changeLoginStatus} from "./components/login/loginAction.jsx"
import UrlList from "../router/util/urlHandler";
let {apiUrl}=UrlList;

class App extends React.Component{
  constructor(props){
    super(props);

  }
  componentWillMount(){
    const sendParam={baseUrl:window.location.origin};
    const data={};
    const actionList={
      isFetching:loginIsFetching,
      lastUpdated:loginLastUpdata
    };
    const success=(data)=>{
      state.dispatch(loginRequestSuccess(data.status,data.msg,data));
      if(data.status==0){
        state.dispatch(changeLoginStatus(true));
      }else{
        state.dispatch(changeLoginStatus(false));
      }
    };
    const fail=(err)=>{};
    Util.sendRequest({method:"POST",url:"{baseUrl}/api/v2/getSessionInfo",urlParam:sendParam,data,actionList,success,fail});
  }
  render(){
    return (
      <div className="main">
        <HeadComponent></HeadComponent>
        {/* 用了Switch 这里每次只匹配一个路由，所有只有一个节点。 */}
        <Switch>
          <Route path="/" exact component={IndexComponent} />
          <Route path="/guarantee" exact component={guaranteeComponent} />
          <Route path="/trading" exact component={tradingRecordComponent} />
          <Route path="/company/info" exact component={CompanyInfoComponent}/>
          <Route path="/company/authentication" exact component={AuthenticationComponent}/>
          <Route path="/company/pass" exact component={PassManagerComponent}/>
          <Route path="/recharge" exact component={RechargeComponent}/>
          <Route path="/withdraw" exact component={WithdrawComponent}/>
          <Route path="/login" exact component={LoginComponent} />
        </Switch>
        <FootComponent></FootComponent>
      </div>
    );
  }

}

export default App;
