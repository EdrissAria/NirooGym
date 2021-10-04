import React, { useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import * as api from '../Api'
import { useQuery } from 'react-query'
 
function FinishedRegtime({ reg }) {
    const [id , setId] = useState();
    const restoreReg = useQuery(['restore', id], ()=>api.restoreReg(id));
    function handleRestore(reg_id){
        if(window.confirm('are you sure to restore this time?')){
            setId(reg_id);
            window.location.reload();
        }   
    }
    return (
        <tr>
            <td>{reg.reg_id}</td>
            <td>{reg.name}</td>
            <td>{reg.phone}</td>
            <td>{reg.amount}</td>
            <td>{reg.recived}</td>
            <td>{reg.play_date}</td>
            <td>{reg.time}</td>
            {reg.status === 'cancel'?<td style={{color: 'red'}}>{reg.status}</td>:<td>{reg.status}</td>}
            <td><button onClick={()=> handleRestore(reg.reg_id)} className="btn btn-primary">{
                restoreReg.isLoading?'restoring...':'restore'
            }</button></td>
        </tr>
    )
}

export default FinishedRegtime
