import { createContext, useState, useEffect } from "react";
import * as api from '../Api'
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Redirect } from "react-router";

export const Context = createContext();

const ContextProvider = (props) => {
    const [search, setSearch] = useState('');
    const [userData, setUserData] = useState({});

    //api for searching 
    const searching = useQuery(['searching', search], () => api.searching(search));
    //for getting earning type
    const [earn, setearn] = useState('');
    const selectEarning = (earning) => {
        setearn(earning);
    }
    
    //logout
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expire_time');
        setUserData({});
        window.location.replace('/login')
    }
    //auth context 
    const auth = useQuery(['auth'], api.Auth);

    const authorization = () => {
        if(auth.isSuccess){
            setUserData(auth.data.user)
        }
    }
    // value pass into context 
    const value = {
        earn,
        selectEarning,
        search,
        setSearch,
        searching,
        logout,
        userData,
        setUserData
    }
    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;