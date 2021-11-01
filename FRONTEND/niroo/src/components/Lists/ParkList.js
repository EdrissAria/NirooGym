import React from 'react'

function ParkList({park, no}) {
    return (
        <tr>
            <td>{no + 1}</td>
            <td>{park.vehicle}</td>
            <td>{park.amount}</td>
            <td>{park.date}</td>
        </tr>
    )
}

export default ParkList
