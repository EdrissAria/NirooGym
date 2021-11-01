import React from 'react'
import * as api from './Api'
import { useQuery } from 'react-query'
import FinishedRegtime from './Lists/FinishedRegtime';

function RegularTimesTable() {
    const getReg = useQuery('finishedTime', () => api.getRegtime('finish'));

    if (getReg.isSuccess) {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Amount</th>
                            <th>Recived</th>
                            <th>Play Date</th>
                            <th>Play Time</th>
                            <th>Status</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getReg.data.map((reg, index) => <FinishedRegtime key={reg.reg_id} reg={reg} no={index}/>)
                        }
                    </tbody>
                </table>
            </div>
        )
    } else {
        return getReg.isLoading ? 'loading...' : null;
    }
}

export default RegularTimesTable
