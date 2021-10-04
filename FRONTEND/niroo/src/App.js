import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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

function App() {
    return (
        <Router>
            <Header />
            <Aside />
            <Switch>
                <Route exact path="/" component={Dashboard} />
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
                <Route path="/userUpdate/:id" component={UserUpdate} />
                <Route path="/staffUpdate/:id" component={StaffUpdate} />
                <Route path="/regEdit/:id" component={RegEdit} />
                <Route path="/viewAgreementTime/:id" component={SingleAgrTime}/>
                <Route path="/updateAgreementTime/:id" component={UpdateAgr} />
            </Switch>
        </Router>
    )
}

export default App
