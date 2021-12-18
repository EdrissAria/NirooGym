import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormControl from '../components/FormControl'
import Title from '../components/Title'
import axios from 'axios'
import * as api from '../components/Api'
import { useQuery, useMutation } from 'react-query'
import UserList from '../components/Lists/UserList'
import { Redirect } from 'react-router'
import Loading from '../components/Loading'

function Users() {
    const getUsers = useQuery('users', api.getUser);
    const addUser = useMutation(api.addUser);
     
    const options = [
        { key: 'Choes a position', value: '' },
        { key: 'Admin', value: 'admin' },
        { key: 'User', value: 'user' }
    ]
    const initialValues = {
        username: '',
        password: '',
        position: '',
        photo: ''
    }
    const validatianSchema = Yup.object({
        username: Yup.string().required('! Required'),
        password: Yup.string().required('! Required').min(3, '! password must have at least three characters'),
        position: Yup.string().required('! Required'),
        photo: Yup.string().required('! Required')
    })

    const onSubmit = values => {
        // uploading the imgage
        let upload = new FormData();
        upload.append('photo', values.photo);
        api.uploadFile(upload);
        // sending data to database
        let userdata = {
            username: values.username,
            password: values.password,
            position: values.position,
            photo: values.photo.name
        }
        addUser.mutate(userdata)
    }
    
    return (
        <div>
        {getUsers.isLoading?<Loading size={100} />:
            <div className="addpro_form">
                <div className="container">
                    <Title linkTo="/" title="Add New" subTitle="User" buttonValue="Back To Dashboard" />
                    <div className="add_time">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validatianSchema}
                            onSubmit={onSubmit}
                        >
                            {
                                formik => {
                                    return (
                                        <Form>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <FormControl control='input' type='text' name='username' label='User Name' placeholder='username' />
                                                </div>
                                                <div className="col-lg-6">
                                                    <FormControl control='input' type='password' name='password' label='Password' placeholder='password' />
                                                </div>
                                                <div className="col-lg-6">
                                                    <FormControl control='select' as='select' name='position' label='Position' options={options} />
                                                </div>
                                                <div className="col-lg-6">
                                                    <FormControl control='file' formik={formik} name='photo' label='Choose Photo' />
                                                </div>
                                                <div className='col-lg-4'>
                                                    <button type='submit' disabled={!formik.isValid} name='submit_user' className="mt-3 btn btn-info">{
                                                        addUser.isLoading ? 'loading' : 'Add New User'
                                                    }</button>
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
                                        <th>photo</th>
                                        <th>Position</th>
                                        <th>Created by</th>
                                        <th>Date</th>
                                        <th>Delete</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getUsers.data?.map((user, index) => <UserList key={user.user_id} user={user} no={index}/>)    
                                    }                                    
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
           }
        </div>
    )
}

export default Users
