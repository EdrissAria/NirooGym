import React, { useEffect, useState } from 'react'
import { Link, useParams, Redirect, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormControl from '../components/FormControl'
import Title from '../components/Title'
import * as api from '../components/Api'
import { useQuery, useMutation } from 'react-query'
import UserList from '../components/Lists/UserList'

function UserUpdate() {
    const { id } = useParams();
    const getUser = useQuery(['user', id], () => api.getSingleUser(id));
    const updateUser = useMutation(api.updateUser);

    // if(updateUser.isSuccess){
    //     return <Redirect to="/users" />
    // }
    const options = [
        { key: 'Choes a position', value: '' },
        { key: 'Admin', value: 'admin' },
        { key: 'User', value: 'user' }
    ]

    const validatianSchema = Yup.object({
        username: Yup.string().required('! Required'),
        password: Yup.string().required('! Required').min(3, '! password must have at least three characters'),
        new_password: Yup.string().required('! Required').min(3, '! password must have at least three characters'),
        position: Yup.string().required('! Required'),
        photo: Yup.string().required('! Required')
    })

    const onSubmit = (values) => {
        // uploading the imgage
        let upload = new FormData();
        upload.append('photo', values.photo);
        api.uploadFile(upload);
        // sending data to database
        let userdata = {
            id: id,
            username: values.username,
            password: values.password,
            new_password: values.new_password,
            position: values.position,
            photo: values.photo.name
        }
        updateUser.mutate(userdata)
    }
    if (getUser.isSuccess) {
        return (
            <div className="addpro_form">
                <div className="container">
                    <Title linkTo="/users" title="Update Your" subTitle="Users" buttonValue="Back To Users" />
                    <div className="add_time">
                        <Formik
                            initialValues={{
                                username: getUser.data.username,
                                password: '',
                                new_password: '',
                                position: getUser.data.position,
                                photo: ''
                            }}
                            validationSchema={validatianSchema}
                            onSubmit={onSubmit}
                        >
                            {
                                formik => {
                                    return (
                                        <Form>
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <FormControl control='input' type='text' name='username' label='User Name' placeholder='username' />
                                                </div>
                                                <div className="col-lg-4">
                                                    <FormControl control='input' type='password' name='password' label='Old Password' placeholder='old ' />
                                                </div>
                                                <div className="col-lg-4">
                                                    <FormControl control='input' type='password' name='new_password' label='New Password' placeholder='new' />
                                                </div>
                                                <div className="col-lg-6">
                                                    <FormControl control='select' as='select' name='position' label='Position' options={options} />
                                                </div>
                                                <div className="col-lg-4">
                                                    <FormControl control='file' formik={formik} name='photo' label='Choose Photo' />
                                                </div>
                                                <div className="col-lg-2">
                                                    <label className='mt-2'>Selected photo</label><br />
                                                    <img src={`/assets/upload/${getUser.data.photo}`} alt="user_photo" className='user_photo' />
                                                </div>
                                                <div className='col-lg-4'>
                                                    <button type='submit' disabled={!formik.isValid} className="btn btn-info mt-3" >
                                                        {updateUser.isLoading ? 'loading...' : 'Update'}
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
        return getUser.isLoading?'loading...':''
    }
}

export default UserUpdate
