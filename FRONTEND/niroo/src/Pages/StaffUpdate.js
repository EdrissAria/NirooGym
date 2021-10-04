import React from 'react'
import { Link, useParams, Redirect, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormControl from '../components/FormControl'
import Title from '../components/Title'
import * as api from '../components/Api'
import { useQuery, useMutation } from 'react-query'
import StaffList from '../components/Lists/StaffList'

function StaffUpdate() {
    const { id } = useParams();
    const getStaff = useQuery(['staff', id], () => api.getSingleStaff(id));
    const updateStaff = useMutation(api.updateStaff);

    if(updateStaff.isSuccess){
        return <Redirect to='/staff' />
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
            id: id,
            name: values.name,
            phone: values.phone,
            job: values.job,
            salary: values.salary,
            work_time: values.worktime
        }
        updateStaff.mutate(staffData)

    }
    if (getStaff.isSuccess) {
        return (
            <div className="addpro_form">
                <div className="container">
                    <Title linkTo="/" title="Edit Your" subTitle="Staff" buttonValue="back to the dashboard" />
                    <div className="add_time">
                        <Formik
                            initialValues={
                                {
                                    name: getStaff.data.name,
                                    job: getStaff.data.job,
                                    phone: getStaff.data.phone,
                                    salary: getStaff.data.salary,
                                    worktime: getStaff.data.work_time
                                }
                            }
                            validationSchema={validatianSchema}
                            onSubmit={onSubmit}
                        >
                            {
                                formik => {
                                    return (
                                        <Form>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <FormControl control='input' type='text' name='name' label='Name' placeholder='name' />
                                                </div>
                                                <div className="col-lg-6">
                                                    <FormControl control='input' type='text' name='phone' label='Phone' placeholder='phone' />
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
                                                        {updateStaff.isLoading?'updating...':'Update'}
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )
                                }
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        )
    } else {
        return getStaff.isLoading?'loading...':'';
    }
}

export default StaffUpdate
