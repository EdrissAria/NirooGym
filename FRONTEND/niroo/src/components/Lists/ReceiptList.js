import React, {useState} from 'react'
import { useQuery, useMutation } from 'react-query';
import * as api from '../Api';
function ReceiptList({ agr_id, edit }) {
    const [rec, setrec] = useState('');
    const viewReceipt = useQuery(['viewReceipt', agr_id], () => api.getReceipts(agr_id));
    const editReceipt = useMutation(api.updateReceipt);
    const updateReceipt = (id, value)=>{
        alert("id: "+id+" - "+"receipt: "+value)
    }
    if (viewReceipt.isSuccess) {
        return (
            <>
            {
                viewReceipt.data.map(receipt=>(
                    <tr key={receipt.receipt_id}>
                        <td>{receipt.receipt_id}</td>
                        <td>{receipt.receipt}</td>
                        <td>{receipt.wrote_by}</td>
                        <td>{receipt.pay_date}</td>
                        <td>
                        {
                            edit?(
                                <div style={{display: 'flex', flexDirection:'row'}}>
                                <input type="text" value={rec} onChange={(e)=> setrec(e.target.value)} placeholder={receipt.receipt} className="form-control"/>
                                <button className="btn btn-info" onClick={()=> updateReceipt(receipt.receipt_id, rec)}>Edit</button></div>
                            ):(null)
                        }
                        </td>
                    </tr>
                ))
            }
            </>
        )
    }else{
        return viewReceipt.isLoading?'loading...':null;
    }
}

export default ReceiptList
