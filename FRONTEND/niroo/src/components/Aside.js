import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import { useContext } from 'react/cjs/react.development'
import { Context } from '../components/Contexts/ContextProvider'

function Aside() {
    const {logout, userData} = useContext(Context);
    console.log('photo:',userData)
    return (
        <aside className="sidebar">
            <img src={'/assets/img/logo.png'} />
            <ul className="sidebar_icon">
                <li><Link to="/" title="Dashboard"><img src="/assets/img/home.png"/></Link></li>
                <li><Link to="/users" title="Users"><img src="/assets/img/user.png"/></Link></li>
                <li><Link to="/staff" title="Staff"><img src="/assets/img/stuff.png"/></Link></li>
                <li><Link to="/loans" title="Loans"><img src="/assets/img/loan.png"/></Link></li>
                <li><Link to="/parking" title="Parking"><img src="/assets/img/parking.png"/></Link></li>
                <li><button onClick={logout} className="logout_btn"><img src="/assets/img/exit.png"/></button></li>
            </ul>
            <ul className="bottom_sidebar_icon">
                <li><Link to="/cash_book" title="Cache Book"><img src={'/assets/img/cash_book.png'}/></Link></li>
                <li><img src={`/assets/upload/${userData?userData.photo:'aria.png'}`} className="profile"/></li>
            </ul>
        </aside>
    )
}

export default Aside
