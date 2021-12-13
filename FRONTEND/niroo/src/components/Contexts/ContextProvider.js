import { createContext, useState, useEffect } from "react";
import * as api from '../Api'
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Redirect } from "react-router";

axios.defaults.baseURL = 'http://localhost/NIROO GYM/BACKEND/'; 

export const Context = createContext();

const ContextProvider = (props) => {
    //states of context api 
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [search, setSearch] = useState('');
    const [userData, setUserData] = useState({});

    //api for searching 
    const searching = useQuery(['searching', search], () => api.searching(search));
    //for getting earning type
    const [earn, setearn] = useState('');
    const selectEarning = (earning) => {
        setearn(earning);
    }

    /*_______________________________________________________login______________________________________________________________*/
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('loginHandler.php', loginData);
            if (response.status == 200 && response.data.token && response.data.expireAt) {
                let token = response.data.token;
                let expire_at = response.data.expireAt;

                localStorage.setItem('access_token', token);
                localStorage.setItem('expire_time', expire_at);
                setIsError(false);
                setUserData(response.data.user)
                console.log(userData)
                return <Redirect to={'/'} />
            } else {
                throw Error(response.data.message)
            }
        } catch (e) {
            setIsError(true)
            setErrorMessage(e)
        }
    }

    /*_______________________________________________________Authorization______________________________________________________________*/
    const auth = async () => {
        try {
            const authorize = await axios.get('auth.php', {
                headers: {
                    Authorization: 'Barear ' + localStorage.getItem('access_token')
                }
            })
            console.log(authorize)
             
        } catch (e) {
            console.log(e)
        }
    }

    /*________________________________________________________logout__________________________________________________________________*/
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expire_time');
        setUserData({});
        window.location.replace('/login')
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
        setUserData,
        loginData,
        setLoginData,
        isError,
        errorMessage,
        loginHandler,
        auth
    }
    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;