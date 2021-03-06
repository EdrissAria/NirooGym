import React from 'react'
import * as api from './Api'
import { useQuery } from 'react-query'
import FinishedAgrtime from './Lists/FinishedAgrtime';

function AgreementTimesTable() {
    const getAgr = useQuery('finishedTime', () => api.getAgrtime('finish'));
    if(getAgr.isSuccess){
         console.log('finished: ', getAgr.data)
    return (
        <div>
            <table className="table text-center agrTable table-striped">
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
                        getAgr.data.map((time, index)=> <FinishedAgrtime key={index} time={time} no={index}/>)
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
