import React from 'react'

function BookList({book, no}) {
    return (
        <tr>
        <td>{no + 1}</td> 
        <td>{book.amount}</td>
        <td>{book.take_by}</td>
        <td>{book.description}</td>
        <td>{book.date}</td>
    </tr>
    )
}

export default BookList
