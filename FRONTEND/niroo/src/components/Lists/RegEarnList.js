import React from 'react'
import {Link} from 'react-router-dom'

function RegEarnList({ earn }) {
    return (
        <tr>
            <td>{earn.earning_id}</td>
            <td>{earn.type}</td>
            <td>{earn.amount}</td>
            <td>{earn.write_by}</td>
            <td>{earn.date}</td>
            <td><Link to={`/ViewEarnings/${earn.type}/${earn.reg_id}`} className="btn btn-primary">View</Link></td>
        </tr>
    )
}

export default RegEarnList
