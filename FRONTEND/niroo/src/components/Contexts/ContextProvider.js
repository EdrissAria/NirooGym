import { createContext, useState } from "react";

export const Context = createContext();
 
const ContextProvider = (props)=>{
    //for getting earning type
    const [earn, setearn] = useState('');
    const selectEarning = (earning)=>{
        setearn(earning);
    }

    // value pass into context 
    const value = {
        earn, 
        selectEarning
    }
    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;