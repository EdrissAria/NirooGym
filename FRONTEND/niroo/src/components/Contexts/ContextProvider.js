import { createContext, useState, useEffect } from "react";
import * as api from '../Api'
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Redirect , useHistory} from "react-router";

axios.defaults.baseURL = 'http://localhost/NIROO GYM/BACKEND/';
axios.defaults.headers.common['Authorization'] = 'Barear '+ localStorage.getItem('access_token'); 

export const Context = createContext();

const ContextProvider = (props) => {
    const history = useHistory();  
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
                
                
                window.location.pathname = '/'
                setUserData(response.data.user)
                setIsError(false);
               
            } else {
                throw Error(response.data.message)
            }
        } catch (e) {
            setIsError(true)
            setErrorMessage(e)
        }
    }   
    /*________________________________________________________Authorization____________________________________________________________*/
    useEffect(()=>{
        axios.get('auth.php')
        .then(res=> setUserData(res.data.user))
        .catch(error=> console.log(error))
    }, [])
    /*________________________________________________________logout__________________________________________________________________*/
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expire_time');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        localStorage.removeItem('position');
        localStorage.removeItem('photo');
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
        loginData,
        setLoginData,
        isError,
        errorMessage,
        loginHandler,
    }
    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;