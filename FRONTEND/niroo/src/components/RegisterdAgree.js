import React from 'react'
import {Formik, Form, Field} from 'formik'
import FormControl from './FormControl'
import * as Yup from 'yup'
import * as api from './Api'
import AgrList from './Lists/AgrList'
import {useQuery} from 'react-query'

function RegisterdAgree() {
    const getAgr = useQuery('agreement',()=> api.getAgrtime('waiting'));
     
    return (
        <div>
             <table className="table text-center table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Amount/Hour</th>
                            <th>Recived</th>
                            <th>Cancel</th>
                            <th>Receipt</th>
                            <th>View</th>
                            <th>Submit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getAgr.data?getAgr.data.map((time, index)=><AgrList key={time.agr_id} time={time} no={index} />):null
                        }
                    </tbody>
                </table>
        </div>
    )
}

export default RegisterdAgree