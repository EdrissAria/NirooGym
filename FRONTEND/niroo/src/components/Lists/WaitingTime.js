import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as api from '../Api';
import { useMutation } from 'react-query'

function WaitingTime({ waiting }) {
    const [cancel, setCancel] = useState(false);
    const subTime = useMutation(api.submitRegtime);

    if(subTime.isSuccess){
        return <Redirect to="/registerdTime"/>
    }

    const submitTime = (id)=>{
        const subdata = {
            id: id,
            status: cancel?'cancel': 'finish'
        }
        
        subTime.mutate(subdata)
    }
    return (
        <tr>
            <td>{waiting.reg_id}</td>
            <td>{waiting.name}</td>
            <td>{waiting.phone}</td>
            <td>{waiting.amount}</td>
            <td>{waiting.recived}</td>
            <td>{waiting.reminder}</td>
            <td>{waiting.play_date}</td>
            <td>{waiting.time}</td>
            <td className="ck"><input type="checkbox" onChange={()=>setCancel(!cancel)}/></td>
            <td><Link to={`/regEdit/${waiting.custommer_id}`} className="btn btn-warning">Edit</Link></td>
            <td><button onClick={() => submitTime(waiting.reg_id)} className="btn btn-success">Submit</button></td>
        </tr>
    )
}

export default WaitingTime
