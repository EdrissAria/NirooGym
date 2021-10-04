import React from 'react'
import {Link} from 'react-router-dom'

function Aside() {
    return (
        <aside className="sidebar">
            <img src={'/assets/img/logo.png'} />
            <ul className="sidebar_icon">
                <li><Link to="/" title="Dashboard"><img src="/assets/img/home.png"/></Link></li>
                <li><Link to="/users" title="Users"><img src="/assets/img/user.png"/></Link></li>
                <li><Link to="/staff" title="Staff"><img src="/assets/img/stuff.png"/></Link></li>
                <li><Link to="/parking" title="Parking"><img src="/assets/img/parking.png"/></Link></li>
                <li><Link to="/logout" title="Log out"><img src="/assets/img/exit.png"/></Link></li>
            </ul>
            <ul className="bottom_sidebar_icon">
                <li><Link to="/cache_book" title="Cache Book"><img src={'/assets/img/cache_book.png'}/></Link></li>
                <li><img src={'/assets/img/bishak.png'} className="profile"/></li>
            </ul>
        </aside>
    )
}

export default Aside
