import React from 'react'

function ParkEarnList({earn}) {
    return (
        <tr>
            <td>{earn.earning_id}</td>
            <td>{earn.type}</td>
            <td>{earn.amount}</td>
            <td>{earn.write_by}</td>
            <td>{earn.date}</td>
        </tr>
    )
}

export default ParkEarnList
