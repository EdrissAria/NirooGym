import { createContext, useState } from "react";
import * as api from '../Api'
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";

export const Context = createContext();
 
const ContextProvider = (props)=>{
    const [search , setSearch] = useState('');
    //api for searching 
    const searching = useQuery(['searching', search], ()=> api.searching(search));
    //for getting earning type
    const [earn, setearn] = useState('');
    const selectEarning = (earning)=>{
        setearn(earning);
    }
    //context api for login and logout
    const [loginData, setLoginData] = useState({username:'', password:''});
    const login = useMutation(api.LoginHandler);
    // value pass into context 
    const value = {
        earn, 
        selectEarning,
        search,
        setSearch,
        searching, 
        loginData, 
        setLoginData, 
        login
    }
    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;