import React, { useEffect, useContext } from 'react'
import * as api from './components/Api'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from 'react-router-dom'
import RecordTime from './Pages/RecordTime'
import RegisterdTime from './Pages/RegisterdTime'
import Dashboard from './Pages/Dashboard'
import AgreementTime from './Pages/AgreementTime'
import Aside from './components/Aside'
import PaidTimes from './Pages/PaidTimes'
import Expences from './Pages/Expences'
import Earnings from './Pages/Earnings'
import CacheBook from './Pages/CacheBook'
import Staff from './Pages/Staff'
import Users from './Pages/Users'
import Parking from './Pages/Parking'
import UserUpdate from './Pages/UserUpdate'
import StaffUpdate from './Pages/StaffUpdate'
import RegEdit from './Pages/RegEdit'
import SingleAgrTime from './components/Lists/SingleAgrTime'
import UpdateAgr from './Pages/UpdateAgr'
import ViewEarningsPage from './Pages/ViewEarningsPage'
import Loans from './Pages/Loans'
import Bank from './Pages/Bank'
import Login from './Pages/Login'
import SearchPage from './Pages/SearchPage'
import { useQuery } from 'react-query'
import { Context } from './components/Contexts/ContextProvider'


function App() {

    const { auth } = useContext(Context);
    
    if (window.location.pathname == '/login') {
        return (
            <>
                <Switch>
                    <Route path="/login" component={Login} />
                </Switch>
            </>
        )
    } else {
        if(!auth.data){
            return <Redirect to={'/login'} />
        }else{
        return (
            <>
                <Header />
                <Aside />
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/login" component={Login} />
                    <Route path="/recordTime" component={RecordTime} />
                    <Route path="/registerdTime" component={RegisterdTime} />
                    <Route path="/agreementTime" component={AgreementTime} />
                    <Route path="/paidTimes" component={PaidTimes} />
                    <Route path="/expences" component={Expences} />
                    <Route path="/earnings" component={Earnings} />
                    <Route path="/cache_book" component={CacheBook} />
                    <Route path="/staff" component={Staff} />
                    <Route path="/users" component={Users} />
                    <Route path="/parking" component={Parking} />
                    <Route path="/loans" component={Loans} />
                    <Route path="/bank" component={Bank} />
                    <Route path="/Search/:search" component={SearchPage} />
                    <Route path="/ViewEarnings/:earn/:id" component={ViewEarningsPage} />
                    <Route path="/userUpdate/:id" component={UserUpdate} />
                    <Route path="/staffUpdate/:id" component={StaffUpdate} />
                    <Route path="/regEdit/:id" component={RegEdit} />
                    <Route path="/viewAgreementTime/:id" component={SingleAgrTime} />
                    <Route path="/updateAgreementTime/:id" component={UpdateAgr} />
                </Switch>
            </>
        )}
    }
}

export default App
