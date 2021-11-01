import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormControl from '../components/FormControl'
import * as api from '../components/Api'
import { useMutation, useQuery } from 'react-query'
import StaffList from '../components/Lists/StaffList'
import Title from '../components/Title'

function Staff() {
    const getStaff = useQuery('staff', api.getStaff);
    const addStaff = useMutation(api.addStaff);
    
     if(addStaff.isSuccess){
        window.location.reload();
     }

    const initialValues = {
        name: '',
        job: '',
        phone: '',
        salary: '',
        worktime: ''
    }
    const validatianSchema = Yup.object({
        name: Yup.string().required('! Required'),
        job: Yup.string().required('! Required'),
        phone: Yup.string().required('! Required'),
        salary: Yup.number().positive('! salary must be positive').required('! Required'),
        worktime: Yup.string().required('! Required')
    })
    
    const onSubmit = values => {
        const staffData = {
            name: values.name,
            phone: values.phone,
            job: values.job,
            salary: values.salary,
            work_time: values.worktime
        }
        addStaff.mutate(staffData);
    }
    return (
        <div className="addpro_form">
        <div className="container">
            <Title linkTo="/" title="Add New" subTitle="Staff" buttonValue="back to the dashboard"/> 
            <div className="add_time">
            <Formik
                    initialValues = {initialValues}
                    validationSchema = {validatianSchema}
                    onSubmit = {onSubmit}
                    >
                    {
                        formik =>{
                            return (
                                <Form>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <FormControl control='input' type='text' name='name' label='Name' placeholder='name' />
                                        </div>
                                        <div className="col-lg-6">
                                            <FormControl control='input' type='text' name='phone' label='Phone' placeholder='phone'/>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormControl control='input' type='text' name='job' label='Job' placeholder='job' />
                                        </div>
                                        <div className="col-lg-4">
                                            <FormControl control='input' type='text' name='salary' label='Salary' placeholder='salary' />
                                        </div>
                                        <div className="col-lg-4">
                                            <FormControl control='input' type='text' name='worktime' label='Work Time' placeholder='time' />
                                        </div>
                                        <div className='col-lg-4'>
                                            <button type='submit' disabled={!formik.isValid} className="btn btn-info mt-3">
                                                {addStaff.isLoading?'loading...':'Add New Staff'}
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }
                    }
            </Formik>
            </div>
            <div className="add_time">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Salary</th>
                            <th>Phone</th>
                            <th>Work Time</th>
                            <th>Created by</th>
                            <th>Date</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getStaff.data?.map((staff, index) => <StaffList key={staff.staff_id} staff={staff} no={index}/>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default Staff
