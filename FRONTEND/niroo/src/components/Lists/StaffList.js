import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from 'react-query'
import * as api from '../Api'

function StaffList({staff, no}) {
    const delStaff = useMutation(api.deleteStaff);
    if(delStaff.isSuccess){
        return <Redirect to='/staff' />
    }
    const deletestaff = (id) =>{
        delStaff.mutate(id);
    }
    return (
        <tr>
            <td>{no + 1}</td> 
            <td>{staff.name}</td>
            <td>{staff.job}</td>
            <td>{staff.salary}</td>
            <td>{staff.phone}</td>
            <td>{staff.work_time}</td>
            <td>{staff.created_by}</td>
            <td>{staff.created_at}</td>
            <td><button className="btn btn-danger" onClick={()=> deletestaff(staff.staff_id)}>
            {delStaff.isLoading?'deleting...':'Delete'}
            </button></td>
            <td><Link to={`/staffUpdate/${staff.staff_id}`} className="btn btn-warning">Edit</Link></td>
        </tr>
    )
}

export default StaffList
