import React from 'react'
import {useMutation} from 'react-query'
import { Redirect } from 'react-router-dom';
import * as api from '../Api'

function LoanList({loan, no}) {
    const delLoan = useMutation(api.deleteLoan);
    if(delLoan.isSuccess){
        return <Redirect to='/loans' />
    }
    const deleteLoan = (id)=>{
        delLoan.mutate(id)
    }
    return (
        <tr>
            <td>{no + 1}</td>
            <td>{loan.name}</td>
            <td>{loan.phone}</td>
            <td>{loan.amount}</td>
            <td>{loan.description}</td>
            <td><button onClick={()=> deleteLoan(loan.loan_id)} className="btn btn-warning">
                {
                    delLoan.isLoading?'finishing...':'finish'
                }
            </button></td>
        </tr>
    )
}

export default LoanList
