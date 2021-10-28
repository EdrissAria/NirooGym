import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as api from './Api'
import { useMutation } from 'react-query'


function Header() {
    const [search, setSearch] = useState('');
    const searching = useMutation(api.searching);
   
    
    const searchHandler = (e) => {
        e.preventDefault();
        searching.mutate(search);
    }
    console.log(searching.data);
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-light bg-light navbar_light">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 navbar_auto">
                            <li className="nav-item active">
                                <Link to="/recordTime" className="nav-link">Record Time</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/registerdTime" className="nav-link">Registerd Times</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/paidTimes" className="nav-link">Paid Times</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/expences" className="nav-link">Expences</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/earnings" className="nav-link">Earnings</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/bank" className="nav-link">Bank</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="navbar_nav">
                            <li className="navbar-nav mr-auto mt-2 mt-lg-0 nav-item">
                                <form onSubmit={searchHandler}>
                                    <input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search here.." className="search" />
                                    <button type="submit" className="btn-search"><img src={'/assets/img/search.png'} /></button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
