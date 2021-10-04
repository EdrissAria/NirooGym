import React from 'react'

function BookList({book}) {
    return (
        <tr>
        <td>{book.cache_id}</td> 
        <td>{book.amount}</td>
        <td>{book.take_by}</td>
        <td>{book.description}</td>
        <td>{book.date}</td>
    </tr>
    )
}

export default BookList
