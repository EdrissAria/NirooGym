import React from 'react'
import * as api from './Api'
import { useQuery } from 'react-query'
import FinishedAgrtime from './Lists/FinishedAgrtime';

function AgreementTimesTable() {
    const getAgr = useQuery('finishedTime', () => api.getAgrtime('finish'));
    if(getAgr.isSuccess){
         
    return (
        <div>
            <table className="table agrTable table-striped text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>phone</th>
                        <th>Amount/Hour</th>
                        <th>Recived</th>
                        <th>Entry Date</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Play Days</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Wrote by</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                     {
                         getAgr.data.map(time=> <FinishedAgrtime key={time.agr_id} time={time}/>)
                     }
                </tbody>
            </table>
        </div>
    )
    }else{
        return getAgr.isLoading?'loading...':null
    }
}

export default AgreementTimesTable
