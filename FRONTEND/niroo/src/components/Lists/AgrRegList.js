import React from 'react'
import { useQuery } from 'react-query'
import * as api from '../Api';

function AgrRegList({ agr_id }) {

    const agrReg = useQuery(['agrRegulreTime', agr_id], () => api.getAgrReg(agr_id));
    if (agrReg.isSuccess) {
        console.log(agrReg.data)
        return (
            <>
            {
                agrReg.data.map(time=>(
                    <tr key={time.reg_id}>
                        <td>{time.reg_id}</td>
                        <td>{time.amount}</td>
                        <td>{time.recived}</td>
                        <td>{time.play_date}</td>
                        <td>{time.time}</td>
                    </tr>
                ))
            }
            </>
        )
    } else {
        return agrReg.isLoading ? 'loading...' : null;
    }
}

export default AgrRegList
