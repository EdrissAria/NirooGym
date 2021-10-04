import React from 'react'
import * as api from '../components/Api'
import { useQuery } from 'react-query'
import FinishedRegtime from './Lists/FinishedRegtime';

function RegulerTimesTable() {
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
                            <th>Restoring</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getReg.data.map(reg => <FinishedRegtime key={reg.reg_id} reg={reg} />)
                        }
                    </tbody>
                </table>
            </div>
        )
    } else {
        return getReg.isLoading ? 'loading...' : null;
    }
}

export default RegulerTimesTable
