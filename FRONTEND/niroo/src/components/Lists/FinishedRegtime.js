import React, { useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import * as api from '../Api'
import { useQuery } from 'react-query'
 
function FinishedRegtime({ reg, no }) {
     
    return (
        <tr>
            <td>{no + 1}</td>
            <td>{reg.name}</td>
            <td>{reg.phone}</td>
            <td>{reg.amount}</td>
            <td>{reg.recived}</td>
            <td>{reg.play_date}</td>
            <td>{reg.time}</td>
            {reg.status === 'cancel'?<td style={{color: 'red'}}>{reg.status}</td>:<td>{reg.status}</td>}
            <td>{reg.reg_id && reg.agr_id != null?'Agreement Time':'Regular Time'}</td>
        </tr>
    )
}

export default FinishedRegtime
