import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query';
import { Redirect, useParams } from 'react-router';
import * as api from '../Api';
function ReceiptList({ agr_id }) {
    const {id} = useParams();
    const viewReceipt = useQuery(['viewReceipt', agr_id], () => api.getReceipts(agr_id));
    const editReceipt = useMutation(api.updateReceipt);
    if(editReceipt.isSuccess){
        // return <Redirect to={`/viewAgreementTime/${id}`}/>
        window.location.reload();
    }
    const handleUpdate = (id, amount) => {
        let receipt = prompt('Enter the new amount of receipt for editing', amount);
        const recdata = {
            id: id,
            agrId: agr_id,
            oldReceipt: amount,
            newReceipt: receipt
        }
        editReceipt.mutate(recdata)
    }
    if (viewReceipt.isSuccess) {
        return (
            <>
                {
                    viewReceipt.data.map(receipt => (
                        <tr key={receipt.receipt_id}>
                            <td>{receipt.receipt_id}</td>
                            <td>{receipt.receipt}</td>
                            <td>{receipt.wrote_by}</td>
                            <td>{receipt.pay_date}</td>
                            <td>
                                <button onClick={()=> handleUpdate(receipt.receipt_id, receipt.receipt)} className="btn btn-warning">Edit</button>
                            </td>
                        </tr>
                    ))
                }
            </>
        )
    } else {
        return viewReceipt.isLoading ? 'loading...' : null;
    }
}

export default ReceiptList
