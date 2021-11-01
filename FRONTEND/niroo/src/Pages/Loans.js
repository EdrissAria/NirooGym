import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormControl from '../components/FormControl'
import * as api from '../components/Api'
import { useMutation, useQuery } from 'react-query'
import LoanList from '../components/Lists/LoanList'
import Title from '../components/Title'

function Loans() {
    const getLoan = useQuery('loans', api.getLoan);
    const addLoan = useMutation(api.addLoan);

    // if(addLoan.isSuccess){
    //     return <Redirect to="/loans"/>
    // }

    const initialValues = {
        loaner: '',
        phone: '',
        amount: '',
        description: ''
    }

    const validationSchema = Yup.object({
        loaner: Yup.string().required('! Required'),
        phone: Yup.string().required('! Required'),
        amount: Yup.number().positive('! tax must be positive').required('! Required')
    })
    const onSubmit = values => {
        const loanData = {
            loaner: values.loaner,
            phone: values.phone,
            amount: values.amount,
            description: values.description
        }

        addLoan.mutate(loanData);
    }
    return (
        <div>
            <div className="addpro_form">
                <div className="container">
                    <Title linkTo="/" title="Add New" subTitle="Loan" buttonValue="back to the dashboard" />
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
                                                    <FormControl control='input' type='text' name='loaner' label='Loaner' placeholder='name' />
                                                </div>
                                                <div className="col-lg-6">
                                                    <FormControl control='input' type='text' name='phone' label='Loaner Phone' placeholder='phone..' />
                                                </div>
                                                <div className="col-lg-6">
                                                    <FormControl control='input' type='text' name='amount' label='Amount' placeholder='loan' />
                                                </div>
                                                <div className="col-lg-6">
                                                    <FormControl control='input' type='text' name='description' label='Description' placeholder='option' />
                                                </div>
                                                <div className='col-lg-4'>
                                                    <button type='submit' disabled={!formik.isValid} className="btn btn-info mt-3">
                                                        {
                                                            addLoan.isLoading ? 'add...' : 'Add Loan'
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
                        {
                            getLoan.isSuccess ?
                                <table className="table table-striped text-center">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Loaner</th>
                                            <th>Phone</th>
                                            <th>Amount</th>
                                            <th>Description</th>
                                            <th>Finish</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getLoan.data.map((loan, index)=> <LoanList key={loan.loan_id} loan={loan} no={index} />)
                                        }
                                    </tbody>
                                </table>

                                :'loading...'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loans
