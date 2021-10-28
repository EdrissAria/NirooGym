import React from 'react'

function FinishedAgrtime({ time }) {
    return (
        <tr>
            <td>{time.agr_id}</td>
            <td>{time.name}</td>
            <td>{time.phone}</td>
            <td>{time.amount_per_hour}</td>
            <td>{time.recived}</td>
            <td>{time.reminder}</td>
            <td>{time.total_amount == 0 ? "undecided" : time.total_amount}</td>
            <td>{time.entry_date}</td>
            <td>{time.start_date}</td>
            <td>{time.end_date}</td>
            <td>{time.play_days}</td>
            <td>{time.time}</td>
            <td>{time.status=== "cancel"?<p style={{color:'red'}}>{time.status}</p>:time.status}</td>
            <td>{time.wrote_by}</td>
         </tr>
    )
}

export default FinishedAgrtime
