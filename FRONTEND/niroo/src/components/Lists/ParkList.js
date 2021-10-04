import React from 'react'

function ParkList({park}) {
    return (
        <tr>
            <td>{park.park_id}</td>
            <td>{park.vehicle}</td>
            <td>{park.amount}</td>
            <td>{park.date}</td>
        </tr>
    )
}

export default ParkList
