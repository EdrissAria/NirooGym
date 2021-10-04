import React from 'react'
import * as api from '../components/Api'
import { useQuery } from 'react-query'
import WaitingTime from './Lists/WaitingTime';

function RegisterdReg() {
    const regTime = useQuery('waitingtime', ()=> api.getRegtime('waiting'));
    return (
        <div>
             <table className="table table-striped text-center">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Amount</th>
                            <th>Recived</th>
                            <th>Reminder</th>
                            <th>Play Date</th>
                            <th>Play Time</th>
                            <th>Cancel</th>
                            <th>Edit</th>
                            <th>Submit</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           regTime.data?.map(time=><WaitingTime key={time.reg_id} waiting={time}/>)
                       }
                    </tbody>
                </table>
        </div>
    )
}

export default RegisterdReg
