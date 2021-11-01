import React from 'react'

function EpencesList({ expense, no }) {

    return (
        <tr>
            <td>{no + 1}</td>
            <td>{expense.type}</td>
            <td>{expense.amount}</td>
            <td>{expense.write_by}</td>
            <td>{expense.date}</td>
        </tr>
    )
}

export default EpencesList
