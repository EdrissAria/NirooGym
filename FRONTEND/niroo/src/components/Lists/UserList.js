import React from 'react'
import * as api from '../Api'
import { useQuery, useMutation} from 'react-query'
import {Link, Redirect} from 'react-router-dom'

function UserList({ user }) {

    const info = useMutation(api.deleteUser);
    if(info.isSuccess){
        return <Redirect to="/users"/>
    }
    const deleteuser = (id)=>{
        info.mutate(id)
    }

    
    return (
        <tr>
            <td>{user.user_id}</td>
            <td>{user.username}</td>
            <td><img className='user_photo' src={`./assets/upload/${user.photo}`} /></td>
            <td>{user.position}</td>
            <td>{user.created_by}</td>
            <td>{user.created_at}</td>
            <td><button className='btn btn-danger' onClick={()=>deleteuser(user.user_id)}>{info.isLoading?'loading..':'delete'}</button></td>
            <td><Link to={`/userUpdate/${user.user_id}`} className='btn btn-warning'>Edit</Link></td>
        </tr>
    )
}

export default UserList
