import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormControl from '../components/FormControl'
import Title from '../components/Title'
import * as api from '../components/Api'
import { useMutation } from 'react-query'

function RecordTime() {
    const addRegtime = useMutation(api.addRegtime);
    if(addRegtime.isSuccess){
        return window.location.reload();
    }
    const initialValues = {
        name: '',
        phone: '',
        amount: '',
        recived: '',
        reminder: '',
        date: '',
        time: ''
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('! Required'),
        phone: Yup.string().required('! Required'),
        amount: Yup.number().positive('! must be positive').required('! Required'),
        recived: Yup.number().integer("! must be a number"),
        reminder: Yup.number().integer('! must be a number'),
        date: Yup.date().required('! Required'),
        time: Yup.string().required('! Required')
    })

    const onSubmit = values => {
        const regdata = {
            name: values.name,
            phone: values.phone,
            amount: values.amount,
            recived: values.recived,
            reminder: values.reminder,
            date: values.date,
            time: values.time
        }
        addRegtime.mutate(regdata);
    }
    return (
        <div className="addpro_form">
            <div className="container">
                <Title linkTo="/agreementTime" title="Record a New" subTitle="Reguler Time" buttonValue="agreement time" />
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
                                                <FormControl control='input' type='text' name='name' placeholder='name' label='Customer Name' />
                                            </div>
                                            <div className="col-lg-6">
                                                <FormControl control='input' type='text' name='phone' placeholder='phone' label='Customer Phone' />
                                            </div>
                                            <div className="col-lg-4 mt-3">
                                                <FormControl control='input' type='text' name='amount' placeholder='amount' label='Amount' />
                                            </div>
                                            <div className="col-lg-4 mt-3">
                                                <FormControl control='input' type='text' name="recived" placeholder="recived" label='Recived' />
                                            </div>
                                            <div className="col-lg-4 mt-3">
                                                <FormControl control='input' type='text' name="reminder" placeholder="reminder" label='Reminder' />
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <FormControl control='input' type='date' name='date' label='Play Date' />
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <FormControl control='input' type='text' name="time" placeholder="00 am/pm" label='Play Time' />
                                            </div>
                                            <div className='col-lg-4'>
                                                <button type='submit' className='btn btn-info' disabled={!formik.isValid}>
                                                    {
                                                        addRegtime.isLoading ? "loading..." : 'Add New Time'
                                                    }
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
}

export default RecordTime
