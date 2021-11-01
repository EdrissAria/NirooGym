import React from 'react'

function ParkEarnList({earn, no}) {
    return (
        <tr>
            <td>{no + 1}</td>
            <td>{earn.type}</td>
            <td>{earn.amount}</td>
            <td>{earn.write_by}</td>
            <td>{earn.date}</td>
        </tr>
    )
}

export default ParkEarnList
