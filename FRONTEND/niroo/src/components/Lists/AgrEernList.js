import React from 'react'
import {Link} from 'react-router-dom'

function ParkEarnList({earn, no}) {
    return (
        <tr>
            <td>{no + 1}</td>
            <td>{earn.type}</td>
            <td>{earn.amount}</td>
            <td>{earn.write_by}</td>
            <td>{earn.date}</td>
            <td><Link to={`/ViewEarnings/${earn.type}/${earn.agr_id}`} className="btn btn-primary">View</Link></td>
        </tr>
    )
}

export default ParkEarnList