import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormControl from '../components/FormControl'
import * as api from '../components/Api'
import { useMutation, useQuery } from 'react-query'
import ParkList from '../components/Lists/ParkList'
import Title from '../components/Title'

function Parking() {
    const getPark = useQuery('parking', api.getParking);
    const addPark = useMutation(api.addPark);

    if(addPark.isSuccess){
        window.location.reload();
    }

    const options = [
        {key: 'Choes a vehicle', value: ''},
        {key: 'Bicycle', value: 'bicycle'},
        {key: 'Motorcycle', value: 'motor'},
        {key: 'Car', value: 'car'}
    ]

    const initialValues = {
        vehicle: '',
        tax: ''
    }

    const validationSchema = Yup.object({
        vehicle: Yup.string().required('! Required'),
        tax: Yup.number().positive('! tax must be positive').required('! Required')
    })
    const onSubmit = values=>{
        const parkData = {
            vehicle: values.vehicle,
            amount: values.tax
        }
        addPark.mutate(parkData);
    }
    return (
    <div>
        <div className="addpro_form">
            <div className="container">
            <Title linkTo="/" title="Add New" subTitle="Park" buttonValue="back to the dashboard"/> 
                <div className="add_time">
                    <Formik
                    initialValues = {initialValues}
                    validationSchema = {validationSchema}
                    onSubmit = {onSubmit}
                    >
                    {
                        formik =>{
                            return (
                                <Form>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <FormControl control='select' as='select' name='vehicle' label='Vehicle' options={options}/>
                                        </div>
                                        <div className="col-lg-6">
                                            <FormControl control='input' type='text' name='tax' label='Tax' placeholder='tax' />
                                        </div>
                                        <div className='col-lg-4'>
                                            <button type='submit' disabled={!formik.isValid} className="btn btn-info mt-3">
                                                {
                                                    addPark.isLoading?'add...':'Add Tax'
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
                <div className="add_time">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Vehicle</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                             {
                                getPark.data?.map(park=><ParkList key={park.park_id} park={park}/>)
                             }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>        
    </div>
    )
}

export default Parking
