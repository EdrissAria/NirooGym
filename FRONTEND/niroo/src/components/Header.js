import React, { useEffect, useState, useContext } from 'react'
import { Link,useHistory } from 'react-router-dom'
import * as api from './Api'
import { useMutation, useQuery } from 'react-query'
import { Context } from './Contexts/ContextProvider';

function Header() {
    const {searching, search, setSearch} = useContext(Context)
    //use history 
    const history = useHistory();
    
    const [emptyStyle, setEmptyStyle] = useState({});
    const [em, setem] = useState(false);
    const [validCharacter, setValidCharacter] = useState(false)
    
    //search handler 
    const searchChanges = (e) => {
        setSearch(e.target.value);
        setem(false)
        setValidCharacter(false)
    }
    const searchHandler = () =>{
        if(search.match(/%/gi) || search.match(/[?]/gi) || search.match(/#/gi) || search.match(/&/gi) || search.match(/[/]/gi)){
            setValidCharacter(true)
        }else if(search !== ''){
            history.push(`/Search/${search}`)
            setem(false)
            setValidCharacter(false)
        }else{
            setEmptyStyle({border: '1px solid red', borderRight: 'none', borderLeft: 'none'})
            setem(true);
        } 
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
                                <input type="text" name="search" onFocus={()=> setEmptyStyle({})} onChange={searchChanges} placeholder="search here.." style={emptyStyle} className="search" />
                                <button onClick={searchHandler}  className="btn-search" style={emptyStyle}><img src={'/assets/img/search.png'} /></button>
                            </li>
                            {
                                em ?<div style={{position: 'absolute',top: 43, padding: '0 20px', color: 'red', transition: '0.5s'}}>write something to search</div>:
                                validCharacter ? <div style={{position: 'absolute',top: 43, padding: '0 20px', color: 'red', transition: '0.5s'}}>%,#,&,/ are not valid!</div>:''
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
