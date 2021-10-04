import React from 'react'

function EpencesList({expense}) {

    return (
        <tr>
            <td>{expense.expense_id}</td>
            <td>{expense.type}</td>
            <td>{expense.amount}</td>
            <td>{expense.write_by}</td>
            <td>{expense.date}</td>
        </tr>
    )
}

export default EpencesList
