import React, { useEffect, useState, useContext } from 'react'
import { Link,useHistory } from 'react-router-dom'
import * as api from './Api'
import { useMutation, useQuery } from 'react-query'
import { Context } from './Contexts/ContextProvider';

function Header() {
    const history = useHistory();

    const [search , setSearch] = useState('');
    //api for searching 
    const searching = useQuery(['searching', search], ()=> api.searching(search));
    
    //search handler 
    const searchChanges = (e) => {
        setSearch(e.target.value);
    }
    const searchHandler = () =>{
        history.push(`/Search/${search}`) 
    }
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
                                <input type="text" name="search" onChange={searchChanges}  placeholder="search here.." className="search" />
                                <button onClick={searchHandler} className="btn-search"><img src={'/assets/img/search.png'} /></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
