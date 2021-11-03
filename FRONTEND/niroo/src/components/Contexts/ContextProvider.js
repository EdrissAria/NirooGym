import { createContext, useState } from "react";
import * as api from '../Api'
import { useMutation } from "react-query";

export const Context = createContext();
 
const ContextProvider = (props)=>{
    //api for searching 
    const searching = useMutation(api.searching);
   
    //search handler 
    const searchHandler = (e) => {
        searching.mutate(e.target.value);
    }

    //for getting earning type
    const [earn, setearn] = useState('');
    const selectEarning = (earning)=>{
        setearn(earning);
    }

    // value pass into context 
    const value = {
        earn, 
        selectEarning, 
        searching, 
        searchHandler 
    }
    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;