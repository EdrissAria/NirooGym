import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import * as api from '../components/Api'
import FormControl from '../components/FormControl'
import Title from '../components/Title'
import { useMutation } from 'react-query'

function AgreementTime() {
    const addAgr = useMutation(api.addAgrtime)

    const options = [
        { key: 'Saturday', value: 'saturday' },
        { key: 'Sunday', value: 'sunday' },
        { key: 'Monday', value: 'monday' },
        { key: 'Tuesday', value: 'tuesday' },
        { key: 'Wednsday', value: 'wednesday' },
        { key: 'Tursday', value: 'tursday' },
        { key: 'Friday', value: 'friday' }
    ]

    const initialValues = {
        name: '',
        phone: '',
        amount: '',
        total: '',
        recived: '',
        reminder: '',
        startDate: '',
        toggle: false,
        playDays: [],
        endDate: '',
        numTime: '',
        time: ''
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('! Required'),
        phone: Yup.string().required('! Required'),
        amount: Yup.number().positive('! must be positive').required('! Required'),
        total: Yup.number().positive('! must be positive'),
        recived: Yup.number().positive('! must be positive'),
        reminder: Yup.number().positive('! must be positive'),
        startDate: Yup.date().required('! Required'),
        time: Yup.string().required('! Required'),
        playDays: Yup.array().required('! Required').min(1, 'Choose an option')
    })

    const onSubmit = values =>{
        const agrData = {
            name: values.name,
            phone: values.phone,
            amount: values.amount,
            recived: values.recived,
            reminder: values.reminder,
            total: values.total,
            startDate: values.startDate,
            playDays: values.playDays,
            endDate: values.endDate,
            time: values.time,
        }
        // console.log(agrData.playDays)
        addAgr.mutate(agrData)
    }

    return (
        <div className="addpro_form">
            <div className="container">
                <Title linkTo="/recordTime" title="Record a new" subTitle="Agreement Time" buttonValue="Reguler time" />
                <div className="add_time">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {
                            formik => {
                                return (
                                    <Form>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <FormControl control='input' type='text' name='name' label='Custommer Name' placeholder='name' />
                                            </div>
                                            <div className="col-lg-6">
                                                <FormControl control='input' type='text' name='phone' label='Custommer Phone' placeholder='phone' />
                                            </div>
                                            <div className="col-lg-3 mt-3">
                                                <FormControl control='input' type='text' name='amount' label='Amount per hour' placeholder='amount' />
                                            </div>
                                            <div className="col-lg-3 mt-3">
                                                <FormControl control='input' type='text' name='recived' label='Recived' placeholder='recived' />
                                            </div>
                                            <div className="col-lg-3 mt-3">
                                                <FormControl control='input' type='text' name='reminder' label='Reminder' placeholder='reminder' />
                                            </div>
                                            <div className="col-lg-3 mt-3">
                                                <FormControl control='input' type='text' name='total' label='Total amount' placeholder='total' />
                                            </div>
                                            <div className="col-lg-3 mt-3">
                                                <FormControl control='input' type='date' name='startDate' label='Start Date' />
                                            </div>
                                            <div className="col-lg-9 mt-3">
                                                <FormControl control='checkbox' name='playDays' options={options} label='Play Days' />
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <FormControl control='input' type='date' name='endDate' label='End date' />
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <FormControl control='input' type='text' name='time' label='Time' placeholder='00 am/pm, 00 am/pm ...' />
                                            </div>
                                            <div className='col-lg-4 mt-3'>
                                                <button type='submit' disabled={!formik.isValid} className='btn btn-info'>Add New Time</button>
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
}

export default AgreementTime
