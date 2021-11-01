import React, { useState } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import * as api from '../components/Api'
import FormControl from '../components/FormControl'
import Title from '../components/Title'
import { useMutation, useQuery } from 'react-query'

function UpdateAgr() {
    const {id} = useParams();
    const singleTime = useQuery(['singletime', id], ()=> api.getSingleAgr(id));
    const updateAgr = useMutation(api.updateAgrtime);
    if(updateAgr.isSuccess){
        return <Redirect to='/registerdTime' />
    }
    const options = [
        { key: 'Saturday', value: 'saturday' },
        { key: 'Sunday', value: 'sunday' },
        { key: 'Monday', value: 'monday' },
        { key: 'Tuesday', value: 'tuesday' },
        { key: 'Wednsday', value: 'wednesday' },
        { key: 'Tursday', value: 'tursday' },
        { key: 'Friday', value: 'friday' }
    ]
 
    const validationSchema = Yup.object({
        amount: Yup.number().positive('! must be positive').required('! Required'),
        recived: Yup.number().integer('! must be an integer'),
        startDate: Yup.date().required('! Required'),
        time: Yup.string().required('! Required'),
        playDays: Yup.array().required('! Required').min(1, 'Choose an option')
    })

    const onSubmit = values =>{
        const agrData = {
            id: id,
            amount: values.amount,
            recived: values.recived,
            startDate: values.startDate,
            playDays: values.playDays,
            endDate: values.endDate,
            time: values.time,
        }

        updateAgr.mutate(agrData);

    }
if(singleTime.isSuccess){
    return (
        <div className="addpro_form">
            <div className="container">
                <Title linkTo={`/viewAgreementTime/${id}`} title="Update Your" subTitle="Agreement Time" buttonValue="back to view" />
                <div className="add_time">
                    <Formik
                        initialValues={
                            {
                                amount: singleTime.data.amount_per_hour,
                                recived: singleTime.data.recived,
                                startDate: singleTime.data.start_date,
                                playDays: [],
                                endDate: singleTime.data.end_date,
                                time: singleTime.data.time
                            }
                        }
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {
                            formik => {
                                return (
                                    <Form>
                                        <div className="row">
                                            <div className="col-lg-6 mt-3">
                                                <FormControl control='input' type='text' name='amount' label='Amount per hour' placeholder='amount' />
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <FormControl control='input' type='text' name='recived' placeholder='recived' label="Recived" />
                                            </div>
                                            <div className="col-lg-12 mt-3">
                                                <FormControl control='checkboxU' selected={singleTime.data.play_days} name='playDays' options={options} label='Play Days' />
                                            </div>
                                            <div className="col-lg-4 mt-3">
                                                <FormControl control='input' type='date' name='startDate' label='Start Date' />
                                            </div>
                                            <div className="col-lg-4 mt-3">
                                                <FormControl control='input' type='date' name='endDate' label='End date' />
                                            </div>
                                            <div className="col-lg-4 mt-3">
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
    }else{
        return singleTime.isLoading?'loading...':null;
    }
}

export default UpdateAgr
